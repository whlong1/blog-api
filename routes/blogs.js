import { Router } from 'express'
import * as blogsCtrl from '../controllers/blogs.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========= Public Routes ========= 
router.get('/', blogsCtrl.index)
router.get('/:id', blogsCtrl.show)

// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.post('/', checkAuth, blogsCtrl.create)
router.put('/:id', checkAuth, blogsCtrl.update)
router.delete('/:id', checkAuth, blogsCtrl.delete)

router.post('/:id/comments', checkAuth, blogsCtrl.createComment)
router.put('/:blogId/comments/:commentId', checkAuth, blogsCtrl.updateComment)

export { router }