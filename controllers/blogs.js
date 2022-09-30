import { Profile } from "../models/profile.js"
import { Blog } from "../models/blog.js"

const create = async (req, res) => {
  try {
    req.body.author = req.user.profile
    const blog = await new Blog(req.body)
    await blog.save()
    await Profile.updateOne(
      { _id: req.user.profile },
      { $push: { blogs: blog } }
    )
    return res.status(201).json(blog)
  } catch (err) {
    return res.status(500).json(err)
  }
}

export {
  create,
}