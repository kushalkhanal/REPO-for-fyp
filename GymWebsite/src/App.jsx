import React, { useState, useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Lazy loading components
const Sidebar = lazy(() => import("./components/admin/sidebar/Sidebar"));
const Member = lazy(() => import("./components/admin/member/Member"));
const Events = lazy(() => import("./components/admin/calendar/Events"));
const Trainer = lazy(() => import("./components/admin/Trainer/Trainer"));
const Transaction = lazy(() =>
  import("./components/admin/transaction/Transaction")
);
const LandingPage = lazy(() => import("./components/website/LandingPage"));
const Main = lazy(() => import("./components/admin/main/Main.jsx"));
const Signin = lazy(() => import("./components/website/Signin"));
const GymEvent = lazy(() => import("./components/website/GymEvent"));
const UserInfoCard = lazy(() => import("./components/website/UserInfoCard"));
const Unauthorized = lazy(() => import("./components/website/Unauthorized"));
const Report = lazy(() => import("./components/admin/report/Report"));

const AdminLayout = ({ children }) => (
  <div className="flex h-screen bg-white dark:bg-zinc-100">
    <section className="w-[10%] sm:w-[15%]">
      <Sidebar />
    </section>
    <section className="flex flex-col w-[90%] sm:w-[85%] overflow-auto">
      {children}
    </section>
  </div>
);

const ProtectedRoute = ({ isLoggedIn, roles, allowedRoles, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }
  if (allowedRoles && !allowedRoles.some((role) => roles.includes(role))) {
    return <Unauthorized />;
  }
  return children;
};

function App() {
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRoles = localStorage.getItem("roles");

    if (token && userRoles) {
      setIsLoggedIn(true);
      setRoles(JSON.parse(userRoles));
    }

    setLoading(false);
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/gymevent" element={<GymEvent />} />
            <Route path="/settings" element={<UserInfoCard />} />
            <Route
              path="*"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  roles={roles}
                  allowedRoles={["ADMIN"]}
                >
                  <AdminLayout>
                    <Routes>
                      <Route path="/dashboard" element={<Main />} />
                      <Route path="/members" element={<Member />} />
                      <Route path="/transactions" element={<Transaction />} />
                      <Route path="/trainers" element={<Trainer />} />
                      <Route path="/events" element={<Events />} />
                      <Route path="/analytics" element={<Report />} />
                    </Routes>
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
