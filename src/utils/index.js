
export const getUser = () => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("userData");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem("userData");
    return null;
  }
};

export const isUserLoggedIn = () => {
  const user = getUser();
  if (!user && typeof window !== "undefined") {
    window.location.replace("/auth/login");
  }
  return user;
};

export const handleLogout = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("userData");
  window.location.replace("/auth/login");
};