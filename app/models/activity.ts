import {Schema,model,models} from "mongoose";

const activitySchema = new Schema({
    post:{
        type:Schema.Types.ObjectId,
        ref:"Post",
        required:true
    },
    performer:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
});

const Activity = models.Activity || model("Activity",activitySchema);

export default Activity;