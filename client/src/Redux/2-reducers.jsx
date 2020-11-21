// it takes the action and spits out the state
import { UserToken } from "./actionTypes";

// const initialStateSearch = {
//   userToken: "",
// };

// we cannot change our state . so we will have to recreate it with some changes we need
// export const userToken = (state = initialStateSearch, action = {}) => {
//   if (action.type === UserToken) {
//     console.log(action.payload);
//     return { ...state, userToken: action.payload };
//   } else return state; // reducers must be returning something
// };

export const authReducer = (state = null, action) => {
  if (action.type === "GET_USER") return action.payload;
  else return state;
};

// const initialStateRobots = {
//   isPending: false,
//   robots: [],
//   error: "",
// };
// // async reducer function
// export const requestRobots = (state = initialStateRobots, action = {}) => {
//   if (action.type === REQUEST_ROBOTS_PENDING) {
//     return { ...state, isPending: true };
//   } else if (action.type === REQUEST_ROBOTS_SUCCESS) {
//     return { ...state, robots: action.payload, isPending: false };
//   } else if (action.type === REQUEST_ROBOTS_FAILED) {
//     return { ...state, error: action.payload, isPending: false };
//   } else return state;
// };
