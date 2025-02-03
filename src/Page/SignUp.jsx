import React from 'react'
import { Template } from '../Components/core/auth/Template'
import signup from "../assets/image/signup.webp"
export const SignUp = () => {
  return (
     <Template 
            heading={"Join the millions learning to code with StudyNotion for free"}
            Description ={"Build skills for today, tomorrow, and beyond."}
            hilightText = {"Education to future-proof your career."}
            formType={"SignUp"}
            imagePath={signup}
     />
  )
}
