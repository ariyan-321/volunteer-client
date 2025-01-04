import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut ,updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../firebse/firebase';
import axios from 'axios';



export const authContext=createContext();



export default function AuthProvider({children}) {
    

    const[user,setUser]=useState(null);
    const[loading,setLoading]=useState(true);
    const[authenticate,setAuthenticate]=useState(false);


    const provider=new GoogleAuthProvider();

    const createUserProfile=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    };

    const googleLogin=()=>{
        setLoading(true);
        return signInWithPopup(auth,provider);
    }

    const logOut=()=>{
        setLoading(true);
        return signOut(auth);
    }

    const userLogin=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    const updateUserProfile=(updatedData)=>{
        return updateProfile(auth.currentUser,updatedData);
    }

   
    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            if(currentUser?.email){
                const user={email:currentUser?.email};
                axios.post("https://assignment-11-new.vercel.app/jwt",user,{withCredentials:true})
                .then(res=> {
                    setLoading(false);
                });
                
            }
            else{
                axios.post("https://assignment-11-new.vercel.app/logout",{},{withCredentials:true})
                .then(res=> setLoading(false));
                
            }
            
        });

        return ()=>{
            unSubscribe();
        };
    },[]);


    const authInfo={
        user,
        loading,
        setUser,
        setLoading,
        createUserProfile,
        userLogin,
        googleLogin,
        logOut,
        updateUserProfile,
        authenticate
    }



  return (
    <authContext.Provider value={authInfo}>
        {children}
    </authContext.Provider>
  )
}
