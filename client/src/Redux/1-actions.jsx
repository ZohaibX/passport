// import { UserToken } from "./actionTypes";
import axios from "axios";

// Setting search text in a state
// export const setUserToken = (token) => ({
//   // we wanna recieve text here
//   type: UserToken,
//   payload: token,
// });

// async action function
// export const requestRobots = async (dispatch) => {
//   dispatch({ type: REQUEST_ROBOTS_PENDING });
//   try {
//     const { data } = await axios.get(
//       "https://jsonplaceholder.typicode.com/users"
//     );
//     dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: REQUEST_ROBOTS_FAILED, payload: error });
//   }
// };

export const fetchUserAction = async (dispatch) => {
  dispatch({ type: "GET_USER_PENDING" });
  try {
    const { data } = await axios.get("/api/current_user");
    dispatch({ type: "GET_USER", payload: data });
  } catch (error) {
    dispatch({ type: "GET_USER_ERROR", payload: error });
  }
};
