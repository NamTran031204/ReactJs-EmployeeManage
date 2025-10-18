import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'antd/dist/reset.css';
import App from './App.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EmployeeListPage from "./pages/EmployeeListPage.tsx";
import EmployeeTablePage from "./pages/EmployeeTablePage.tsx";
import AddEmployeePage from "./pages/AddEmployeePage.tsx";
import MainPage from "./pages/MainPage.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
              path: '',
              element: <MainPage/>
            },
            {
                path: 'list',
                element: <EmployeeListPage/>
            },
            {
                path: 'list/edit/:id',
                element: <EmployeeListPage/>
            },
            {
                path: 'table',
                element: <EmployeeTablePage/>
            },
            {
                path: 'add',
                element: <AddEmployeePage/>
            }
        ]
    }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/*<App />*/}
      <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
