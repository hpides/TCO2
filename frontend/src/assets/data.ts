import { CPUEntry } from "../partials/BenchmarkSettings";

export interface CPUs {
  [key: string]: CPUEntry;
}

export const INTEL = "Intel";
export const AMD = "AMD";

export interface CPUMetric {
  label: Exclude<keyof CPUEntry, "MAKE">;
  unit: string | null;
  tofixed: number;
  delimeter: boolean;
}

export const CPU_METRICS: Record<string, CPUMetric> = {
  "Launch Year": { label: "LAUNCH_YEAR", unit: null, tofixed: 0, delimeter: false },
  "Core Count": { label: "CORE_COUNT", unit: null, tofixed: 0, delimeter: true },
  "Thread Count": { label: "THREAD_COUNT", unit: null, tofixed: 0, delimeter: true },
  "TDP": { label: "TDP", unit: "Watts", tofixed: 0, delimeter: true },
  "TPC-H runs /hr": { label: "TPCH_RUNS_PER_H", unit: "Runs/hour", tofixed: 2, delimeter: true },
  "SPECrate": { label: "SPECINT_RATE", unit: null, tofixed: 2, delimeter: true },
  "SPECspeed": { label: "SPECINT", unit: null, tofixed: 2, delimeter: true },
  "Sorted Tuples per second": { label: "SORTED_TUPLES_PER_S", unit: "Tuples/second", tofixed: 0, delimeter: true },
  "Sorted Tuples per joule": { label: "SORTED_TUPLES_PER_JOULE", unit: "Tuples/Joule", tofixed: 0, delimeter: true },
  "TPCH runs": { label: "TPCH_RUNS_PER_KJOULE", unit: "Runs/KiloJoule", tofixed: 3, delimeter: true },
  "SPECspeed per TDP": { label: "SPECINT_PER_TDP", unit: "Score/Watt", tofixed: 2, delimeter: true },
  "SPECrate per TDP": { label: "SPECINTrate_PER_TDP", unit: "Score/Watt", tofixed: 2, delimeter: true }
};

