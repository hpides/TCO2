#!/usr/bin/env python3
"""
Print advanced LaTeX carbon tables for the single-estimate scenarios.

Semantics:
- Cloud baselines use the AWS r6a.2xlarge at 30%, 60%, and 90% utilization.
- The script prints two tables per cloud scenario:
  1. Base, total, and additional DBMS utilization.
  2. A high-minus-10% carbon diff table with additional DBMS utilization.
- The high-utilization scenario is 40% by default. Selected systems add the
  cloud workload to the 10% local baseline, scaled by physical CPU cores
  (4 physical cores for the cloud instance, rather than its 8 vCPUs).
- The Raspberry Pi uses a 2:1 core-mapping assumption, doubling only the
  added DBMS workload: 10% baseline + 2 * 30% = 70% utilization.
- Each Pi retains a 10% baseline. Divide only the DBMS workload equally over
  enough Pis to keep each at or below 100%. Utilization is per Pi; carbon
  includes the incremental load across all Pis, which are assumed to already
  be running at 10%. Subtract the baseline power of every deployed machine.
- For the diff table, local embodied carbon is zero, with the full deployment's
  embodied estimate in parentheses. Savings uses the same convention,
  excluding existing hardware's embodied carbon outside parentheses.
"""

from __future__ import annotations

from math import ceil

from lifecycle_anslysis.constants import GERMANY
from lifecycle_anslysis.system import System
from single_estimates.aws_r6a_2xlarge_carbon_model import (
    CPU_TDP_WATTS as AWS_CPU_TDP_WATTS,
    DRAM_GB as AWS_DRAM_GB,
    HDD_GB as AWS_HDD_GB,
    PACKAGE_AREA_CM2 as AWS_PACKAGE_AREA_CM2,
    PHYSICAL_CORES_USED as AWS_PHYSICAL_CORES_USED,
    SSD_GB as AWS_SSD_GB,
)
from single_estimates.lenovo_thinkstation_p620_carbon_model import (
    CPU_TDP_WATTS as LENOVO_CPU_TDP_WATTS,
    DIE_AREA_CM2 as LENOVO_DIE_AREA_CM2,
    DRAM_GB as LENOVO_DRAM_GB,
    HDD_GB as LENOVO_HDD_GB,
    SSD_GB as LENOVO_SSD_GB,
)
from single_estimates.mac_studio_m1_pro_carbon_model import (
    CPU_TDP_WATTS as M1_CPU_TDP_WATTS,
    DRAM_GB as M1_DRAM_GB,
    HDD_GB as M1_HDD_GB,
    PACKAGE_AREA_CM2 as M1_PACKAGE_AREA_CM2,
    SSD_GB as M1_SSD_GB,
)
from single_estimates.mac_studio_m4_max_carbon_model import (
    CPU_TDP_WATTS as M4_CPU_TDP_WATTS,
    DRAM_GB as M4_DRAM_GB,
    HDD_GB as M4_HDD_GB,
    PACKAGE_AREA_CM2 as M4_PACKAGE_AREA_CM2,
    SSD_GB as M4_SSD_GB,
)
from single_estimates.raspberry_pi_5_carbon_model import (
    CPU_TDP_WATTS as PI_CPU_TDP_WATTS,
    DRAM_GB as PI_DRAM_GB,
    HDD_GB as PI_HDD_GB,
    PACKAGE_AREA_CM2 as PI_PACKAGE_AREA_CM2,
    SSD_GB as PI_SSD_GB,
)


TIME_HORIZON_YEARS = 6
COUNTRY = GERMANY
CLOUD_UTILIZATION = 30
CLOUD_UTILIZATION_SCENARIOS = (30, 60, 90)
LOCAL_LOW_UTILIZATION = 10
LOCAL_HIGH_UTILIZATION = 40
SCALED_HIGH_UTILIZATION_CORES = {
    r"\amdzentwo": 64,
    r"\mfourmax": 16,
    r"\monepro": 10,
    r"\raspi": 4,
}
DBMS_WORKLOAD_MULTIPLIERS = {r"\raspi": 2}


def build_system(
    da_cm2: float,
    dram_gb: int,
    ssd_gb: int,
    hdd_gb: int,
    cpu_tdp_watts: float,
) -> System:
    return System(
        die_size=da_cm2,
        performance_indicator=1.0,
        lifetime=TIME_HORIZON_YEARS,
        dram_capacity=dram_gb,
        ssd_capacity=ssd_gb,
        hdd_capacity=hdd_gb,
        cpu_tdp=cpu_tdp_watts,
    )


def embodied(system: System) -> float:
    return system.calculate_capex_emissions()


def operational(system: System, utilization: float) -> float:
    return system.calculate_opex_emissions(utilization, COUNTRY) * TIME_HORIZON_YEARS


