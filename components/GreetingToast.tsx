"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export const GreetingToast = () => {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      toast.success("Hello! Welcome to my portfolio.");
    }, 150);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
};