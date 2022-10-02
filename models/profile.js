import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, unique: true },
    name: String,
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
  },
  { timestamps: true, }
)

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }