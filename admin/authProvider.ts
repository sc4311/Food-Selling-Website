import "react-admin";
import { 
  AuthProvider, 
  HttpError
 } from "react-admin";

const apiUrl = 'http://localhost:3000';

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new HttpError("Unauthorized", 401, {
          message: "Invalid username or password",
        });
      }

      const user = await response.json();

      if (user.role !== 'admin') {
        return Promise.reject(
          new HttpError("Forbidden", 403, {
            message: "Access denied: Admins only",
          })
        );
      }
      
      localStorage.setItem("user", JSON.stringify(user));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  logout: () => {
    localStorage.removeItem("user");
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () =>
    localStorage.getItem("user") ? Promise.resolve() : Promise.reject(),
  getPermissions: () => Promise.resolve(undefined),
  getIdentity: () => {
    const persistedUser = localStorage.getItem("user");
    const user = persistedUser ? JSON.parse(persistedUser) : null;
    return Promise.resolve(user);
  },
};
