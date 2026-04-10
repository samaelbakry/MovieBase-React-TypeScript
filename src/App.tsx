import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import AllMovies from "./pages/AllMovies";

const App = () => {
  const route = createBrowserRouter([
    { path: "", element: <MainLayout />, 
		children: [{index:true, element: <Navigate to={"/home"} />},
			{path:"home" , element:<Home/>},
			{path:"movies" , element:<AllMovies/>},
			{path:"movieDetails/:id" , element:<MovieDetails/>}
		] },
  ]);

  return (
    <>
      <RouterProvider router={route} />
    </>
  );
};

export default App;
