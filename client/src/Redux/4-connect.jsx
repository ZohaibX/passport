import { connect } from "react-redux";

const { fetchUserAction } = require("./1-actions");

// here we will map the properties we want to be in props from reducers ..
export const mapStateToProps = (state) => ({
  // userToken: state.userToken.userToken,
  user: state.authReducer,
});

// dispatch means triggering an action
export const mapDispatchToProps = (dispatch) => {
  return {
    // setUserToken: (token) => {
    //   return dispatch(setUserToken(token)); // idk y but event.currentTarget.value is not working and just event is working
    // },
    // async dispatch function
    // onRequestRobots: () => requestRobots(dispatch),
    getUser: () => fetchUserAction(dispatch),
  };
  // setSearchField is an action which wants text .
  // and onSearchChange will occur when we will call it in an input .. so it will be having event.currentTarget.value
};

export const Connect = (App) =>
  connect(mapStateToProps, mapDispatchToProps)(App);
