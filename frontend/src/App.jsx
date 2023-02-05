import { ConnectKitProvider, getDefaultClient } from "connectkit";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import { createClient, WagmiConfig } from "wagmi";
import { filecoinHyperspace } from "wagmi/chains";
import Navbar from "./components/Navbar/Navbar";
import "./index.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Landing from "./pages/landing/Landing";
import VerifierLanding from "./pages/verifierlanding/VerifierLanding";
import { resolvePrefixSubdomain } from "./utilities/subdomain";

const chains = [filecoinHyperspace];

const client = createClient(
  getDefaultClient({
    appName: "digi-locker",
    chains: chains,
  })
);

const subdomain = resolvePrefixSubdomain();
const pathname = window.location.pathname;

console.log("subdomain", subdomain);

const uploadRouter = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Landing />,
      },
    ],
  },
  {
    path: "/",
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/",
    children: [
      {
        path: "/verifier",
        element: <VerifierLanding />,
      },
    ],
  },
]);

const verifierRouter = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <VerifierLanding />,
      },
    ],
  },
]);

const router = subdomain === "verifier" ? verifierRouter : uploadRouter;

const App = () => {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <SnackbarProvider>
          <Navbar />
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default App;
