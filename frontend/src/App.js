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

// context to pass down the isAuth
export const AuthContext = React.createContext(null);

function App() {
  const queryClient = new QueryClient();
  // check if user has been authenticated by check if there is access token
  const [isAuth, setIsAuth] = React.useState(false);

  // delete the access token from the localStorage
  React.useEffect(() => {
    let timer1 = setTimeout(() => deleteTokens(), 10 * 60 * 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  const deleteTokens = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("decoded_access_token");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ setIsAuth }}>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/"
            element={
              isAuth ? <Navigate to="/welcome" /> : <Navigate to="/login" />
            }
          />
          <Route path="/sign-up-now" element={<SignUp />} />
          <Route
            path="/welcome"
            element={isAuth ? <Welcome /> : <Navigate to="/login" />}
          />
        </Routes>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
