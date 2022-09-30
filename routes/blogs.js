import { Router } from 'express'
import * as blogsCtrl from '../controllers/blogss.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========= Public Routes ========= 


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
```jsx
import { Profile } from "../models/profile.js"
import { Blog } from "../models/blog.js"

export { }
```

export { router }