def high_utilization(name: str, cloud_utilization: float = CLOUD_UTILIZATION) -> float:
    cpu_cores = SCALED_HIGH_UTILIZATION_CORES.get(name)
    if cpu_cores is None:
        return LOCAL_HIGH_UTILIZATION
    added_utilization = cloud_utilization * AWS_PHYSICAL_CORES_USED / cpu_cores
    return LOCAL_LOW_UTILIZATION + added_utilization * DBMS_WORKLOAD_MULTIPLIERS.get(name, 1)


def incremental_operational(name: str, system: System, cloud_utilization: float = CLOUD_UTILIZATION) -> float:
    count, _, total, _ = local_deployment(name, cloud_utilization)
    high = count * operational(system, total)
    low = count * operational(system, LOCAL_LOW_UTILIZATION)
    return high - low


def local_deployment(name: str, cloud_utilization: float) -> tuple[int, float, float, float]:
    added = high_utilization(name, cloud_utilization) - LOCAL_LOW_UTILIZATION
    count = max(1, ceil(added / (100 - LOCAL_LOW_UTILIZATION))) if name == r"\raspi" else 1
    added_per_machine = added / count
    return count, LOCAL_LOW_UTILIZATION, LOCAL_LOW_UTILIZATION + added_per_machine, added_per_machine


def deployment_name(name: str, count: int) -> str:
    return rf"{name} ($\times {count}$)" if count > 1 else name


def fmt(value: float) -> str:
    return f"{rounded(value):,}".replace(",", " ")


def rounded(value: float) -> int:
    return round(value)


def fmt_utilization(value: float) -> str:
    return f"{value:.0f}"


def cloud_row(cloud_utilization: float = CLOUD_UTILIZATION) -> tuple[str, str, float, float, float]:
    system = build_system(
        da_cm2=AWS_PACKAGE_AREA_CM2,
        dram_gb=AWS_DRAM_GB,
        ssd_gb=AWS_SSD_GB,
        hdd_gb=AWS_HDD_GB,
        cpu_tdp_watts=AWS_CPU_TDP_WATTS,
    )
    capex = embodied(system)
    opex = operational(system, cloud_utilization)
    total = rounded(capex) + rounded(opex)
    return "r6a.2xlarge", fmt(capex), opex, total, 0.0


def local_systems() -> list[tuple[str, System]]:
    return [
        (
            r"\raspi",
            build_system(
                da_cm2=PI_PACKAGE_AREA_CM2,
                dram_gb=PI_DRAM_GB,
                ssd_gb=PI_SSD_GB,
                hdd_gb=PI_HDD_GB,
                cpu_tdp_watts=PI_CPU_TDP_WATTS,
            ),
        ),
        (
            r"\monepro",
            build_system(
                da_cm2=M1_PACKAGE_AREA_CM2,
                dram_gb=M1_DRAM_GB,
                ssd_gb=M1_SSD_GB,
                hdd_gb=M1_HDD_GB,
                cpu_tdp_watts=M1_CPU_TDP_WATTS,
            ),
        ),
        (
            r"\mfourmax",
            build_system(
                da_cm2=M4_PACKAGE_AREA_CM2,
                dram_gb=M4_DRAM_GB,
                ssd_gb=M4_SSD_GB,
                hdd_gb=M4_HDD_GB,
                cpu_tdp_watts=M4_CPU_TDP_WATTS,
            ),
        ),
        (
            r"\amdzentwo",
            build_system(
                da_cm2=LENOVO_DIE_AREA_CM2,
                dram_gb=LENOVO_DRAM_GB,
                ssd_gb=LENOVO_SSD_GB,
                hdd_gb=LENOVO_HDD_GB,
                cpu_tdp_watts=LENOVO_CPU_TDP_WATTS,
            ),
        ),
    ]


def utilization_rows(cloud_utilization: float = CLOUD_UTILIZATION) -> list[tuple[str, str, str, str]]:
    rows = [
        (
            "r6a.2xlarge",
            fmt_utilization(0),
            fmt_utilization(cloud_utilization),
            fmt_utilization(cloud_utilization),
        )
    ]

    for name, _ in local_systems():
        count, base_utilization, total_utilization, added_utilization = local_deployment(name, cloud_utilization)
        rows.append(
            (
                deployment_name(name, count),
                fmt_utilization(base_utilization),
                fmt_utilization(total_utilization),
                fmt_utilization(added_utilization),
            )
        )

    return rows


