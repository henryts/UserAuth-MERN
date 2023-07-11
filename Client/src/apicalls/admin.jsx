import { axiosUserInstance } from "./axiosInstance";

export const LoginAdmin = async (payload) => {
    try {
      const response = await axiosUserInstance.post("/api/admin/login", payload);
      return response.data;
    } catch (err) {
      return err.message;
    }
  };


  export const GetAllUsers = async () => {
    try {
      const response = await axiosUserInstance.get("/api/admin/get-users");
      return response.data;
    } catch (err) {
      return err.message;
    }
  };

  export const SaveEdit = async (payload) => {
    try {
      const response = await axiosUserInstance.post("/api/admin/edit-user",payload);
      return response.data;
    } catch (err) {
      return err.message;
    }
  };


  export const DeleteUser = async (payload) => {
    try {
      console.log(payload,'in');
      const response = await axiosUserInstance.delete(`/api/admin/delete-user/${payload}`);
      return response.data;
    } catch (err) {
      return err.message;
    }
  };


