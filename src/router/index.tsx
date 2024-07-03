import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
const Home = lazy(() => import("@/page/home"));
const ErrorPage = lazy(() => import("@/page/error-page"));
const About = lazy(() => import("@/page/about"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>loading</div>}>
        <Home />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: (
      <Suspense fallback={<div>loading</div>}>
        <About />
      </Suspense>
    ),
  },
  {
    path: "/about2",
    async lazy() {
      const About2 = await import("@/page/about2");
      return { Component: About2.default, element: (<div>about2 loading</div>) };
    },
    // element: (<div>about2 loading</div>),
    loader: (_aaa) => {
      console.log("_aaa", _aaa);
      return new Promise((resolve) => {
        const res = fetch("/static/loader.json", {
          signal: _aaa.request.signal,
        });
        setTimeout(() => {
          resolve(res);
        }, 10000)
      });
    },
    children: [
      {
        path: "/about2/children1",
        element: (
          <div>about2 children1</div>
        ),
        index: true,
      },
      {
        path: "/about2/children2",
        element: (
          <div>about2 children2</div>
        ),
      }
    ]
  },
]);

export default router;
