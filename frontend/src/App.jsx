import { ConnectKitProvider, getDefaultClient } from "connectkit";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
        {subdomain !== "verifier" && <Navbar />}
        <RouterProvider router={router} />
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default App;
