import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { FormBuilderPage } from "./pages/FormBuilderPage";
import { FormFillerPage } from "./pages/FormFillerPage";
import { FormResponsePage } from "./pages/FormResponsePage";
import { HomePage } from "./pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/forms/new",
        element: <FormBuilderPage />,
      },
      {
        path: "forms/:id/fill",
        element: <FormFillerPage />,
      },
      {
        path: "forms/:id/response",
        element: <FormResponsePage />,
      },
    ],
  },
]);
