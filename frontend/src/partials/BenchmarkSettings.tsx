import CPU_DATA from "../assets/data";
import { GRID_INTENSITY } from "../assets/grid_intensities";
import { useBenchmarkContext } from "../utility/BenchmarkContext";
import ToggleSelection from "../utility/ToggleSelection";
import { addCommaToNumber } from "../utility/UtilityFunctions";
import { getCountryColor } from "../partials/GeoMap";
// @tsignore
import GeoMap from "../partials/GeoMap";
// @ts-ignore
import { COUNTRY_NAMES } from '../assets/countries.js';
import { ListItem, ListItemWithSearch } from "../utility/ListItems";
import { WORKLOAD_EXPLANATIONS, SCALING_EXPLANATIONS } from "../utility/descriptions";

export const WORKLOAD_TYPES = ['SPECrate', 'SPECspeed', 'Sorting', 'TPC-H'] as const;
export type WorkloadType = typeof WORKLOAD_TYPES[number];

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

  const { country, currentCPU, newCPU, workload, scaling, utilization, singleComparison, advancedSettings, setCountry, setWorkload, setScaling, setUtilization } = useBenchmarkContext();

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
            <label><p>{advancedSettings ? 'Current HW ' : ''}Utilization %:</p></label>
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
          <div hidden={!advancedSettings} className="flex gap-2 items-center">
            <label><p>New HW Utilization %:</p></label>
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
          <ListItemWithSearch
            label="Location"
            value={country}
            options={COUNTRY_NAMES}
            onChange={setCountry}
            borderColor={getCountryColor(intensity)}
          />
          <ListItem
            label="Grid Carbon Intensity"
            value={`${addCommaToNumber(intensity)} gCO₂/kWh`}
            borderColor={getCountryColor(intensity)}
          />
        </div>
      </div>
      <div className={`${advancedSettings ? 'h-0' : 'h-96'} duration-300 ease-in-out overflow-hidden relative`}>
        <GeoMap country={country} setCountry={setCountry} />
      </div>
    </div>
  )
}

export default BenchmarkSettings;
