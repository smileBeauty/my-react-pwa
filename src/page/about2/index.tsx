import { Link, useLoaderData, Outlet } from "react-router-dom";
import { Suspense } from "react";

const About2 = () => {
  const initData = useLoaderData();
  console.log("initData", initData);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <h2>about2</h2>
        <Outlet />
        <div>
          <Link to="/">back home</Link>
        </div>
        <div>
          <Link to="/about2/children1">turn to about2 children1</Link>
        </div>
      </div>
    </Suspense>
  );
};

export default About2;
