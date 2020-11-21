import { Connect } from "./Redux/4-connect";
import React from "react";

function App(props) {
  React.useEffect(() => {
    props.getUser();
  }, []);

  //! whenever we go to the main page -- redux will run and get current user from fb or google and will get their data

  React.useEffect(() => {
    console.log(props.user);
  }, [props.user]);

  return (
    <div className="App">
      Passport App
      <br />
      <a href="/auth/google"> Sign In By Google </a>
      <br />
      <a href="/auth/facebook"> Sign In By Facebook </a>
      <br />
      <a href="/api/logout">Logout </a>
      {/* First 2 are frontend routes */}
      <br />
      {props.user && <h2>{props.user.username}</h2>}
      {props.user && <img src={props.user.picture}></img>}
    </div>
  );
}

export default Connect(App);
