"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";

const NavBar = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [dropDown, setDropDown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <>
      <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
          LogoImg
          <span className="logo_text">Promptopia</span>
        </Link>
        {/* For desktop view */}
        <div className="sm:flex hidden">
          {/* It is done so that when you transit from big to small screen the children of this div is hidden. You can try your self too by removing this css.  */}
          {session?.user ? (
            <div>
              <div className="flex gap-3 md:gap-5">
                <Link href="/create-prompt" className="black_btn">
                  Create Post
                </Link>
                <button className="outline_btn" onClick={signOut}>
                  LogOut
                </button>
                <Link href="/profile">
                  <Image
                    src={session?.user.image}
                    height={32}
                    width={32}
                    className="rounded-full"
                    onClick={() => setDropDown((prev) => !prev)}
                  />
                </Link>
              </div>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    SignIn
                  </button>
                ))}
            </>
          )}
        </div>

        {/* For Small Screen As the options of CreatePost, Signout and MyProfile cant be viewed fully. Here dropdown is used as an alternative */}
        <div className="sm:hidden flex relative">
          {session?.user ? (
            <div className="flex">
              <Image
                src={session?.user.image}
                height={37}
                width={37}
                className="rounded-full"
                onClick={() => setDropDown((prev) => !prev)}
              />
              {dropDown && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={() => setDropDown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/create-prompt"
                    className="dropdown_link"
                    onClick={() => setDropDown(false)}
                  >
                    Create Prompt
                  </Link>

                  <button
                    type="button"
                    className="mt-5 w-full black_btn"
                    onClick={() => {
                      setDropDown(false);
                      signOut();
                    }}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => {
                  return (
                    <button
                      type="button"
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      className="black_btn"
                    >
                      SignIn
                    </button>
                  );
                })}
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
