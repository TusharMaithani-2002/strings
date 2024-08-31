import {Schema,model,models} from "mongoose";

const activitySchema = new Schema({
    post:{
        type:Schema.Types.ObjectId,
        ref:"Post",
    },
    performer:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiver:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    activity:{
        type:String,
        required:true
    }
});

const Activity = models.Activity || model("Activity",activitySchema);

export default Activity;