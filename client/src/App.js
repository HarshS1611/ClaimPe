import React from "react";
import { Switch, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import HealthForm from "./components/Form/Health/HealthForm";
import FormTabs from "./components/FormTabs/FormTabs";

const App = () => {
  return (
    <div>
      <div className="md:ml-64">
        <Sidebar />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/healthform" component={HealthForm} />
        <Route exact path="/motorform" component={FormTabs} />
      </div>
    </div>
  );
};

export default App;
