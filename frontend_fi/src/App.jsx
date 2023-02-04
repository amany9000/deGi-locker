import { ConnectKitProvider, getDefaultClient } from "connectkit";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createClient, WagmiConfig } from "wagmi";
import { filecoinHyperspace } from "wagmi/chains";
import Navbar from "./components/Navbar/Navbar";
import "./index.css";
import Pages from "./pages";

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
        element: <Pages.Landing />,
      },
    ],
  },
  {
    path: "/",
    children: [
      {
        path: "/dashboard",
        element: <Pages.Dashboard />,
      },
    ],
  },
  {
    path: "/",
    children: [
      {
        path: "/files",
        element: <Pages.Files />,
      },
      {
        path: "/register",
        element: <Pages.RegisterPatient />,
      },
      {
        path: "/send",
        element: <Pages.Send />,
      },
      {
        path: "/upload",
        element: <Pages.Upload />,
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
