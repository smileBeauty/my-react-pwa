import { useRouteError } from "react-router-dom";

interface RouterError {
  data: string;
  error: {
    message: string;
    stack: string;
  };
  internal: boolean;
  status: number;
  statusText: string;
  message?: string;
}

const ErrorPage = () => {
  const error = useRouteError() as RouterError;
  console.error("ErrorPage error", error);

  return (
    <div id="error-page">
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{error?.data}</p>
      <p>{error?.status}</p>
      <p>{error.statusText ?? error.message ?? error?.error?.message}</p>
      <p>{error?.error?.stack}</p>
    </div>
  );
};

export default ErrorPage;
