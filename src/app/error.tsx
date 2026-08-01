"use client";

import { useEffect } from "react";
import ErrorScreen from "@/components/errorScreen/ErrorScreen";

interface RouteErrorProps {
  error: Error & { digest?: string };
}

/** Error boundaries must be Client Components. No "Try again" here - the
 *  design only calls for a "Back to home" recovery path. */
const RouteError: React.FC<RouteErrorProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorScreen />;
};

export default RouteError;
