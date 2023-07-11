import { axiosUserInstance } from "./axiosInstance";

export const LoginUser = async (payload) => {
  try {
    const response = await axiosUserInstance.post("/api/login", payload);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const SignupUser=async(payload)=>{
    try{
        const response=await axiosUserInstance.post('/api/signup', payload);
        return response.data;
    }catch(err){
        return err.message;
    }
}

export const GetProfile=async(payload)=>{
    try{
        const response=await axiosUserInstance.post('/api/get-profile', payload);
        return response.data;
    }catch(err){
        return err.message;
    }
}

export const UpdateProfile=async(payload)=>{
    try{
        const response=await axiosUserInstance.post('/api/update-profile', payload);
        return response.data;
    }catch(err){
        return err.message;
    }
}

export const UploadProfilePic=async(payload)=>{
    try{
        const response=await axiosUserInstance.post('/api/upload-profile-pic', payload);
        return response.data;
    }catch(err){
        return err.message;
    }
}

export const GetuserInfo=async(payload)=>{
    try{
        const response=await axiosUserInstance.post('/api/get-user', payload);
        return response.data;
    }catch(err){
        return err.message;
    }
}