const CPU_DATA : CPUs= {
  "Intel Xeon E7-4880 v2": {
    "MAKE": INTEL,
    "LAUNCH_YEAR": 2014,
    "CORE_COUNT": 15,
    "THREAD_COUNT": 30,
    "TDP": 130,
    "SORTED_TUPLES_PER_S": 125118509.906611,
    "TPCH_RUNS_PER_H": 39.7660,
    "SPECINT_RATE": 61.111111111111,
    "SPECINT": 6.02222222222222,
    "SORTED_TUPLES_PER_JOULE": 978026.6747,
    "TPCH_RUNS_PER_KJOULE": 0.0897,
    "SPECINT_PER_TDP": 1.38974358974359,
    "SPECINTrate_PER_TDP": 0.470085470085469,
    "DIE_SIZE": 541 // UNSURE
  },
  "Intel Xeon E7-4850 v4": {
    "MAKE": INTEL,
    "LAUNCH_YEAR": 2016,
    "CORE_COUNT": 32,
    "THREAD_COUNT": 16,
    "TDP": 115,
    "SORTED_TUPLES_PER_S": 140307773.660298,
    "TPCH_RUNS_PER_H": 36.3625,
    "SPECINT_RATE": 109.25,
    "SPECINT": 6.66666666666667,
    "SORTED_TUPLES_PER_JOULE": 1510612.81029875,
    "TPCH_RUNS_PER_KJOULE": 0.1037,
    "SPECINT_PER_TDP": 1.85507246376811,
    "SPECINTrate_PER_TDP": 0.95,
    "DIE_SIZE": 456 // UNSURE
  },
  "Intel Xeon Platinum 8180": {
    "MAKE": INTEL,
    "LAUNCH_YEAR": 2017,
    "CORE_COUNT": 56,
    "THREAD_COUNT": 28,
    "TDP": 205,
    "SORTED_TUPLES_PER_S": 203679961.220965,
    "TPCH_RUNS_PER_H": 81.5934,
    "SPECINT_RATE": 141,
    "SPECINT": 9.324,
    "SORTED_TUPLES_PER_JOULE": 1042027.57725983,
    "TPCH_RUNS_PER_KJOULE": 0.1106,
    "SPECINT_PER_TDP": 2.54704390243902,
    "SPECINTrate_PER_TDP": 0.673170731707317,
    "DIE_SIZE": 694 // UNSURE
  },
  "Intel Xeon Platinum 8259CL": {
    "MAKE": INTEL,
    "LAUNCH_YEAR": 2019,
    "CORE_COUNT": 48,
    "THREAD_COUNT": 24,
    "TDP": 165,
    "SORTED_TUPLES_PER_S": 191378142.90516,
    "TPCH_RUNS_PER_H": 88.0331,
    "SPECINT_RATE": 139,
    "SPECINT": 10.3,
    "SORTED_TUPLES_PER_JOULE": 1003698.62944952,
    "TPCH_RUNS_PER_KJOULE": 0.1164,
    "SPECINT_PER_TDP": 2.99636363636364,
    "SPECINTrate_PER_TDP": 0.6666666666,
    "DIE_SIZE": 754 // UNSURE
  },
  "Intel Xeon Platinum 8352Y": {
    "MAKE": INTEL,
    "LAUNCH_YEAR": 2021,
    "CORE_COUNT": 32,
    "THREAD_COUNT": 64,
    "TDP": 205,
    "SORTED_TUPLES_PER_S": 303998667.7562,
    "TPCH_RUNS_PER_H": 114.5736,
    "SPECINT_RATE": 215,
    "SPECINT": 11.6777,
    "SORTED_TUPLES_PER_JOULE": 1511657.5249,
    "TPCH_RUNS_PER_KJOULE": 0.1552,
    "SPECINT_PER_TDP": 3.64572097560976,
    "SPECINTrate_PER_TDP": 1.04878048780488,
    "DIE_SIZE": 660 // UNSURE
  },
  "Intel Xeon Platinum 8480CL": {
    "MAKE": INTEL,
    "LAUNCH_YEAR": 2023,
    "CORE_COUNT": 56,
    "THREAD_COUNT": 112,
    "TDP": 350,
    "SORTED_TUPLES_PER_S": 488892652.275884,
    "TPCH_RUNS_PER_H": 167.9686,
    "SPECINT_RATE": 443.5,
    "SPECINT": 14.725,
    "SORTED_TUPLES_PER_JOULE": 1422304.14694109,
    "TPCH_RUNS_PER_KJOULE": 0.1332,
    "SPECINT_PER_TDP": 4.7264,
    "SPECINTrate_PER_TDP": 1.26714285714286,
    "DIE_SIZE": (4*477) // https://www.techpowerup.com/cpu-specs/xeon-platinum-8480.c2958
  },
  "Intel Xeon Platinum 8570": {
    "MAKE": INTEL,
    "LAUNCH_YEAR": 2023,
    "CORE_COUNT": 56,
    "THREAD_COUNT": 112,
    "TDP": 350,
    "SORTED_TUPLES_PER_S": 519150568.953982,
    "TPCH_RUNS_PER_H": 179.9952,
    "SPECINT_RATE": 482,
    "SPECINT": 14.8,
    "SORTED_TUPLES_PER_JOULE": 1557475.92336907,
    "TPCH_RUNS_PER_KJOULE": 0.1399,
    "SPECINT_PER_TDP": 4.736,
    "SPECINTrate_PER_TDP": 1.37714285714286,
    "DIE_SIZE": (2*763) // https://www.techpowerup.com/cpu-specs/xeon-platinum-8570.c3410
  },
  "AMD EPYC 7601": {
    "MAKE": AMD,
    "LAUNCH_YEAR": 2017,
    "CORE_COUNT": 32,
    "THREAD_COUNT": 64,
    "TDP": 180,
    "SORTED_TUPLES_PER_S": null,
    "TPCH_RUNS_PER_H": null,
    "SPECINT_RATE": 151,
    "SPECINT": 7.16,
    "SORTED_TUPLES_PER_JOULE": null,
    "TPCH_RUNS_PER_KJOULE": null,
    "SPECINT_PER_TDP": 0.03977777777,
    "SPECINTrate_PER_TDP": 0.83888888888,
    "DIE_SIZE": 213 // https://www.techpowerup.com/cpu-specs/epyc-7601.c1920
  },
  "AMD EPYC 7402P": {
    "MAKE": AMD,
    "LAUNCH_YEAR": 2019,
    "CORE_COUNT": 24,
    "THREAD_COUNT": 48,
    "TDP": 180,
    "SORTED_TUPLES_PER_S": null,
    "TPCH_RUNS_PER_H": null,
    "SPECINT_RATE": 170,
    "SPECINT": 8.65,
    "SORTED_TUPLES_PER_JOULE": null,
    "TPCH_RUNS_PER_KJOULE": null,
    "SPECINT_PER_TDP": 0.04805555555,
    "SPECINTrate_PER_TDP": 0.94444444444,
    "DIE_SIZE": 74 // https://www.techpowerup.com/cpu-specs/epyc-7402p.c2261
  },
  "AMD EPYC 7302P": {
    "MAKE": AMD,
    "LAUNCH_YEAR": 2019,
    "CORE_COUNT": 16,
    "THREAD_COUNT": 32,
    "TDP": 155,
    "SORTED_TUPLES_PER_S": null,
    "TPCH_RUNS_PER_H": null,
    "SPECINT_RATE": 118,
    "SPECINT": 8.55,
    "SORTED_TUPLES_PER_JOULE": null,
    "TPCH_RUNS_PER_KJOULE": null,
    "SPECINT_PER_TDP": 0.05516129032,
    "SPECINTrate_PER_TDP": 0.76129032258,
    "DIE_SIZE": 74 // https://www.techpowerup.com/cpu-specs/epyc-7302p.c2262
  },
  "AMD EPYC 7513": {
    "MAKE": AMD,
    "LAUNCH_YEAR": 2021,
    "CORE_COUNT": 32,
    "THREAD_COUNT": 64,
    "TDP": 200,
    "SORTED_TUPLES_PER_S": null,
    "TPCH_RUNS_PER_H": null,
    "SPECINT_RATE": 252,
    "SPECINT": 12.3,
    "SORTED_TUPLES_PER_JOULE": null,
    "TPCH_RUNS_PER_KJOULE": null,
    "SPECINT_PER_TDP": 0.0615,
    "SPECINTrate_PER_TDP": 1.26,
    "DIE_SIZE": (8*81) //https://www.techpowerup.com/cpu-specs/epyc-7513.c2381
  },
  "AMD EPYC 7773X": {
    "MAKE": AMD,
    "LAUNCH_YEAR": 2021,
    "CORE_COUNT": 64,
    "THREAD_COUNT": 128,
    "TDP": 280,
    "SORTED_TUPLES_PER_S": null,
    "TPCH_RUNS_PER_H": null,
    "SPECINT_RATE": 406,
    "SPECINT": 12.3,
    "SORTED_TUPLES_PER_JOULE": null,
    "TPCH_RUNS_PER_KJOULE": null,
    "SPECINT_PER_TDP": 0.04392857142,
    "SPECINTrate_PER_TDP": 1.45,
    "DIE_SIZE": (8*81) //https://www.techpowerup.com/cpu-specs/epyc-7773x.c2759
  },
  "AMD EPYC 9554": {
    "MAKE": AMD,
    "LAUNCH_YEAR": 2022,
    "CORE_COUNT": 64,
    "THREAD_COUNT": 128,
    "TDP": 360,
    "SORTED_TUPLES_PER_S": null,
    "TPCH_RUNS_PER_H": null,
    "SPECINT_RATE": 655,
    "SPECINT": 14.9,
    "SORTED_TUPLES_PER_JOULE": null,
    "TPCH_RUNS_PER_KJOULE": null,
    "SPECINT_PER_TDP": 0.04138888888,
    "SPECINTrate_PER_TDP": 1.81944444444,
    "DIE_SIZE": (8*72) // https://www.techpowerup.com/cpu-specs/epyc-9554.c2930
  }
}

export default CPU_DATA;
