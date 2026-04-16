import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { lazy, Suspense } from "react";

import LoadingScreen from "./components/common/LoadingScreen";
const Home = lazy(() => import("./pages/Home"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const AllMovies = lazy(() => import("./pages/AllMovies"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const AllTrending = lazy(() => import("./pages/AllTrending"));
const SeriesPage = lazy(() => import("./pages/SeriesPage"));
const SeriesDetails = lazy(() => import("./pages/SeriesDetails"));
const PeopleDetails = lazy(() => import("./pages/PeopleDetails"));
const FavoriteListPage = lazy(() => import("./pages/FavoriteListPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"))

const withSuspense = (Component: any) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component />
  </Suspense>
);

const App = () => {

  const route = createBrowserRouter([
    { path: "", element: <MainLayout />, 
		children: [{index:true, element: <Navigate to={"/home"} />},
        { path: "home", element: withSuspense(Home) },
        { path: "login", element: withSuspense(LoginPage) },
        { path: "movies", element: withSuspense(AllMovies) },
        { path: "movieDetails/:id", element: withSuspense(MovieDetails) },
        { path: "trending", element: withSuspense(AllTrending) },
        { path: "series", element: withSuspense(SeriesPage) },
        { path: "seriesDetails/:id", element: withSuspense(SeriesDetails) },
        { path: "people/:id", element: withSuspense(PeopleDetails) },
        { path: "favoriteListPage", element: withSuspense(FavoriteListPage) },
        { path: "searchPage", element: withSuspense(SearchPage) },
		] },
  ]);

//   useEffect(() => {
//   session?.createRequestToken();
// }, []);

  return (
    <>
      <RouterProvider router={route} />
    </>
  );
};

export default App;
