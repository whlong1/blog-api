import mongoose from 'mongoose'

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }
  },
  { timestamps: true }
)

const blogSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  comments: [commentSchema],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }
}, {
  timestamps: true,
})

const Blog = mongoose.model('Blog', blogSchema)

export { Blog }
