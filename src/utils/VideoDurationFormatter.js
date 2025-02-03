import React from 'react'

export const VideoDurationFormatter = (timeStrings) => {
        // Convert timeString to a string in case it's not
        let timeString = String(timeStrings);
   // console.log(timeString.split("."));
    let duration = timeString.split(".");
 
    let hour,minutes,secound;

    if (duration.length === 2) {
          minutes  = timeString[0];
          secound  = timeString[1];
    }else{
          hour  = timeString[0];
          minutes  = timeString[1];
          secound  = timeString[2];
    }


   return hour > 0 ?   `${hour}hr ${minutes}min` : `${minutes}min ${secound}sec`
}
