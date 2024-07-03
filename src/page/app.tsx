import { RouterProvider, ScrollRestoration } from "react-router-dom";
import router from "@/router";
import { Suspense } from "react";

const App = () => {
  return (
    <div id="app">
      <h1>app</h1>
      <RouterProvider router={router} fallbackElement={<div>loading 123123123</div>} />
    </div>
  );
};

export default App;
