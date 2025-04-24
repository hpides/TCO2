import hpiLogo from './assets/hpi_logo.svg';
import desLogo from './assets/des_logo_transparent.png';
import './style.css'
import Compare from './partials/Compare';
import BenchmarkSettings from './partials/BenchmarkSettings';
import LineChart from './charts/lineChart';
import DetailedBreakdown from './partials/DetailedBreakdown';

type SectionsProps = {
  title: string;
  markup: React.ReactNode;
};

const Sections: React.FC<SectionsProps> = ({ title, markup }) => {
  return (
    <>
      <section>
        <div className='w-full flex items-center gap-4'>
          <h2 className='text-lg'>{title}</h2>
          <hr className='border-t-hpi-red grow border-t-2 border-r-full' />
        </div>
        {markup}
      </section>
    </>
  );
};

function App() {
  console.log("%cWelcome to %cHPI%c's Interactive Demo on Ecological Efficiency in Database Server Lifecycles", '', 'color: #ff8904; font-weight: bolder; font-size: 0.8rem', '');

  return (
    <>
      <header className='h-28 2xl:h-32 pl-12 p-4 flex gap-10'>
        <a href='https://hpi.de/'>
          <img src={hpiLogo} className='h-full hover:scale-105 duration-200' />
        </a>

        <a href='https://hpi.de/en/research/research-groups/data-engineering-systems/'>
          <img src={desLogo} className='h-full hover:scale-105 duration-200' />
        </a>
      </header>
      <main className='w-full px-10 max-w-[2000px] mx-auto relative flex flex-col gap-8'>
        <section className='flex flex-col justify-center py-4'>
          <h1 className='text-3xl text-center'>TCO<sub>2</sub>: Analyzing the Carbon Footprint of Database Server
            Replacements</h1>
          <p className='text-cyan-700 underline underline-offset-2 text-lg text-center'>
            <a
              href='https://hpi.de/rabl/news/2024/paper-on-ecological-efficiency-of-database-servers-accepted-at-cidr-2025.html'
              target='_blank'
            >Read Paper</a>
          </p>
        </section>
        <section className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <div className='col-span-1 flex flex-col gap-8'>
            <Sections title='Server Configurations' markup={<Compare />} />
            <Sections title='Benchmark Settings' markup={<BenchmarkSettings />} />
          </div>
          <div className='col-span-1 flex flex-col gap-8'>
            <Sections title='Break-Even Analysis' markup={<LineChart />} />
            <Sections title='Detailed Breakdown' markup={<DetailedBreakdown />} />
          </div>
        </section>
      </main>
      <section className='flex flex-col text-slate-600 w-full md:w-3/4 px-2 lg:w-3/5 max-w-[2000px] mx-auto text-left mt-14'>
        <p>1. SPEC CPU Benchmark - <a className='underline hover:opacity-65' href='https://www.spec.org/cpu2017/'>spec.org/cpu2017</a></p>
        <p>2. TPC-H - <a className='underline hover:opacity-65' href='https://www.tpc.org/tpch/'>tpc.org/tpch</a></p>
        <p>3. Hyrise - Hyrise is a research in-memory database. <a className='underline hover:opacity-65' href='https://github.com/hyrise/hyrise'>github.com/hyrise/hyrise</a></p>
      </section>
      <footer className='w-full flex flex-col py-10 items-center gap-3 bg-[#CE682A] text-white mt-6 bottom-0'>
        <div className='w-full md:w-3/4 px-2 lg:w-3/5 max-w-[2000px] text-lg flex flex-col gap-2'>
          <p className='hover:underline w-fit'>
            <a href='https://hpi.de/'>
              Hasso Plattner Institute
            </a>
          </p>
          <p className='hover:underline w-fit'>
            <a href='https://hpi.de/rabl/home.html'>
              Data Engineering Systems Group
            </a>
          </p>
          <p className='hover:underline w-fit'>
            <a href='https://github.com/hpides/server-buy-advisor'>
              Github
            </a>
          </p>
          <p className='hover:underline w-fit'>
            <a href='https://hpi.de/rabl/news/2024/paper-on-ecological-efficiency-of-database-servers-accepted-at-cidr-2025.html'>Read Paper</a>
          </p>
        </div>
        <p className='text-center font-extralight'>© Copyright Hasso-Plattner-Institut 2025</p>
      </footer>
    </>
)
}

export default App
