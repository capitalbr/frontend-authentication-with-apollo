import React from "react";
import { Route } from "react-router-dom";
import Register from "./register";
import CP from "./posts/CreatePost";
import PI from "./posts/PostIndex";

const App = () => (
  <div>
  
  <Route exact path="/" component={Register} />
  <Route exact path="/newpost" component={CP} />
  <Route exact path="/posts" component={PI} />
  </div>

)


export default App;
