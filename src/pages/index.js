// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

// export default function Home() {
//   return (
//     <main>
//       <h1>Udeen</h1>
//     </main>
//   );
// }

// index.js
import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// import Navbar from "@/components/navbar/index.js";
// import Footer from "@/components/footer/index.js";
// import Sidebar from "@/components/sidebar/index.js";
// import Upload from "@/pages/upload/index.js";
// import Home from "@/pages/dashboard/index.js";

import Navbar from "../components/navbar/navbar.js";
import Footer from "../components/footer/footer.js";
import Sidebar from "../components/sidebar/sidebar.js";
import Uploader from "../pages/upload/index.js";
import Dashboard from "../pages/dashboard/index.js";

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
                <Sidebar />
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
            element: < Dashboard/>,
          },
          {
            path: "/upload",
            element: <Uploader />,
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

