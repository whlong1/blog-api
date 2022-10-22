import { Router } from 'express'
import * as blogsCtrl from '../controllers/blogs.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========= Public Routes ========= 
router.get('/', blogsCtrl.index)

// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.get('/:id', checkAuth, blogsCtrl.show)
router.post('/', checkAuth, blogsCtrl.create)
router.put('/:id', checkAuth, blogsCtrl.update)
router.delete('/:id', checkAuth, blogsCtrl.delete)

router.post('/:id/comments', checkAuth, blogsCtrl.createComment)
router.put('/:blogId/comments/:commentId', checkAuth, blogsCtrl.updateComment)
router.delete('/:blogId/comments/:commentId', checkAuth, blogsCtrl.deleteComment)

router.post('/:id/likes', checkAuth, blogsCtrl.addLike)
router.delete('/:id/likes', checkAuth, blogsCtrl.removeLike)

export { router }