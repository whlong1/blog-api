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

const index = async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .populate('author')
      .sort({ createdAt: 'desc' })
    return res.status(200).json(blogs)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const show = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author')
      .populate('comments.author')
    return res.status(200).json(blog)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const update = async (req, res) => {
  try {
    return res.status(200).json(updatedBlog)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.blogs.remove({ _id: req.params.id })
    await profile.save()
    return res.status(204).end()
  } catch (err) {
    return res.status(500).json(err)
  }
}


export {
  create,
  index,
  show,
  update,
  deleteBlog as delete
}