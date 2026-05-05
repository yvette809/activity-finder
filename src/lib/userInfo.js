// authUtils.js (or any suitable name for your utility module)

import jwt from "jsonwebtoken";
import { getAuthToken } from "./auth";
import { removeAuthToken } from "./auth";

export const getUserInfoFromAuthToken = () => {
  const authToken = getAuthToken();

  if (!authToken) {
    return {};
  }

  try {
    const decodedToken = jwt.decode(authToken);
    return decodedToken?.userInfo || {};
  } catch (error) {
    console.error("Error verifying token:", error);
    return {};
  }
};
