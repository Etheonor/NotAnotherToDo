import Image from 'next/image';
import landTop from 'public/landing/land-top.svg';

const Landing = (): JSX.Element => (
  <div className="w-full mt-10 mb-20 text-base-content">
    <div className="flex flex-wrap justify-around max-w-6xl m-auto">
      <div className="max-w-sm my-auto mr-16">
        <h2 className="text-4xl font-bold leading-normal text-center lg:text-left font-title">
          Tired of create <span className="text-primary">To Do App</span> to
          learn a new language?
        </h2>
        <p className="text-center lg:text-left">
          We understand! We are here to help you find new project ideas and
          guide you in their realization with accurate backlogs for beginners!
        </p>
      </div>
      <div className="max-w-xl">
        <Image
          src={landTop as string}
          height={417}
          width={583}
          alt="Construction of a website"
        />
      </div>
    </div>
  </div>
);

export default Landing;
