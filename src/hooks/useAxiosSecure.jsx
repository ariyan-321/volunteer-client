import axios from "axios";
import { useContext, useEffect } from "react";
import { authContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";


const axiosInstance=axios.create({
    baseURL:"https://assignment-11-new.vercel.app",
    withCredentials:true
})

const useAxiosSecure=()=>{

    const navigate=useNavigate();
    const{logOut}=useContext(authContext);

    useEffect(()=>{
        axiosInstance.interceptors.response.use(response=>{
            return response
        },error=>{
            console.log("error caught in inteceptor")

            if(error.status==401 || error.status==403){
                console.log("need to logout")
                logOut()
                .then(()=>{
                    console.log("logout successful");
                    navigate("/logIn");
                })
                .catch(err=>{
                    console.log(err)
                })
            }

            return Promise.reject(error)
        })
    },[])

    return axiosInstance;
}

export default useAxiosSecure;