// App.js
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Demo from "./pages/Demo";
import LanguageIDE from "./pages/LanguageIDE";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/demo",
    element: <Demo />,
  },
  {
    path: "/demo/:language",
    element: <LanguageIDE />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);

function App() {
  return (
    <div className="h-screen light">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
