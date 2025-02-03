import React, { useEffect, useRef, useState } from 'react'
import { FaChevronLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { IconBtn } from '../../Common/IconBtn';
import { FiUpload } from "react-icons/fi";
import inputFile from "../../../App.css"
import { updateProfileImg } from "../../../services/operation/settingApi"
import { EditProfile } from './setting/EditProfile';
import { PasswordChange } from './setting/PasswordChange';
import { useNavigate } from 'react-router-dom';
import { DeleteAccount } from './setting/DeleteAccount';
 
export const Setting = () => {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loadings, setLoadings] = useState(false);
    const [previewsourceImg, setPreviewsourceImg] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const fileInputRef = useRef(null);
    
    const handleClick = () => {
        fileInputRef.current.click()
    }

    const submitHandler =  () => {
        if (!navigator.onLine) {
            alert("No internet connection. Please try again later.");
            return;
          }
          setLoadings(true);  
        try {
                    {
                        loadings && alert("loading is true")
                    }
                    const formData = new FormData();    // Creating the FormData object that contain key-value pair
                    formData.append('ProfileImg', imgFile);      // formData now containing the displaypicture:imgfile 
                    dispatch(updateProfileImg(token, formData));
                    setLoadings(false)  // api calling cons
                     
 
        } catch (error) {
            console.log("Error whyle upploading profile image .. ", error.message);
            setLoadings(false);  
        }
    }
 
    const changeHandler = (event) => {
        console.log( "files .. " ,event.target.files[0]);
        const file = event.target.files[0];
        if (file) {
            setImgFile(file);
            setPreviewsourceImg(file);
            // console.log("imgFile.. ", imgFile);
        }
    }

    /*  
> previewFile is a function to read a file and convert it into a Data URL (a format that can be easily used to display images or other file types in a web page).
> FileReader reads the file asynchronously.
> reader.result contains the Data URL of the file after it is read.
> setPreviewSource updates the React component's state with the Data URL, allowing you to show a preview of the file on the UI. */

    const previewFile = (file) => {
        const render = new FileReader();     // Here creating a file reader
        render.readAsDataURL(file);           // Here reading the file asynchronously and converting into DataURL 
        render.onloadend = () => {               //The onloadend event is triggered when the reading operation is completed, either successfully or with an error 
            // console.log("render file result.. ", render.result)   // THe arrow function called when succesfully read the file
            setPreviewsourceImg(render.result);
        }
    }

    useEffect(() => {
        // console.log("2 " , loadings)
        if (imgFile) {
            previewFile(imgFile)
            // console.log("in useeffect " , imgFile)
        }
    }, [imgFile])

    return (
        <div className=' flex flex-col w-[100vw]  gap-3  px-2 md:px-[2rem] py-[1rem]  pb-14 justify-center font-inter'>
            <div className=' flex flex-col gap-y-4  '>
                <div className=' flex flex-row items-center gap-x-1 text-lg   group   text-richblack-400'>
                    <FaChevronLeft className=' cursor-pointer font-[200] text-sm' />
                    <span className=' cursor-pointer'  onClick={()=>{navigate("/dashboard/my-profile")}} >Back</span>
                </div>
                <h1 className=' text-richblack-5 text-[30px]   pt-2 leading-[22px] font-medium'>Edit Profile</h1>
            </div>

            <div className=' w-full md:w-[80%]  m-auto flex flex-col gap-y-3 h-auto mt-[2rem]'>
                {/* Section 1 */}
                <div className='lg:w-[60%] bg-richblack-800 py-6 px-3 flex  gap-6 items-center border-[1.6px] border-richblack-700 rounded-lg'>
                    <img src={ previewsourceImg || user?.image   } className=' w-[70px] aspect-square rounded-full  object-cover' />

                    <div className=' flex flex-col gap-y-3'>
                        <div>
                            <h1 className=' text-[17px] leading-[22px] text-richblack-25 font-inter font-medium'>Change Profile picture</h1>
                        </div>
                        <div className=' flex gap-2 relative'>
                            <label className=' cursor-pointer bg-richblack-700 border-[1.5px] border-richblack-600 px-6 py-2  rounded-lg  text-[17px]  leading-[24px] '>
                                <span disabled={loadings}>Select</span>

                                <input
                                    ref={fileInputRef}
                                    type='file'
                                    onChange={changeHandler}
                                    accept='image/png, image/jpeg, image/gif'
                                    className='relative    hidden ' />
                            </label>

                            <IconBtn 
                                   disabled={loadings}
                                   loadings={loadings}
                                   text={ loadings ? 'uploading...' : 'Upload'} 
                                   type={"submit"}
                                   onClick={submitHandler} 
                                   children={  !loadings && <FiUpload />} />
                        </div>
                    </div>

                </div>

                {/* Section 2 */}
   
                 <EditProfile  />
               

                {/* Section 3  */}
                 <PasswordChange />

                 {/* Section 4  */}
                 <DeleteAccount />
            </div>

        </div>
    )
}
