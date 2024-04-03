import {Schema,model,models} from "mongoose";

const stringSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    parent:{
        type:Schema.Types.ObjectId,
        ref:'Post',
        required:true
    },
    content:{
        type:String,
        required:true
    },
    likesCount:{
        type:Number,
        default:0
    },
    repliesCount:{
        type:Number,
        default:0
    }
})

const Strings = models.String || model('String',stringSchema);
export default Strings;