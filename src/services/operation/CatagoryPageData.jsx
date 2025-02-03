import React from 'react'
import toast from 'react-hot-toast'
import { apiConnector } from '../apiConnector';
import { catagories } from '../apis';

export const CatagoryPageData = async({categoryId}) => {
     // const toastId = toast.loading("Loading");
      let res=[];
      try {   
             const response = await apiConnector("POST" , catagories.CATAGORIESWISE_PAGE_DETAILS_API, {categoryId:categoryId});
            // console.log( "API REspONSE OF FETCHING CATEGORY PAGE DETAILS -- ",response);
             if (!response?.data?.success) {
                  throw new Error(response.data.message); 
             }
             res = response?.data?.data;
            // toast.success("Succesfully fetched Data of Category");
      } catch (error) {
         console.log( "ERROR DURING FETCHING THE CATAGORY_PAGE_DETAils" , error);
         toast.error(error.message);
         res = error.message;
      }
     // toast.dismiss(toastId);
      return res;
}
