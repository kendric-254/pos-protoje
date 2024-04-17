import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import Sidebar from "./components/sideBar";
import SalesPage from "./components/sales";
import { AuthProvider, useAuth } from "./components/AuthContext";
import LoginForm from "./components/loginForm";
import RegistrationForm from "./components/registerForm";

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="flex flex-col">
      <BrowserRouter>
        <div className="flex">
          <Sidebar />
          <div className="ml-0 lg:ml-60 w-screen">
            <Navbar />
            <Switch>
              <Route exact path="/loginForm">
                <LoginForm />
              </Route>
              <Route path="/registerForm">
                <RegistrationForm/>
              </Route>
              {isLoggedIn ? (
                <>
                  <Route exact path="/dashboard">
                    <Home />
                  </Route>
                  <Route path="/sales">
                    <SalesPage />
                  {/* </Route>
                  <Route exact path="/loginForm">
                <LoginForm /> */}
              </Route>

                </>
              ) : (
                <Route path="/">
                  <LoginForm />
                  </Route>
              )}
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;


// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Navbar from "./components/NavBar";
// import Home from "./components/Home";
// import Sidebar from "./components/sideBar";
// import SalesPage from "./components/sales";
// import { AuthProvider, useAuth } from "./components/AuthContext";
// import LoginForm from "./components/loginForm";

// function App() {
//   return (
//     <AuthProvider>
//       <div className="flex flex-col">
//         <BrowserRouter>
//           <div className="flex">
//             <Sidebar />
//             <div className="ml-0 lg:ml-60 w-screen">
//               <Navbar />
//               <Switch>
//                 <Route exact path="/loginForm">
//                   <LoginForm />
//                 </Route>
//                 <ProtectedRoutes />
//               </Switch>
//             </div>
//           </div>
//         </BrowserRouter>
//       </div>
//     </AuthProvider>
//   );
// }

// // Create a separate component for protected routes
// function ProtectedRoutes() {
//   const { isLoggedIn } = useAuth();

//   return (
//     <>
//       {isLoggedIn ? (
//         <>
//           <Route exact path="/dashboard">
//             <Home />
//           </Route>
//           <Route path="/sales">
//             <SalesPage />
//           </Route>
//         </>
//       ) : (
//         <Route path="/loginForm">
//           <LoginForm />
//         </Route>
//       )}
//     </>
//   );
// }

// export default App;


