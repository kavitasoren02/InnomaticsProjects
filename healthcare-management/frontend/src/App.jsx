import { Route, Routes } from 'react-router-dom'
import './App.css'
import FullScreenLayout from './layout/FullScreenLayout'
import LoginScreen from './pages/login/Login'
import NoAuthRoute from './ProtectedRoute/NoAuth'
import RegisterScreen from './pages/signup/Signup'
import HomeFullScreen from './layout/HomeFullScreen'
import Home from './pages/Home/Home'
import DoctorProfilePage from './pages/Profile/DoctorProfile'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import AuthProvider from './ProtectedRoute/AuthProvider'
import AdminLayout from './layout/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashpoard'
import DoctorProfile from './pages/admin/DoctorProfile'
import UserDashboard from './pages/admin/UserDashboard'
import UserProfile1 from './pages/Profile/UserProfile'
import UserProfile from './pages/admin/UserProfile'
import { Bounce, ToastContainer } from 'react-toastify'
import DoctorDashboard from './pages/doctors/DoctorDashboard'
import DoctorAppoinment from './pages/doctors/DoctorAppoinment'
import AppoinmentDashboard from './pages/admin/AppoinmentDashboard'
import AppoinmentDetails from './pages/admin/AppoinmentDetails'
import UserAppoinments from './pages/Home/UserAppoinments'

function App() {

  return (
    <>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
      />

      <Routes>
        <Route 
          path="/auth/login" 
          element={
            <NoAuthRoute>
              <FullScreenLayout>
                <LoginScreen />
              </FullScreenLayout>
            </NoAuthRoute>
          } 
        />
        <Route 
          path='/auth/signup'
          element={
            <NoAuthRoute>
              <FullScreenLayout>
                <RegisterScreen />
              </FullScreenLayout>
            </NoAuthRoute>
          }
        />

        <Route 
          path='/'
          element={
            <NoAuthRoute>
              <HomeFullScreen>
                <Home />
              </HomeFullScreen>
            </NoAuthRoute>
          }
        />

        <Route 
          path='/doctor-profile/:doctorId'
          element={
            <NoAuthRoute>
              <HomeFullScreen>
                <DoctorProfilePage />
              </HomeFullScreen>
            </NoAuthRoute>
          }
        />

        <Route 
          path='/appointments'
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <HomeFullScreen>
                <UserAppoinments />
              </HomeFullScreen>
            </ProtectedRoute>
          }
        />

        <Route 
          path='/profile'
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <HomeFullScreen>
                <UserProfile1 />
              </HomeFullScreen>
            </ProtectedRoute>
          }
        />

        <Route 
          path='/my-profile'
          element={
            <ProtectedRoute allowedRoles={['admin', 'doctor']}>
              <AdminLayout>
                <UserProfile1 />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route 
          path='/admin'
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route 
          path='/admin/doctor/:doctorId'
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <DoctorProfile />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route 
          path='/admin/user'
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <UserDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route 
          path='/admin/user/:userId'
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <UserProfile />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route 
          path='/admin/appoinment' 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <AppoinmentDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route 
          path='/admin/appoinment/:appoinmentId' 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <AppoinmentDetails />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route 
          path='/doctor'
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <AdminLayout>
                <DoctorDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route 
          path='/doctor/appoinment'
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <AdminLayout>
                <DoctorAppoinment />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  )
}

export default App
