export const APP_INFO = {
  name: "Standard Demo",
  version: "0.1.1",
  since: "2020",
  description: "Siam smile",
  contactUrl: "https://www.siamsmile.co.th",
};

export const API_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "https://localhost:6001/api/" //dev
    : "https://localhost:6001/api/"; // Production

export const ROLES = {
  user: "user",
  Manager: "Manager",
  admin: "Admin",
  developer: "Developer",
};
