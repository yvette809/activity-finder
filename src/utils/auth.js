// utils/auth.js

import nookies from "nookies";

const TOKEN_NAME = "session"; // replace with your actual cookie name

export const setAuthToken = (token, ctx = null) => {
  nookies.set(ctx, TOKEN_NAME, token, { path: "/" });
};

export const getAuthToken = (ctx = null) => {
  const cookies = nookies.get(ctx);
  return cookies[TOKEN_NAME] || null;
};

export const removeAuthToken = (ctx = null) => {
  nookies.destroy(ctx, TOKEN_NAME, { path: "/" });
};
