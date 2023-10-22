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
  toggleNavBarBgColor: () => void;
  onSignOut: () => Promise<void>;
  callbackUrl: string;
};

const ProfileMenu = ({
  userData,
  toggleNavBarBgColor,
  onSignOut,
  callbackUrl,
}: ProfileMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="relative h-[40px] w-[40px] rounded-full p-0 hover:bg-transparent hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-1 lg:h-[48px] lg:w-[48px]"
        onClick={toggleNavBarBgColor}
      >
        {userData ? (
          <Image
            src={profileSignedIn}
            alt="profile"
            fill
            sizes="(max-width: 1024px) 40px, 48px"
            className="rounded-full object-cover ring-1 ring-white ring-offset-1 "
          />
        ) : (
          <ProfileIcon />
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
                  <p className="text-xs leading-none text-gray-600">
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
          >
            <SignOutIcon />
            Sign Out
          </DropdownMenuItem>
        )}

        {/* display the log in and create acount button if the user is not signed in */}
        {!userData && (
          <Fragment>
            <DropdownMenuItem className="cursor-pointer text-sm font-semibold text-white focus:bg-slate-800 ">
              <Link
                href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                className="flex w-full items-center gap-x-2"
              >
                <CreateAccountIcon />
                Create Account
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="cursor-pointer text-sm">
              <Link
                href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                className="flex w-full items-center gap-x-2"
              >
                <SignInIcon />
                Log In
              </Link>
            </DropdownMenuItem>
          </Fragment>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
