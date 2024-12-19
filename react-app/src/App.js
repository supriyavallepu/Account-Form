import React from "react";
import AccountForm from "./AccontForm";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";
import {BrowserRouter,Routes,Route} from "react-router-dom"
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route
        exact
        path="/"
        element={<AccountForm/>}/>
        <Route
        exact
        path="/LoginForm"
        element={<LoginForm/>}/>
        <Route
        exact
        path="/Dashboard"
        element={<Dashboard/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
