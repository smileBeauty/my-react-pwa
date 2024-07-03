import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/page/app";
import "normalize.css";

const rootDom = createRoot(document.querySelector("#root") as Element, {
  onRecoverableError: (error, errorInfo) => {
    console.log('error', error)
    console.log('errorInfo', errorInfo)
  },
});

rootDom.render(
  <StrictMode>
    <App />
  </StrictMode>
);

