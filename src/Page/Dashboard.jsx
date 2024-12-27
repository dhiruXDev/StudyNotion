
// Dashboard.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import spinner from "../Components/Common/spinner.css";
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Components/core/Dashboard/Sidebar';

export const Dashboard = () => {
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authnLoading } = useSelector((state) => state.auth);

  if (profileLoading || authnLoading) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="flex w-screen min-h-screen text-white font-inter overflow-auto relative ">
      <Sidebar />
      <div className="flex-1 overflow-y-auto overflow-x-hidden ">
        <Outlet />
      </div>
    </div>
  );
};




// import React from 'react'
// import { useSelector } from 'react-redux'
// import spinner from "../Components/Common/spinner.css"
// import { Outlet } from 'react-router-dom';
// import { Sidebar } from '../Components/core/Dashboard/Sidebar';
// import { ConfirmationModal } from '../Components/Common/ConfirmationModal';
// export const Dashboard = () => {
//      const{loading : profileLoading} = useSelector((state)=>state.profile); //loading is fetching and nomenclature is profileLoading . naam bdla jaa raha hai loading ko ProfileLoading se
//      const{loading : authnLoading} = useSelector((state)=>state.auth);

//      if(profileLoading || authnLoading) {
//         return <div className='spinner'> </div>
//      }

//   return (
//     <div className='  flex min-w-[100vw] relative  min-h-[calc(100vh-3.8rem)] text-white  font-inter   ' > 
//                  <Sidebar />
//                <div className=' min-h-[clac(100vh - 3.5rem)] overflow-x-hidden  '>
//                        <Outlet />
//                </div>
//     </div>
//   )
// }

