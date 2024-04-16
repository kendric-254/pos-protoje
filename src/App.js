import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import Sidebar from "./components/sideBar";
import SalesPage from "./components/sales";
import { AuthProvider } from "./components/AuthContext";
import LoginForm from "./components/loginForm";

function App() {
  return (
    <div className="flex flex-col">
    
      <BrowserRouter>
        <AuthProvider>
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
                <Route path="/loginForm">
                  <LoginForm/>
                </Route>
                <LoginForm/>
            </Switch>
          </div>
          </div>
          </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
