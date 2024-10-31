import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Dashboard from '../Pages/Dashboard/Dashboard'
import Leads from '../Pages/Leads/Leads'
import Shipping from "../Pages/Shipping/Shipping";
import Agents from "../Pages/Agents/Agents";
import Task from "../Pages/Task/Task";
import Login from "../Pages/Login/Login";
const Routes = () => {
  const { token, userDetail, setToken, setUserDetail } = useAuth();






  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <Login />
    },




    // {
    //   path: "/other-login",
    //   element: <Login />
    // },

    // {
    //   path: "/forgot-password",
    //   element: <ForgotPassword />
    // },

    // {
    //   path: "/reset-password/:uid/:token",
    //   element: <ResetPassword />
    // },


  ];

  const routesForAuthenticatedOnly =
    [

      {
        path: "/",
        element: (
          <ProtectedRoute

            requiredRole={["admin",'agent']}
          >
            <Dashboard />
          </ProtectedRoute>
        ),
      },

      {
        path: "/leads",
        element: (
          <ProtectedRoute

            requiredRole={["admin",'agent']}
          >
            <Leads />
          </ProtectedRoute>
        ),
      },

      {
        path: "/shippings",
        element: (
          <ProtectedRoute

            requiredRole={["admin",'agent']}
          >
            <Shipping />
          </ProtectedRoute>
        ),
      },
      {
        path: "/agents",
        element: (
          <ProtectedRoute

            requiredRole={["admin"]}
          >
            <Agents />
          </ProtectedRoute>
        ),
      },

      {
        path: "/tasks",
        element: (
          <ProtectedRoute

            requiredRole={["admin",'agent']}
          >
            <Task />
          </ProtectedRoute>
        ),
      },
      // {
      //   path: "/leads",
      //     element: <Leads />
      // },
      // {
      //   path: "/shippings",
      //     element: <Shipping />
      // },
      // {
      //   path: "/agents",
      //     element: <Agents />
      // },
      // {
      //   path: "/tasks",
      //     element: <Task />
      // },






    ];


  const router = createBrowserRouter([
    // ...routesForPublic,
    // ...((!token ) ? routesForNotAuthenticatedOnly : []),
    ...((!token) ? routesForNotAuthenticatedOnly : []),
    ...((token) ? routesForAuthenticatedOnly : []),



  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage';
// import Dashboard from './pages/Dashboard';
// import PageNotFound from './pages/PageNotFound';
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   const isAuthenticated = true;  // Replace with actual authentication logic
//   const userPermission = 'admin'; // Replace with actual user permission logic

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute
//               isAuthenticated={isAuthenticated}
//               permission={userPermission}
//               requiredPermission="admin"
//             >
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route path="/login" element={<LoginPage />} />

//         {/* 404 Page Not Found */}
//         <Route path="*" element={<PageNotFound />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
