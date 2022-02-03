/*
This is your Nav component. It contain a responsive navbar 
*/

import { LogOut, Menu } from 'react-feather';

import Image from 'next/image';
import { IoLogoGithub } from 'react-icons/io';
import Link from 'next/link';
import Logo from 'public/logo.svg';
import { User } from '@supabase/gotrue-js';
import { connectWithGithub } from 'utils/supabaseClient';

type NavProperties = {
  user: User | null | undefined;
  signOut: () => void;
};

const Nav = ({ user, signOut }: NavProperties): JSX.Element => {
  // Modify you menu directly here
  const NavMenu = (
    <>
      {user && (
        <Link href="/dashboard">
          <a className="nav-btn">Dashboard</a>
        </Link>
      )}

      <Link href="https://github.com/Etheonor">
        <a id="contact" className="nav-btn">
          Github
        </a>
      </Link>

      {user ? (
        <button
          id="logOutBtn"
          className="text-xs btn btn-xs"
          onClick={() => signOut()}>
          <LogOut size={12} className="mr-2" />
          Logout
        </button>
      ) : (
        <>
          <button
            className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border rounded-md focus:outline-none border-base-200 group hover:bg-base-300"
            onClick={(event) => {
              event.preventDefault();
              void connectWithGithub();
            }}>
            <div className="text-base-content text-2xl">
              <IoLogoGithub />
            </div>
            <span className="font-medium text-base-content text-sm">
              Sign in with Github
            </span>
          </button>
        </>
      )}
    </>
  );

  return (
    <nav className="w-full mb-2 navbar">
      <Link href="/">
        <a>
          <Image
            src={Logo as string}
            alt="Not Another To Do Logo"
            width={400}
            height={50}
          />
        </a>
      </Link>

      <div className="flex-col hidden ml-auto text-sm text-center lg:flex lg:flex-row lg:space-x-10 font-body">
        {NavMenu}
      </div>
      <div className="ml-auto lg:hidden">
        <div className="dropdown dropdown-end" data-cy="dropdown">
          <div tabIndex={0} className="m-1 cursor-pointer">
            <Menu />
          </div>
          <div className="w-24 mt-3 space-y-3 text-center menu dropdown-content">
            {NavMenu}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
