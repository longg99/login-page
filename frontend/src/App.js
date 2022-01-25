import React from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Welcome from "./Components/Welcome";

function App() {
  const queryClient = new QueryClient();
  // check if user has been authenticated by check if there is access token
  const isAuth = localStorage.getItem("access_token") !== null;
  console.log("is auth?", isAuth);
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/"
          element={
            isAuth ? <Navigate to="/welcome" /> : <Navigate to="/login" />
          }
        />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/welcome"
          element={isAuth ? <Welcome /> : <Navigate to="/login" />}
        />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
