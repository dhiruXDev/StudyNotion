import { Route, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
import Home from "./Page/Home";
import { Navbar } from "./Components/Common/Navbar";
import { SignUp } from "./Page/SignUp";
import { LogIn } from "./Page/LogIn";
import { ForgotPassword } from "./Page/ForgotPassword";
import { UpdatePassword } from "./Page/UpdatePassword";
import { VerifyEmail } from "./Page/VerifyEmail";
import { ProfileDropDown } from "./Components/core/auth/ProfileDropDown";
import { ResetComplitedPage } from "./Page/ResetComplitedPage";
import { AboutPage } from "./Page/AboutPage";
import { ContactUsPage } from "./Page/ContactUsPage";
import { MyProfile } from "./Components/core/Dashboard/MyProfile";
import { ErrorPage } from "./Page/ErrorPage";
import { Dashboard } from "./Page/Dashboard";
import {PrivateRoute} from "./Components/core/auth/PrivateRoute"
import { Setting } from "./Components/core/Dashboard/Setting";
import { EnrolledCourses } from "./Components/core/Dashboard/EnrolledCourses";
import { Cart } from "./Components/core/Dashboard/Cart";
import {  PurchaseHistory } from "./Components/core/Dashboard/PurchaseHistory";
import { useSelector } from "react-redux";
import { AddCourse } from "./Components/core/Dashboard/AddCourse";
import { MyCourses } from "./Components/core/Dashboard/MyCourses";
import { EditCourses } from "./Components/core/Dashboard/EditCourse";
import { CatalogPage } from "./Page/CatalogPage";
import { CourseDetails } from "./Page/CourseDetails";
import { ViewCourse } from "./Page/ViewCourse";
import { ACCOUNT_TYPE } from "./utils/constants";
import { VideoDetails } from "./Components/core/ViewCourse/VideoDetails";
import { Instructor_Details } from "./Components/core/Dashboard/Instructor-Course-Details/Instructor_Details";
import "./Components/Common/spinner.css"
import { AskQComponent } from "./Page/AskQComponent";

function App() {
 
const {user} = useSelector((state)=>state.profile);

  return (
     <div className=" relative w-screen min-h-screen bg-richblack-900 ">
         <Navbar />
         <AskQComponent />
         <Routes> 
              <Route path="/" element={<Home />} />
              <Route path="/signUp" element ={<SignUp />} />
              <Route path="/logIn" element ={<LogIn />} />
              <Route path="/forgot-password" element={   <ForgotPassword /> } />
              <Route path="/update-password/:id" element={ <UpdatePassword /> }/>
              <Route path="/verify-email" element={ <VerifyEmail /> } />
               
              <Route path="/reset-complition-page" element={<ResetComplitedPage />} />
              <Route path="/about" element={ <AboutPage /> } />
              <Route path="/contact" element ={<ContactUsPage />} />
              <Route path="/catalog/:CatalogName" element ={<CatalogPage />} />
              <Route path="/Courses/:courseId" element ={<CourseDetails />} />

              {/* Only for logedIn user  , Private Route means koi bhi ese hi nhi access kr skta hai es route ko  , usko phle logIn hona padega */}
             <Route element={ <PrivateRoute >
                                    <Dashboard />
                             </PrivateRoute>}
                           >    
                              <Route path="dashboard/my-profile"   element={< MyProfile />} />
                              <Route path="dashboard/setting"   element={<Setting  />} /> 

                              {  // Only for Student
                                  user?.accountType === "Student" && (
                                               <>
                                                    <Route path="dashboard/enrolled-course"   element={<EnrolledCourses  />} /> 
                                                    <Route path="dashboard/cart"   element={<Cart  />} /> 
                                                    <Route path="dashboard/purchase-history" element={ <PurchaseHistory />} />
                                               </>
                                  )
                              }

                              {/* Only for Instructor */}
                             {
                                user?.accountType ==="Instructor" && 
                                              <>
                                                <Route path="dashboard/add-course"   element={<AddCourse />} /> 
                                                <Route path="dashboard/my-course"   element={<MyCourses />} /> 
                                                <Route path="/dashboard/edit-course/:courseId" element={<EditCourses />} />
                                                <Route path="dashboard/instructor" element={<Instructor_Details/>} />
                                              </>
                             }
             </Route>

             <Route element ={ <PrivateRoute>
                                    <ViewCourse  />
                              </PrivateRoute>}>
                              {
                                  user?.accountType === ACCOUNT_TYPE.STUDENT && (
                                       <>
                                       
                                          <Route  path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId"  element = { <VideoDetails />} />
                                       </>
                                        )
                              }
             </Route>
              <Route path="*" element={ <ErrorPage />} />       
         </Routes>
     </div>
  );
}

export default App;
