import { ConnectKitProvider, getDefaultClient } from "connectkit";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createClient, WagmiConfig } from "wagmi";
import { filecoinHyperspace } from "wagmi/chains";
import Navbar from "./components/Navbar/Navbar";
import "./index.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Landing from "./pages/landing/Landing";

const chains = [filecoinHyperspace];

const client = createClient(
  getDefaultClient({
    appName: "digi-locker",
    chains: chains,
  })
);

const router = createBrowserRouter([
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

const App = () => {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <section className="container mx-auto">
          <Navbar />
          <RouterProvider router={router} />
        </section>
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default App;
