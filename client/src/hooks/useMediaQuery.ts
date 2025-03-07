import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const updateMatch = () => setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener("change", updateMatch);
    return () => mediaQueryList.removeEventListener("change", updateMatch);
  }, [query]);

  return matches;
}
