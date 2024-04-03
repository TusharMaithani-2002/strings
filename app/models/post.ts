import {Schema,model,models} from "mongoose";


const postSchema = new Schema({
    image: String,
    likesCount: {
        type:Number,
        default:0
    },
    repliesCount:{
        type:Number,
        default:0
    },
    replies:[{
        type:Schema.Types.ObjectId,
        ref:'String'
    }],
    author:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    content:String,
    mentions:[
        {
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    tags:[{type:String}]
});

const Post = models.Post || model("Post",postSchema);

export default Post;