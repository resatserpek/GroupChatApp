import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "./routes/CreateRoom/CreateRoom";
import Room from "./routes/Room/Room";
import Login from './routes/Login'
import Register from './routes/Register';

import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/room/:roomID" component={Room} />
          <Route path="/rooms" component={CreateRoom} />
          <Route path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    </AuthContextProvider>
    
  );
}

export default App;
