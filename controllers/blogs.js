import { Profile } from "../models/profile.js"
import { Blog } from "../models/blog.js"

const create = async (req, res) => {
  try {
    req.body.author = req.user.profile
    const blog = await Blog.create(req.body)
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
      .populate('author', 'name blogs')
      .sort({ createdAt: 'desc' })
    return res.status(200).json(blogs)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const show = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name blogs')
      .populate('comments.author')
    return res.status(200).json(blog)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const update = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    return res.status(200).json(blog)
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
    return res.status(200).send('OK')
  } catch (err) {
    return res.status(500).json(err)
  }
}

const updateComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId)
    const comment = blog.comments.id(req.params.commentId)
    comment.text = req.body.text
    await blog.save()
    return res.status(200).json(blog)
  } catch (err) {
    res.status(500).json(err)
  }
}

const createComment = async (req, res) => {
  try {
    req.body.author = req.user.profile
    const blog = await Blog.findById(req.params.id)
    blog.comments.push(req.body)
    await blog.save()
    const newComment = blog.comments[blog.comments.length - 1]
    return res.status(201).json(newComment)
  } catch (err) {
    res.status(500).json(err)
  }
}

export {
  createComment,

  create,
  index,
  show,
  update,
  deleteBlog as delete
}