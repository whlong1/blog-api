import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema(
  {
    name: String,
    photo: String,
    email: { type: String, required: true, lowercase: true, unique: true },
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
  },
  { timestamps: true, }
)

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }