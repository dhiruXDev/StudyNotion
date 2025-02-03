const mongoose = require("mongoose");
require("dotenv").config();

exports.connection = ()=>{
      mongoose.connect(process.env.DATABASE_URL  )
      .then(()=>{console.log("DB connection succesfully")})
      .catch((error)=>{
        console.error(error);
        console.log("Issue in DB connection");
        process.exit(1)
      })
}

//, {
//  useNewUrlParser: true,
//  useUnifiedTopology: false,  // Disable the unified topology
//  serverSelectionTimeoutMS: 50000,  // 50 seconds 
 // }