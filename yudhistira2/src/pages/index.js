// index.js
import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import Menu from "@/components/menu/menu";
import Upload from "@/pages/upload/upload";
import Home from "@/pages/homepage/homepage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const [router, setRouter] = useState(null);

  useEffect(() => {
    const routerInstance = createBrowserRouter([
      {
        path: "/",
        element: (
          <div className="main">
            <Navbar />
            <div className="container">
              <div className="menuContainer">
                <Menu />
              </div>
              <div className="contentContainer">
                <QueryClientProvider client={queryClient}>
                  <Outlet />
                </QueryClientProvider>
              </div>
            </div>
            <Footer />
          </div>
        ),
        children: [
          {
            path: "/home",
            element: <Home />,
          },
          {
            path: "/upload",
            element: <Upload />,
          },
        ],
      },
    ]);
    setRouter(routerInstance);

    return () => {
      // Cleanup function if necessary
    };
  }, []);

  if (!router) {
    return null; // or any loading indicator
  }

  return <RouterProvider router={router} />;
}

export default App;
