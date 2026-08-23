import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { lazy, Suspense, type ComponentType } from "react";

import LoadingScreen from "./components/common/LoadingScreen";
const Home = lazy(() => import("./pages/home/Home"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const AllMovies = lazy(() => import("./pages/trending/AllMovies"));
const MovieDetails = lazy(() => import("./pages/details/MovieDetails"));
const AllTrending = lazy(() => import("./pages/trending/AllTrending"));
const SeriesPage = lazy(() => import("./pages/series/SeriesPage"));
const SeriesDetails = lazy(() => import("./pages/details/SeriesDetails"));
const PeopleDetails = lazy(() => import("./pages/details/PeopleDetails"));
const FavoriteListPage = lazy(
  () => import("./pages/userCollectionPages/FavoriteListPage"),
);
const WatchListPage = lazy(
  () => import("./pages/userCollectionPages/WatchListPage"),
);
const SearchPage = lazy(() => import("./pages/search/SearchPage"));
const UserPage = lazy(() => import("./pages/userCollectionPages/UserPage"));

const withSuspense = (Component: ComponentType) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component />
  </Suspense>
);

const App = () => {
  const route = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        { index: true, element: <Navigate to={"/home"} /> },
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
        { path: "watchListPage", element: withSuspense(WatchListPage) },
        { path: "userPage", element: withSuspense(UserPage) },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={route} />
    </>
  );
};

export default App;
