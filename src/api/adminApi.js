import api from "./api";

export const loginAdmin = async (username, password) => {
  try {
    const { data } = await api.post("/login", { username, password });
    return data;
  } catch (error) {
    console.error("Admin Login Error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Server error! Please try again.",
    };
  }
};
