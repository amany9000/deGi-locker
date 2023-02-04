import { ConnectKitProvider, getDefaultClient } from "connectkit";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createClient, useAccount, WagmiConfig } from "wagmi";
import { filecoinHyperspace } from "wagmi/chains";
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
  const { address } = useAccount();
  console.log("address", address);

  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <section className="container mx-auto">
          <RouterProvider router={router} />
        </section>
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default App;
