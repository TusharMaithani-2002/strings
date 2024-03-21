import mongoose from "mongoose";

let isConnected = false;


export const connectToDB = async () => {

    mongoose.set('strictQuery',true) // to avoid warnings

    if(isConnected) {
        console.log('connected to DB');
        return;
    }

    try {
        mongoose.connect(process.env.MONGODB_URI as string,{
            dbName:'strings',
        })

        isConnected = true;
        console.log('connected to DB');
    }
    catch(error:any) {
        throw new Error("Error while connecting DB! message: "+error.message)
    }
}