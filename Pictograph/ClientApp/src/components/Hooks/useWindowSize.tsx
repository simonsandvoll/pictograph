import { useLayoutEffect, useState } from "react";
import throttle from "../Tools/Throttle";

export default function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
      console.log("throttled?");
    }
    window.addEventListener("resize", throttle(updateSize, 300));
    updateSize();
    return () =>
      window.removeEventListener("resize", throttle(updateSize, 300));
  }, []);
  return size;
}
