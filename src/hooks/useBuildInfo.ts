import { useEffect, useState } from "react";

export type BuildInfo = {
  env: string;
  branch: string;
  commitSha: string;
  commitShort: string;
  buildTime: string;
};

export function useBuildInfo() {
  const [buildInfo, setBuildInfo] = useState<BuildInfo | null>(null);

  useEffect(() => {
    fetch("/build-info.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setBuildInfo(data))
      .catch(() => setBuildInfo(null));
  }, []);

  return buildInfo;
}