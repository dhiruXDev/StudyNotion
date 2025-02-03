import React, { useState } from 'react'
import { Pie } from 'react-chartjs-2';
import {Chart ,registerables}  from "chart.js"

Chart.register(...registerables);
export const Instructor_cart_details = ({courses}) => {
    const [currChart ,setCurrChart] = useState("students");
    console.log( "Courses " ,courses)
    //Function for generate random color 
    const getRandomColor = (numsColor)=>{
            const colors =[];
            for (let index = 0; index < numsColor; index++) {
                let rnadomcolor = `rgb(${Math.floor(Math.random() * 256)} , ${Math.floor(Math.random() *256 )}, ${Math.floor(Math.random() *256)})` ;
                colors.push(rnadomcolor);
            }
            return colors;
    }

    //Create data for chart displaying student info
     const chartDataForStudent = {
        labels : courses.map((course)=>course.courseName),
        datasets : [
            {
                data : courses.map((course)=>course.totalStudentEnrolled),
                backgroundColor : getRandomColor(courses.length)
            }
        ]
     }

    // create data for displaying Income Info
    const chartForIncome = {
        labels : courses.map((course)=>course.courseName),
        datasets : [
            {
                data : courses.map((course)=>course.totalAmountGenerated),
                backgroundColor : getRandomColor(courses.length)
            }
        ]
    }
    // Create options
    // const option = {
    //     responsive: true,
    //     maintainAspectRatio: false,
    // };
    const option = {
        responsive: true,
        maintainAspectRatio: false,
        
    };
    

  return (
    <div className=' flex flex-col gap-y-3'>
           <p className=' text-xl font-semibold text-richblack-100'>Visualisation</p>
            <div className='  flex gap-x-6    '> 
                 <button onClick={()=>setCurrChart("students")} className= {`${currChart === 'students' ? " text-yellow-50 bg-richblack-700 p-2 rounded-sm  " : " text-yellow-100"}  font-semibold text-sm `} >Students</button>
                 <button onClick={()=>setCurrChart("income")}  className= {`${currChart !== 'students' ? " text-yellow-50 bg-richblack-700 p-2 rounded-sm  " : " text-yellow-100"}  font-semibold text-sm`}>Income</button>
            </div> 

            <div className=' mt-2'>
                <Pie style={{ width: "300px", height: "300px" }}  
                    data = {currChart === "students" ? chartDataForStudent : chartForIncome }
                    options={option}
                 />
            </div> 

    </div>
  )
}
