"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import Skeleton from "@/components/Skeleton";
import { isUserLoggedIn, handleLogout } from "@/utils";

export const UserProfile = () => {
  const [user, setUser] = useState(null);
  useLayoutEffect(() => {
    const u = isUserLoggedIn();
    setUser(u);
    console.log(u);
  }, []);

  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAvatar("/icons/emilys.svg");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  const loading = !avatar; // show skeletons until avatar is ready

  return (
    <section className="mt-12">
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] w-[300px] md:w-[340px] px-8 py-10 flex flex-col items-center border border-[#E2E2E2]">
        <div className="h-24 w-24 rounded-full overflow-hidden shadow">
          {loading ? (
            <Skeleton className="h-24 w-24 rounded-full" />
          ) : (
            <Image
              src={avatar ?? null}
              alt="user profile photo"
              width={96}
              height={96}
              className="object-cover h-24 w-24"
              unoptimized
            />
          )}
        </div>

        {loading ? (
          <Skeleton className="h-6 w-40 mt-4 rounded-md" />
        ) : (
          <p className="mt-4 text-[16px] font-semibold text-primary">
            {user.firstName + " " + user.lastName}
          </p>
        )}

        {loading ? (
          <Skeleton className="h-4 w-52 mt-2 rounded-md" />
        ) : (
          <p className="mt-1 text-sm text-gray-500">{user.email}</p>
        )}

        {loading ? (
          <Skeleton className="h-4 w-24 mt-2 rounded-md" />
        ) : (
          <p className="mt-1 text-sm text-gray-500">{user.gender}</p>
        )}

        <button
          type="button"
          onClick={handleLogout}
          className="primary-btn mt-6 px-8 py-3 w-36 rounded-xl"
        >
          Logout
        </button>
      </div>
    </section>
  );
};
