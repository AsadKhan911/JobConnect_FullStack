import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import ViewProfile from './components/ViewProfile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import EditJobForm from './components/admin/EditJobForm'
// import Jobs from './components/Jobs'

const appRouter = createBrowserRouter([
  {
    path : '/',
    element : <Home/>
  },
  {
    path : '/login',
    element : <Login/>
  },
  {
    path : '/signup',
    element : <Signup/>
   },
  {
    path : '/jobs',
    element : <Jobs/>
  },
  {
    path : '/job/description/:id',
    element : <JobDescription/>
  },
  {
    path : '/browse',
    element : <Browse/>
  },
  {
    path : '//viewProfile',
    element : <ViewProfile/>
  },
  //Admin or Recruiter paths
  {
    path : '/admin/companies',
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path : '/admin/companies/create',
    element: <CompanyCreate />
  },
  {
    path : '/admin/companies/:id',
    element: <CompanySetup />
  },
  {
    path : '/admin/jobs',
    element: <AdminJobs />
  },
  {
    path : '/admin/jobs/create',
    element: <PostJob />
  },
  {
    path : '/admin/jobs/:id/applicants',
    element: <Applicants />
  },
  {
    path : '/edit/job/:id',
    element: <EditJobForm />
  }
])



function App() {
 

  return (
    <>
     <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
