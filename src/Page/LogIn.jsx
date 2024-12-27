import React from 'react'
import { Template } from '../Components/core/auth/Template'
import logIn from "../assets/image/login.webp"
export const LogIn = () => {
  return (
           <Template 
                   heading={"Welcome Back"}
                   Description ={"Build skills for today, tomorrow, and beyond."}
                   hilightText = {"Education to future-proof your career."}
                   formType={"SignIn"}
                   imagePath={logIn}
           />
  )
}
