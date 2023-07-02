import React from "react";
import { Switch, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";

const App = () => {
  return (
    <div>
      <div className="md:ml-64">
        <Sidebar />
        <Route exact path="/dashboard" component={Dashboard} />
      </div>
    </div>
  );
};

export default App;
