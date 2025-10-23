import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./context/AuthContext.jsx";
import PrivateRoutes from "./routes/privateRoutes.jsx";
import LoginForm from "./pages/login/index.jsx";
import Layout from "./component/Layaout/index.jsx";
import { lazy } from "react";

const VentasComponent = lazy(() => import('./pages/ventas'));
const UserPage = lazy(() => import('./pages/user'));
const DashboardPage = lazy(() => import('./pages/dashboard'));


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route element={<PrivateRoutes />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/ventas" element={<VentasComponent />} />
              <Route path="/usuarios" element={<UserPage />} />
              <Route path="/*" element={<h1>404 - Not Found</h1>} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
