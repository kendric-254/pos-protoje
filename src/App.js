// import { BrowserRouter } from "react-router-dom";
// import Navbar from "./components/NavBar";
// import {BrowserRouter as Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
// import RegistrationForm from "./components/registerForm";
// import LoginForm from "./components/loginForm";
// import Sidebar from "./components/sideBar";
// import Home from "./components/Home";

// function App() {
//   return (
//     <div className="flex">
//       <BrowserRouter>
//           <div className="flex h-screen">
//           <Sidebar />
          
//           </div>
//         <div className="ml-0">
//           <Switch>
//               <Route exact path="/Home">
//                 <Navbar/>
//               <Home />
//             </Route>
//           </Switch>
//         </div>
      

//         <div className="">
//           <Switch>
//             <Route path="/registrationForm">
//               <RegistrationForm/>
//             </Route>
//             <Route path="/loginForm">
//               <LoginForm/>
//             </Route>
//           </Switch>
//         </div>
//       </BrowserRouter>

//    </div>
//   );
// }

// export default App;
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import RegistrationForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import Sidebar from "./components/sideBar";
import SalesPage from "./components/sales";

function App() {
  return (
    <div className="flex flex-col">
      <BrowserRouter>
        <div className="flex ">
          <Sidebar />
          <div className="ml-0 lg:ml-60 w-screen ">
            <Navbar />
            <Switch>
              <Route exact path="/dashboard">
                <Home />
              </Route>
              <Route path="/sales">
                <SalesPage/>
              </Route>
              <Route path="/registrationForm">
                <RegistrationForm />
              </Route>
              <Route path="/loginForm">
                <LoginForm />
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
