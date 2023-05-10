import { useEffect } from "react";
import { useQuery } from "../convex/_generated/react";

function App() {
  const path = window.location.pathname;
  const fragment = path.charAt(0) === '/' ? path.slice(1) : path;
  const fullUrl = useQuery("shortener:resolve", {short: fragment});
  useEffect(() => {
    if (typeof fullUrl === "string") {
      window.location.assign(fullUrl);
    }
  }, [fullUrl]);
  if (fullUrl === null) {
    return <><p>Link not found.</p></>;
  }
  return <></>;
}

export default App;
