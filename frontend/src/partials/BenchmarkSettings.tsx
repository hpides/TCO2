import CPU_DATA from "../assets/data";
import { useBenchmarkContext } from "../utility/BenchmarkContext";
import ToggleSelection from "../utility/ToggleSelection";
// @tsignore
import GeoMap from "../partials/GeoMap";

export type WorkloadType = 'SPECrate' | 'SPECspeed' | 'Sorting' | 'TPC-H';

export const WORKLOAD_TYPES: WorkloadType[] = ['SPECrate', 'SPECspeed', 'Sorting', 'TPC-H'];
export const WORKLOAD_EXPLANATIONS: string[] = [
  'Measures multi-threaded performance, simulating environments such as databases and web servers',
  'Evaluates single-threaded performance for general purpose tasks such as data compression and text processing',
  'A common yet computationally challenging task that is difficult to fully parallelize. A vector of four billion random integer values (uint32_t, 16GB) is generated, then the time to sort the entire vector is measured',
  'Assesses analytical database performance by running TPC-H workloads with a scale factor of 10 and 25 read-only query streams on the open-source in-memory database system Hyrise'
]

export type PerformanceType = number | null;

export const INTEL = "Intel";
export const AMD = "AMD";

export type CPUMake = typeof INTEL | typeof AMD;

export interface CPUEntry {
  MAKE: CPUMake;
  LAUNCH_YEAR: number;
  CORE_COUNT: number;
  THREAD_COUNT: number;
  TDP: number;
  SORTED_TUPLES_PER_S: PerformanceType;
  TPCH_RUNS_PER_H: PerformanceType;
  SPECINT_RATE: PerformanceType;
  SPECINT: PerformanceType;
  SORTED_TUPLES_PER_JOULE: number | null;
  TPCH_RUNS_PER_KJOULE: number | null;
  SPECINT_PER_TDP: number;
  SPECINTrate_PER_TDP: number;
  DIE_SIZE: number;
}

type PerformanceKeys = {
  [K in keyof CPUEntry]: CPUEntry[K] extends PerformanceType ? K : never;
}[keyof CPUEntry];

export interface WorkloadMappingType {
  SPECrate: PerformanceKeys;
  SPECspeed: PerformanceKeys;
  Sorting: PerformanceKeys;
  "TPC-H": PerformanceKeys;
}

export const WORKLOAD_MAPPING: WorkloadMappingType = {
  SPECrate: "SPECINT_RATE",
  SPECspeed: "SPECINT",
  Sorting: "SORTED_TUPLES_PER_S",
  "TPC-H": "TPCH_RUNS_PER_H",
};

function BenchmarkSettings() {

  const { country, currentCPU, newCPU, workload, utilization, setCountry, setWorkload, setUtilization } = useBenchmarkContext();

  let disabledWorkload: WorkloadType[] = [];

  WORKLOAD_TYPES.forEach(workload => {
    let push = false
    if (CPU_DATA[currentCPU][WORKLOAD_MAPPING[workload]] === null) push = true;
    if (CPU_DATA[newCPU][WORKLOAD_MAPPING[workload]] === null) push = true;

    // push only if it is not alreal in disableWorkload
    if (push && !disabledWorkload.includes(workload)) disabledWorkload.push(workload)
  })

  // need to reset workload if restriced cpu is selected after workload is set
  if (disabledWorkload.includes(workload)) setWorkload(WORKLOAD_TYPES[0])


  return (
    <div className="flex z-30 flex-col text-medium font-medium flex-wrap px-4 py-2 gap-2">
      <ToggleSelection<WorkloadType>
        label="Workload:"
        options={WORKLOAD_TYPES}
        optionsTooltip={WORKLOAD_EXPLANATIONS}
        currentState={workload}
        setState={setWorkload}
        zIndex="z-30"
        disabled={disabledWorkload}
        flexGrow={false}
      />
      <div className="flex gap-4 items-center">
        <label><p>Utilization %:</p></label>
        <input
          className="w-96 accent-orange-600"
          type="range"
          value={utilization}
          min={0}
          max={100}
          onChange={(e) => setUtilization(Number(e.target.value))}
        />
        <div className="flex">
          <input
            className="border rounded-md text-center bg-white"
            type="number"
            min={0}
            max={100}
            value={utilization}
            onChange={(e) => setUtilization(Number(e.target.value))}
          />
          <p>%</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-normal"><strong className="font-medium">Location: </strong> {country}</p>
        <GeoMap country={country} setCountry={setCountry} />
      </div>
    </div>
  )
}

export default BenchmarkSettings;
