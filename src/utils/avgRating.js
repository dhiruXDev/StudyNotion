
export default function GetAvgRating (ratingArray) {
        // console.log("rting arr",ratingArray , ratingArray.length)
           if ( ratingArray.length === 0) {
                //console.log("inside ", ratingArray.length)
                return 0;
           }
           console.log("outside ", ratingArray.length)
    const TotalreviewCount = ratingArray?.reduce((acc , curr)=>{
            acc = acc + curr.rating;
            return acc;
    },0);
    const multiplier = Math.pow(10,1);
    const avgRatingCount = Math.floor((TotalreviewCount / ratingArray?.length) * multiplier)/multiplier;
    return avgRatingCount;
}
    