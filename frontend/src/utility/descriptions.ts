// Description of all the tooltips (D_ prefix)

const D_SPECRATE = 'Measures multi-threaded performance, simulating environments such as databases and web servers.¹'
const D_SPECSPEED = 'Evaluates single-threaded performance for general purpose tasks such as data compression and text processing.¹'
const D_SORTING = 'A common yet computationally challenging task that is difficult to fully parallelize. A vector of four billion random integer values (uint32_t, 16GB) is generated, then the time to sort the entire vector is measured'
const D_TPCH = 'Assesses analytical database performance by running TPC-H workloads with a scale factor of 10 and 25 read-only query streams on the open-source in-memory database system Hyrise.²˒³'

const D_SCALING_NONE = 'The utilization and workload stay the same across both configurations'
const D_SCALING_UTILIZATION = 'The workload amount stays the same, while the utilization of the stronger hardware is scaled down to match the workload'
const D_SCALING_RESOURCES = 'The utilization stays the same, while the workload of the stronger performing hardware is scaled up to match the increase in performancei'

export const D_EMBODIED_CARBON = 'CO2 and other greenhouse gas emissions during production, transport, and end-of-life of server components.'
export const D_OPERATIONAL_CARBON = 'CO2 and other greenhouse gas emissions resulting from the energy consumption of servers during their lifetime.'

// order of these matter
export const WORKLOAD_EXPLANATIONS: string[] = [ D_SPECRATE, D_SPECSPEED, D_SORTING, D_TPCH ]
export const SCALING_EXPLANATIONS: string[] = [ D_SCALING_NONE, D_SCALING_RESOURCES, D_SCALING_UTILIZATION ];
