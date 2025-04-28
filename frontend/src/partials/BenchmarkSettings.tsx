import CPU_DATA from "../assets/data";
import { GRID_INTENSITY } from "../assets/grid_intensities";
import { useBenchmarkContext } from "../utility/BenchmarkContext";
import ToggleSelection from "../utility/ToggleSelection";
import { addCommaToNumber } from "../utility/UtilityFunctions";
import { getCountryColor } from "../partials/GeoMap";
// @tsignore
import GeoMap from "../partials/GeoMap";
import { ListItem } from "./DetailedBreakdown";

export const WORKLOAD_TYPES = ['SPECrate', 'SPECspeed', 'Sorting', 'TPC-H'] as const;
export type WorkloadType = typeof WORKLOAD_TYPES[number];

export const WORKLOAD_EXPLANATIONS: string[] = [
  'Measures multi-threaded performance, simulating environments such as databases and web servers.¹',
  'Evaluates single-threaded performance for general purpose tasks such as data compression and text processing.¹',
  'A common yet computationally challenging task that is difficult to fully parallelize. A vector of four billion random integer values (uint32_t, 16GB) is generated, then the time to sort the entire vector is measured',
  'Assesses analytical database performance by running TPC-H workloads with a scale factor of 10 and 25 read-only query streams on the open-source in-memory database system Hyrise.²˒³'
]

export const SCALING_EXPLANATIONS: string[] = [
  'The utilization and workload stay the same across both configurations',
  'The workload amount stays the same, while the utilization of the stronger hardware is scaled down to match the workload',
  'The utilization stays the same, while the workload of the stronger performing hardware is scaled up to match the increase in performancei'
];

export const SCALING_TYPES = ['None', 'Utilization', 'Resources'] as const;
export type ScalingType = typeof SCALING_TYPES[number];

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

  const { country, currentCPU, newCPU, workload, scaling, utilization, singleComparison, setCountry, setWorkload, setScaling, setUtilization } = useBenchmarkContext();

  const intensity = GRID_INTENSITY[country];
  let disabledWorkload: WorkloadType[] = [];

  WORKLOAD_TYPES.forEach(workload => {
    let push = false
    if (CPU_DATA[currentCPU][WORKLOAD_MAPPING[workload]] === null) push = true;
    if (!singleComparison && CPU_DATA[newCPU][WORKLOAD_MAPPING[workload]] === null) push = true;

    // push only if it is not alreal in disableWorkload
    if (push && !disabledWorkload.includes(workload)) disabledWorkload.push(workload)
  })

  // need to reset workload if restriced cpu is selected after workload is set
  if (disabledWorkload.includes(workload)) setWorkload(WORKLOAD_TYPES[0])


  return (
    <div className="flex z-30 flex-col text-medium font-medium flex-wrap px-4 py-2 gap-4">
      <div className="grid grid-cols-7 space-x-4">
        <div className="flex flex-col col-span-5 justify-evenly gap-2">
          <ToggleSelection<WorkloadType>
            label="Workload:"
            options={[...WORKLOAD_TYPES]}
            optionsTooltip={WORKLOAD_EXPLANATIONS}
            currentState={workload}
            setState={setWorkload}
            zIndex="z-30"
            disabled={disabledWorkload}
            flexGrow={false}
          />
          <ToggleSelection<ScalingType>
            label="Scaling:"
            options={[...SCALING_TYPES]}
            optionsTooltip={SCALING_EXPLANATIONS}
            currentState={scaling}
            setState={setScaling}
            zIndex="z-30"
            disabled={['Resources']}
            flexGrow={false}
          />
          <div className="flex gap-2 items-center">
            <label><p>Utilization %:</p></label>
            <input
              className="grow accent-orange-600"
              type="range"
              value={utilization}
              min={0}
              max={100}
              onChange={(e) => setUtilization(Number(e.target.value))}
            />
            <div className="flex gap-1">
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
        </div>
        <div className="flex font-normal gap-2 flex-col col-span-2">
            <ListItem
              label="Location"
              value={country}
              borderColor={getCountryColor(intensity)}
            />
            <ListItem
              label="Grid Carbon Intensity"
              value={`${addCommaToNumber(intensity)} gCO₂/kWh`}
              borderColor={getCountryColor(intensity)}
            />
        </div>
      </div>
      <GeoMap country={country} setCountry={setCountry} />
    </div>
  )
}

export default BenchmarkSettings;
