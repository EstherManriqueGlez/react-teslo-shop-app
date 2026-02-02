import { RouterProvider } from "react-router";
import { AppRouter } from "./app.router";

export const TesloShopApp = () => {
  return (
    <RouterProvider router={AppRouter} />
  );
};
