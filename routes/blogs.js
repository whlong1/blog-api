import { Router } from 'express'
import * as blogsCtrl from '../controllers/blogss.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========= Public Routes ========= 
router.get('/', blogsCtrl.index)

// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.post('/', checkAuth, blogsCtrl.create)

export { router }