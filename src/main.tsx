import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./providers/theme.provider.tsx";
import { RouterProvider } from "react-router";
import { router } from "./routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='system' storageKey='parcel-dms-ui-theme'>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
