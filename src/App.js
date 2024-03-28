import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/NavBar";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import RegistrationForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import Sidebar from "./components/sideBar";

function App() {
  return (
    <div className="flex">
      <BrowserRouter>
        <div className="flex flex-col w-full h-full">
          <Sidebar/>
        </div>
        <div className="flex-1">
          <Navbar />
          <Switch>
            <Route path="/registrationForm">
              <RegistrationForm/>
            </Route>
            <Route path="/loginForm">
              <LoginForm/>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>

   </div>
  );
}

export default App;
