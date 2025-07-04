import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
  adminPaths,
  adminRoutes,
  notAuthenticatedRoutes,
  userPaths,
  userRoutes,
} from "./helpers/routesAndPaths";
import UserPanel from "./pages/userPanel/UserPanel";
import AdminPanel from "./pages/adminPanel/AdminPanel";
import Tasks from "./pages/userPanel/Tasks";
import AdminTasks from "./pages/adminPanel/Tasks";
import Calendar from "./pages/userPanel/Calendar";
import Users from "./pages/adminPanel/Users";
import Dogs from "./pages/adminPanel/Dogs";
import Events from "./pages/adminPanel/Events";
import LoginForm from "./pages/forms/LoginForm";
import SignupForm from "./pages/forms/SignupForm";
import { useAuthContext } from "./hooks/useAuthContext";
import { useIsAdmin } from "./hooks/useIsAdmin";
import DogTasks from "./pages/adminPanel/DogTasks";
import EventTemplates from "./pages/adminPanel/EventTemplates";
import MyDogs from "./pages/userPanel/MyDogs";

const Router = () => {
  const { user } = useAuthContext();

  const isAdmin = useIsAdmin();
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("initial-location", JSON.stringify(location));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      {!!user && (
        <>
          <Route path={userPaths.root} element={<UserPanel />}>
            <Route index element={<Navigate to={userRoutes.tasks} />} />

            <Route path={userPaths.tasks} element={<Tasks />} />
            <Route path={userPaths.calendar} element={<Calendar />} />

            <Route path={userPaths.myDogs} element={<MyDogs />} />
          </Route>

          {isAdmin && (
            <Route path={adminPaths.root} element={<AdminPanel />}>
              <Route index element={<Navigate to={adminRoutes.tasks} />} />

              <Route path={adminPaths.tasks} element={<AdminTasks />} />
              <Route path={adminPaths.users} element={<Users />} />
              <Route path={adminPaths.dogTasks} element={<DogTasks />} />
              <Route path={adminPaths.dogs} element={<Dogs />} />
              <Route path={adminPaths.events} element={<Events />} />
              <Route
                path={adminPaths.eventTemplates}
                element={<EventTemplates />}
              />
            </Route>
          )}
        </>
      )}

      <Route index element={<Navigate to={userRoutes.tasks} />} />

      <Route path={"/login"} element={<LoginForm />} />
      <Route path={"/signup"} element={<SignupForm />} />

      <Route
        path="*"
        element={<Navigate to={notAuthenticatedRoutes.login} />}
      />
    </Routes>
  );
};

export default Router;
