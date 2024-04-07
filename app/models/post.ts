
import {Schema,model,models} from "mongoose";

const postSchema = new Schema({
    images: [{ type: String }],
    likesCount: {
        type: Number,
        default: 0
    },
    repliesCount: {
        type: Number,
        default: 0
    },
    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'String'
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: String,
    mentions: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },
    tags: [{ type: String }],
},{timestamps:true});


const Post = models.Post || model("Post",postSchema);

export default Post;