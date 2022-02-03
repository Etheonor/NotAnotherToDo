import dynamic from 'next/dynamic';

const Footer = (): JSX.Element => {
  const ThemeToggle = dynamic(() => import('components/UI/ThemeToggle'), {
    ssr: false,
  });
  return (
    <footer className="flex w-full">
      <nav className="mr-auto">
        <div className="flex flex-col w-full justify-evenly sm:flex-row sm:space-x-10">
          <div className="">© {process.env.NEXT_PUBLIC_TITLE}</div>
        </div>
      </nav>
      <div className="my-auto mr-5">
        <ThemeToggle />
      </div>
    </footer>
  );
};

export default Footer;
