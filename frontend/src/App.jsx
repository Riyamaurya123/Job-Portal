import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './component/auth/Login'
import Signup from './component/auth/Signup'
import Home from './component/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Job from './component/Job'
import Browse from './component/Browse'
import Profile from './component/Profile'
import JobDescription from './component/JobDescription'
import Companies from './admin/Companies'
import CompanyCreate from './admin/CompanyCreate'
import CompanySetUp from './admin/CompanySetUp'
import Jobs from './admin/Jobs'
import PostJob from './admin/PostJob'
import Applicants from './admin/Applicants'
import ProtectedRoute from './admin/ProtectedRoute'


const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/job',
    element:<Job/>
  },
  {
    path:'/description/:id',
    element:<JobDescription/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  //admin
{
  path:"/admin/companies",
  element:<ProtectedRoute><Companies/></ProtectedRoute>
},
{
  path:"/admin/companies/create",
  element:<ProtectedRoute><CompanyCreate/></ProtectedRoute>
},
{
  path:"/admin/companies/:id",
  element:<ProtectedRoute><CompanySetUp/></ProtectedRoute>
},
{
  path:"/admin/jobs",
  element:<ProtectedRoute><Jobs/></ProtectedRoute>
},
{
  path:"/admin/jobs/post",
  element:<ProtectedRoute><PostJob/></ProtectedRoute>
},
{
  path:"/admin/jobs/:id/applicants",
  element:<ProtectedRoute><Applicants/></ProtectedRoute>
}


])


const App = () => {
  return (
    <div>
    <ToastContainer/>
      <RouterProvider router={appRouter}/>
    </div> 
  )
}

export default App