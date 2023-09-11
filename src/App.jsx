import { useEffect } from "react";
import { api } from "../convex/_generated/api";
import { useQuery } from "convex/react";

function App() {
  const path = window.location.pathname;
  const domain = window.location.hostname;
  const fragment = path.charAt(0) === "/" ? path.slice(1) : path;
  const fullUrl = useQuery(api.shortener.resolve, { short: fragment, domain });
  useEffect(() => {
    if (typeof fullUrl === "string") {
      window.location.replace(fullUrl);
    }
  }, [fullUrl]);
  if (fullUrl === null) {
    return (
      <>
        <p>Link not found.</p>
      </>
    );
  }
  return <></>;
}

export default App;
