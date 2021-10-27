import React, { useContext } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Logon from './screens/Logon';
import Score from './screens/Score';
import Home from './screens/Home';
import { TokenContext } from "./contexts/TokenContext";

function App() {
  const [state, setState] = useContext(TokenContext);
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Logon" component={Logon} />
          <Route exact path="/Score" component={Score} />
        </Switch>
    </Router>
  );
}

export default App;