def diff_rows(cloud_utilization: float = CLOUD_UTILIZATION) -> list[tuple[str, str, str, float, str]]:
    baseline = cloud_row(cloud_utilization)
    baseline_total = rounded(baseline[3])
    rows = [
        (
            baseline[0],
            fmt_utilization(cloud_utilization),
            baseline[1],
            baseline[2],
            "0 (0)",
        )
    ]

    for name, system in local_systems():
        count, _, _, added_utilization = local_deployment(name, cloud_utilization)
        capex = count * embodied(system)
        opex_delta = incremental_operational(name, system, cloud_utilization)
        rounded_capex = rounded(capex)
        rounded_opex_delta = rounded(opex_delta)
        savings_excluding_embodied = baseline_total - rounded_opex_delta
        savings_counting_actual_embodied = baseline_total - rounded_capex - rounded_opex_delta
        rows.append(
            (
                deployment_name(name, count),
                fmt_utilization(added_utilization),
                rf"0 ({fmt(capex)})",
                opex_delta,
                rf"{fmt(savings_excluding_embodied)} ({fmt(savings_counting_actual_embodied)})",
            )
        )

    return rows


def print_diff_table(
    rows: list[tuple[str, str, str, float, str]],
    caption: str,
    label: str,
) -> None:
    print(r"\begin{table}[t]")
    print(r"\centering")
    print(r"\small")
    print(rf"\caption{{{caption}}}\label{{{label}}}")
    print(r"\small")
    print(r"\begin{tabular}{lrrrr}")
    print(r"\toprule")
    print(r"\multirow{2}{*}{\shortstack[l]{System\\Name}} & \multicolumn{1}{c}{Util. (\%)} & \multicolumn{3}{c}{Carbon (kg CO$_2$e)} \\")
    print(r" & \multicolumn{1}{c}{Add.} & \multicolumn{1}{c}{Embod.} & \multicolumn{1}{c}{Operat.} & \multicolumn{1}{c}{Saved} \\")
    print(r"\midrule")
    for idx, (name, utilization, embodied_value, operational_value, savings_value) in enumerate(rows):
        bold_savings = f"\\textbf{{{savings_value}}}"
        print(
            f"{name} & {utilization} & {embodied_value} & {fmt(operational_value)} & "
            f"{bold_savings} \\\\"
        )
        if idx == 0:
            print(r"\midrule")
    print(r"\bottomrule")
    print(r"\end{tabular}")
    print(r"\end{table}")


def print_utilization_table(
    rows: list[tuple[str, str, str, str]],
    caption: str,
    label: str,
) -> None:
    print(r"\begin{table}[t]")
    print(r"\centering")
    print(r"\small")
    print(rf"\caption{{{caption}}}\label{{{label}}}")
    print(r"\small")
    print(r"\begin{tabular}{lrrr}")
    print(r"\toprule")
    print(r"\multirow{2}{*}{\shortstack[l]{System\\Name}} & \multicolumn{3}{c}{Util. (\%)} \\")
    print(r" & \multicolumn{1}{c}{Base} & \multicolumn{1}{c}{Add.} & \multicolumn{1}{c}{Total} \\")
    print(r"\midrule")
    for idx, (name, base_utilization, total_utilization, added_utilization) in enumerate(rows):
        print(
            f"{name} & {base_utilization} & {added_utilization} & {total_utilization} \\\\"
        )
        if idx == 0:
            print(r"\midrule")
    print(r"\bottomrule")
    print(r"\end{tabular}")
    print(r"\end{table}")


def main() -> None:
    for cloud_utilization in CLOUD_UTILIZATION_SCENARIOS:
        if cloud_utilization != CLOUD_UTILIZATION_SCENARIOS[0]:
            print()
        scenario = rf"{cloud_utilization}\% cloud utilization on {AWS_PHYSICAL_CORES_USED:g} physical cores. "
        capacity_note = (
            r"Each Pi retains a 10\% baseline; only the DBMS workload is split equally across "
            r"enough Pis to keep each at or below 100\%. Utilization is per machine; "
            r"all deployed Pis are assumed to already run at 10\%, so operational carbon "
            r"subtracts every Pi's baseline and no new embodied carbon is counted."
        )
        suffix = "" if cloud_utilization == CLOUD_UTILIZATION else f"-cloud-{cloud_utilization}pct"
        print_utilization_table(
            utilization_rows(cloud_utilization),
            scenario
            + r"Base, additional DBMS, and total utilization, rounded to whole numbers. "
            r"Local totals include a 10\% office baseline per machine; additional utilization is measured "
            r"in percentage points (p.p.). The dedicated cloud instance has no office baseline. "
            + capacity_note,
            f"tab:advanced-single-estimates-utilization{suffix}",
        )
        print()
        print_diff_table(
            diff_rows(cloud_utilization),
            rf"Six-year carbon comparison in Germany. Cloud is fixed at {cloud_utilization}\% utilization; "
            r"local baseline uses 10\%, and the \ac{dbms}-added case scales added utilization by CPU core count, "
            r"with a 2:1 mapping for the Raspberry Pi. "
            + r"Local embodied carbon is excluded; parentheses include all deployed hardware's embodied carbon. "
            + capacity_note,
            f"tab:advanced-single-estimates-carbon-diff{suffix}",
        )


if __name__ == "__main__":
    main()
