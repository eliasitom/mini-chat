import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthRoute } from './routes/auth-route/AuthRoute.jsx'
import { DataProvider } from './context/DataContext.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/auth",
    element: <AuthRoute />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <DataProvider>
    <RouterProvider router={router} />
  </DataProvider>
);
