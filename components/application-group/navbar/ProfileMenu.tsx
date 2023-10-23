"use client";

import { Fragment } from "react";
import Link from "next/link";

import { SignInIcon, SignOutIcon } from "@/components/ui/icons/Icons";
import { ProfileIcon, CreateAccountIcon } from "@/components/ui/icons/Icons";
import profileSignedIn from "@/assets/images/placeholders/profile-signed-in.svg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export type UserProfileData = {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

type ProfileMenuProps = {
  userData: UserProfileData | null;
  onSignOut: () => Promise<void>;
  callbackUrl: string;
};

const ProfileMenu = ({
  userData,
  onSignOut,
  callbackUrl,
}: ProfileMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group hover:bg-transparent hover:text-white focus-visible:outline-none">
        {userData ? (
          <div
            className="relative h-[40px] w-[40px] rounded-full p-0 lg:h-[48px] lg:w-[48px]"
            tabIndex={0}
            aria-label="User profile image"
          >
            <Image
              src={profileSignedIn}
              alt="profile"
              fill
              sizes="(max-width: 1024px) 40px, 48px"
              className="rounded-full object-cover ring-1 ring-white ring-offset-1"
            />
          </div>
        ) : (
          <div
            className="relative h-[32px] w-[32px] rounded-full p-0 group-focus-visible:ring-2 group-focus-visible:ring-white lg:h-[40px] lg:w-[40px]"
            tabIndex={0}
            aria-label="User profile icon"
          >
            <ProfileIcon />
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 py-2" align="end" forceMount>
        {userData && (
          <Fragment>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-2">
                {/* display the users name if it exists */}
                {userData.firstName && (
                  <p className="font-semibold leading-none">
                    {userData.firstName} {userData.lastName}
                  </p>
                )}

                {/* display the users email if it exists */}
                {userData.email && (
                  <p className="text-sm leading-none text-gray-400">
                    {userData.email}
                  </p>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </Fragment>
        )}

        {/* display the sign out button if the user is signed in */}
        {userData && (
          <DropdownMenuItem
            onClick={onSignOut}
            className="flex cursor-pointer items-center gap-x-2"
            role="button"
            aria-label="Sign out"
          >
            <SignOutIcon />
            <span>Sign Out</span>
          </DropdownMenuItem>
        )}

        {/* display the log in and create account button if the user is not signed in */}
        {!userData && (
          <Fragment>
            <DropdownMenuItem
              className="cursor-pointer text-sm font-semibold text-white focus:bg-slate-800"
              role="button"
              aria-label="Create account"
            >
              <Link
                href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                className="flex w-full items-center gap-x-2"
              >
                <CreateAccountIcon />
                <span>Create Account</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer text-sm"
              role="button"
              aria-label="Log in"
            >
              <Link
                href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                className="flex w-full items-center gap-x-2"
              >
                <SignInIcon />
                <span>Log In</span>
              </Link>
            </DropdownMenuItem>
          </Fragment>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
