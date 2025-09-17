"use client"
import { isUserLoggedIn } from "@/utils";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Page() {
  var u = null;
  useLayoutEffect(() => {
    u = isUserLoggedIn();
  }, []);
  if (u) {
    redirect("/auth/login");
  }else{
    redirect("/home");
  }
}

