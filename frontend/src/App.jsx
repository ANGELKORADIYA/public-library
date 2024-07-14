// src/App.jsx
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import "./app.css";

import { post } from "./Rest";
import Navbar from "./navbar/Navbar";
import Lander from "./login/Lander";
import Sidebar from "./gencomp/Sidebar";
import AboutUs from "./gencomp/AboutUs";
import ContantUs from "./gencomp/ContactUs";
import Footer from "./gencomp/Footer";
import HomePage from "./gencomp/HomePage";
const App = () => {
  const [isSidebarActive, setIsSidebarActive] = useState(false); // Sidebar
  const [cookie, setCookie] = useState(document.cookie);
  const [isAuthenticated, setIsAuthenticated] = useState(!!cookie);
  const [role, setRole] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await post("email");
      if (res == false) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(!!cookie);
        setRole(res.role);
      }
    })();
  }, [cookie]);
  return (
    <Router>
      <ToastContainer />

      <Navbar
        setIsSidebarActive={setIsSidebarActive}
        isSidebarActive={isSidebarActive}
        isAuthenticated={isAuthenticated}
        role={role}
      />
      <Sidebar
        setIsSidebarActive={setIsSidebarActive}
        isSidebarActive={isSidebarActive}
      />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <>
                <Lander type={null} changecookie={setCookie} />
              </>
            )
          }
        />

        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <>
                <Lander type={"signIn"} changecookie={setCookie} />
              </>
            )
          }
        />

   
        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <>
                <Lander type={"signUp"} changecookie={setCookie} />
              </>
            )
          }
        />

        <Route
          path="/contactus"
          element={
            <>
              <ContantUs />

              <Footer />
            </>
          }
        />
        <Route
          path="/aboutus"
          element={
            <>
              <AboutUs />

              <Footer />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <>
              <HomePage  role={role}/>
              {/* <RandomPosts isSidebarActive={isSidebarActive} /> */}</>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/createreport"
          element={
            isAuthenticated ? (
              <>
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/yourreports"
          element={
            isAuthenticated ? (
              <>
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/PoliceCrimeReports"
          element={
            isAuthenticated ? (
              <>
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<>Not Found</>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
