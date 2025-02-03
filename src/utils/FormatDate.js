 
export const FormatDate = (datestring) => {
   const option = {
   year : "numeric",
    month : "long",
    day :   "numeric",
   
}
  const date = new Date(datestring);
  const FormattedDate = date.toLocaleDateString("en-US" ,option)
   
  const Hour = date.getHours();
  const minutes = date.getMinutes();
 
  const period  = Hour <= 12 ? "AM" : "PM";
  const FormattedTime = `${Hour % 12} : ${minutes .toString().padStart(2 ,"0")} ${period}`;
   return `${FormattedDate} | ${FormattedTime}`;
}
