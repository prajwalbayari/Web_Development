const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "blog",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Comment", commentSchema);
