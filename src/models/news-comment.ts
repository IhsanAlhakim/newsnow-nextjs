import { InferSchemaType, model, models, Schema } from "mongoose";

const commentSchema = new Schema(
  {
    newsId: { type: Schema.Types.ObjectId, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

type Comment = InferSchemaType<typeof commentSchema>;

export default models.Comment || model<Comment>("Comment", commentSchema);
