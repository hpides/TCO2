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

export interface ServerPresetType {
  specific_name: string;
  instance: 'EC2' | 'Azure';
  cpu: keyof CPUs;
  ram: number;
  ssd: number;
  hdd: number;
}

export interface ServerPresets {
  [key: string]: ServerPresetType;
}

export const SERVER_PRESETS : ServerPresets = {
  "C5": {
    specific_name: "c5d.12xlarge",
    cpu: "Intel Xeon Platinum 8180",
    ram: 96,
    ssd: 2*900,
    hdd: 0,
    instance: "EC2"
  },
  "R5": {
    specific_name: "r5d.12xlarge",
    cpu: "Intel Xeon Platinum 8259CL",
    ram: 384,
    ssd: 2*900,
    hdd: 0,
    instance: "EC2"
  },
  "M5n": {
    specific_name: "m5dn.12xlarge",
    cpu: "Intel Xeon Platinum 8259CL",
    ram: 192,
    ssd: 2*900,
    hdd: 0,
    instance: "EC2"
  },
  "M6a": {
    specific_name: "m6a.24xlarge",
    cpu: "AMD EPYC 7552",
    ram: 384,
    ssd: 0,
    hdd: 0,
    instance: "EC2"
  },
  "M7a": {
    specific_name: "m7a.32xlarge",
    cpu: "AMD EPYC 9554",
    ram: 512,
    ssd: 0,
    hdd: 0,
    instance: "EC2"
  },
  "Dasv5": {
    specific_name: "Standard_D96as_v5",
    cpu: "AMD EPYC 7773X",
    ram: 384,
    ssd: 0,
    hdd: 0,
    instance: "Azure"
  },
  "Dasv6": {
    specific_name: "Standard_D96as_v6",
    cpu: "AMD EPYC 9554",
    ram: 384,
    ssd: 0,
    hdd: 0,
    instance: "Azure"
  }
}

const CPU_DATA :CPUs = {
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
    "CORE_COUNT": 16,
    "THREAD_COUNT": 32,
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
    "CORE_COUNT": 28,
    "THREAD_COUNT": 56,
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
    "CORE_COUNT": 24,
    "THREAD_COUNT": 48,
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
  "AMD EPYC 7371": {
    "MAKE": AMD,
    "LAUNCH_YEAR": 2018,
    "CORE_COUNT": 16,
    "THREAD_COUNT": 32,
    "TDP": 200,
    "SORTED_TUPLES_PER_S": null,
    "TPCH_RUNS_PER_H": null,
    "SPECINT_RATE": 108,
    "SPECINT": 8.34,
    "SORTED_TUPLES_PER_JOULE": null,
    "TPCH_RUNS_PER_KJOULE": null,
    "SPECINT_PER_TDP": 0.0417,
    "SPECINTrate_PER_TDP": 0.54,
    "DIE_SIZE": 213
  },
  "AMD EPYC 7451": {
    "MAKE": AMD,
    "LAUNCH_YEAR": 2017,
    "CORE_COUNT": 24,
    "THREAD_COUNT": 48,
    "TDP": 180,
    "SORTED_TUPLES_PER_S": null,
    "TPCH_RUNS_PER_H": null,
    "SPECINT_RATE": 119,
    "SPECINT": null,
    "SORTED_TUPLES_PER_JOULE": null,
    "TPCH_RUNS_PER_KJOULE": null,
    "SPECINT_PER_TDP": null,
    "SPECINTrate_PER_TDP": null,
    "DIE_SIZE": 213
  },
  "AMD EPYC 7352": {
    "MAKE": AMD,
    "LAUNCH_YEAR": 2019,
    "CORE_COUNT": 24,
    "THREAD_COUNT": 48,
    "TDP": 155,
    "SORTED_TUPLES_PER_S": null,
    "TPCH_RUNS_PER_H": null,
    "SPECINT_RATE": 176,
    "SPECINT": 8.68,
    "SORTED_TUPLES_PER_JOULE": null,
    "TPCH_RUNS_PER_KJOULE": null,
    "SPECINT_PER_TDP": null,
    "SPECINTrate_PER_TDP": null,
    "DIE_SIZE": 74*3 // 3 cores + IOD but not including IOD
  },
  "AMD EPYC 7552": {
    "MAKE": AMD,
    "LAUNCH_YEAR": 2019,
    "CORE_COUNT": 48,
    "THREAD_COUNT": 96,
    "TDP": 200,
    "SORTED_TUPLES_PER_S": null,
    "TPCH_RUNS_PER_H": null,
    "SPECINT_RATE": 295,
    "SPECINT": 8.87,
    "SORTED_TUPLES_PER_JOULE": null,
    "TPCH_RUNS_PER_KJOULE": null,
    "SPECINT_PER_TDP": null,
    "SPECINTrate_PER_TDP": null,
    "DIE_SIZE": 74*4 // 4 cores + IOD but not including IOD
  },
  "AMD EPYC 7573X": {
    "MAKE": AMD,
    "LAUNCH_YEAR": 2022,
    "CORE_COUNT": 32,
    "THREAD_COUNT": 64,
    "TDP": 280,
    "SORTED_TUPLES_PER_S": null,
    "TPCH_RUNS_PER_H": null,
    "SPECINT_RATE": 303,
    "SPECINT": 12.81,
    "SORTED_TUPLES_PER_JOULE": null,
    "TPCH_RUNS_PER_KJOULE": null,
    "SPECINT_PER_TDP": null,
    "SPECINTrate_PER_TDP": null,
    "DIE_SIZE": 8*81
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
    "SPECINT_PER_TDP": null,
    "SPECINTrate_PER_TDP": null,
    "DIE_SIZE": 8*81
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
    "SPECINT_PER_TDP": null,
    "SPECINTrate_PER_TDP": null,
    "DIE_SIZE": 8*72
  }
}

export default CPU_DATA;
