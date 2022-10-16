import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema(
  {
    name: String,
    photo: String,
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
  },
  { timestamps: true, }
)

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }