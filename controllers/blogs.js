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
    res.status(201).json(blog)
  } catch (err) {
    res.status(500).json(err)
  }
}

const index = async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .populate('author', 'name blogs')
      .sort({ createdAt: 'desc' })
    res.status(200).json(blogs)
  } catch (err) {
    res.status(500).json(err)
  }
}

const show = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name blogs')
      .populate('comments.author')
    res.status(200).json(blog)
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
    res.status(200).json(blog)
  } catch (err) {
    res.status(500).json(err)
  }
}

// FIX
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.blogs.remove({ _id: req.params.id })
    await profile.save()
    res.status(200).json(blog)
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
    res.status(201).json(newComment)
  } catch (err) {
    res.status(500).json(err)
  }
}

const updateComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId)
    const comment = blog.comments.id(req.params.commentId)
    comment.text = req.body.text
    await blog.save()
    res.status(200).json(comment)
  } catch (err) {
    res.status(500).json(err)
  }
}


//FIX
const deleteComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId)
    blog.comments.remove({ _id: req.params.commentId })
    await blog.save()
    res.status(200).json(blog)
  } catch (err) {
    res.status(500).json(err)
  }
}

export {
  createComment,
  updateComment,
  deleteComment,

  create,
  index,
  show,
  update,
  deleteBlog as delete
}

