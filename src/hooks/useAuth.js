import { useEffect, useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);

  // ================= CHECK LOGIN =================
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");

    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  // ================= LOGIN =================
  const login = (name, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (user) => user.name === name && user.password === password,
    );

    if (!foundUser) {
      throw new Error("Email atau password salah");
    }

    localStorage.setItem("currentUser", JSON.stringify(foundUser));

    setUser(foundUser);
  };

  // ================= REGISTER =================
  const register = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = users.find((user) => user.email === data.email);

    if (emailExists) {
      throw new Error("Email sudah digunakan");
    }

    users.push(data);

    localStorage.setItem("users", JSON.stringify(users));
  };

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.removeItem("currentUser");

    setUser(null);
  };

  return {
    user,
    login,
    register,
    logout,
  };
};

export default useAuth;
