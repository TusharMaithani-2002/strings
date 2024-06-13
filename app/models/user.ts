import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  name: String,
  password: String,
  profileImage: String,
  coverImage: String,
  bio: String,
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  onBoarded: {
    type: Boolean,
    default: false,
  },
  likedPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],

  savedPosts: [
    {
      type:Schema.Types.ObjectId,
      ref:"Post"
    }
  ],

  posts: [
    {
      type:Schema.Types.ObjectId,
      ref:"Post"
    }
  ]
});

const User = models.User || model("User", UserSchema);

export default User;
