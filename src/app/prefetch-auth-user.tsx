"use client";

import { useEffect } from "react";
import { tryToPrefetchAccessToken } from "@/libs/axios/refresh-access-token";

export function PrefetchAuthUser() {
  useEffect(() => {
    tryToPrefetchAccessToken();
  }, []);

  return null;
}
