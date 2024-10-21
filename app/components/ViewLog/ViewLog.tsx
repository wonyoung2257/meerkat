"use client";

import { useEffect } from "react";

export default function ViewLog({ logFn }: { logFn: () => void }) {
  useEffect(() => {
    logFn();
  }, []);

  return <></>;
}
