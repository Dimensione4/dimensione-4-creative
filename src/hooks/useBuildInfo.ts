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
    let isMounted = true;

    fetch("/build-info.json", { cache: "no-store" })
      .then(async (r) => {
        if (!r.ok) return null;

        const contentType = r.headers.get("content-type") ?? "";
        if (!contentType.includes("application/json")) {
          return null;
        }

        try {
          const data = (await r.json()) as BuildInfo;
          return data;
        } catch {
          return null;
        }
      })
      .then((data) => {
        if (isMounted) {
          setBuildInfo(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setBuildInfo(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return buildInfo;
}
