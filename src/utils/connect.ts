import mongoose from "mongoose";
import config from 'config'
import logger from "./logger";

const connect = async () => {
    try{
        const uri = config.get<string>("mongoDB")
        await mongoose.connect(uri)
        logger.info("connected to mongoDB")
    }catch(e){
        logger.error("can't connect to mongoDB")
    }
}

export default connect