"use client";

import { useEffect } from "react";
import { trackVisit } from "@/app/actions";

export const VisitTracker = () => {
  useEffect(() => {
    trackVisit();
  }, []);

  return null;
};

