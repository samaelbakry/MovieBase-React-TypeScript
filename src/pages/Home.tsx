import { lazy, Suspense } from "react";
import LoadingScreen from "../components/common/LoadingScreen";

const Hero = lazy(() => import("../components/sections/Hero"));
const People = lazy(() => import("../components/sections/People"));
const Series = lazy(() => import("../components/sections/Series"));

const Home = () => {
  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <Hero />
      </Suspense>
      
      <Suspense fallback={<LoadingScreen />}>
        <Series />
      </Suspense>

      <Suspense fallback={<LoadingScreen />}>
        <People />
      </Suspense>
    </>
  );
};

export default Home;
