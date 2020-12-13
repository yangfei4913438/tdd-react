import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TodoList from "./containers/TodoList/TodoList";
import NotFound from "./containers/NotFound/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/"} exact component={TodoList} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
