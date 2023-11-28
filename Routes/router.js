const express = require('express')
const router = new express.Router()
const userController = require('../Controllers/userController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const projectController = require('../Controllers/projectController')
const multerConfig = require('../Middlewares/multerMiddleware')
// register
router.post('/user/register',userController.register)



// login


router.post('/user/login',userController.login)

// add project


router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProjects)

// user projects
router.get('/user/all-projects',jwtMiddleware,projectController.allUserProjects)


// get all projects
router.get('/projects/all',jwtMiddleware,projectController.getallProjects)
// get home projects

router.get('/projects/home-projects',projectController.getHomeprojects)


// edit project
router.put('/projects/edit/:id',jwtMiddleware,multerConfig.single("projectImage"),projectController.editProjectController)




// delete project

router.delete('/projects/remove/:id',jwtMiddleware,projectController.deleteProjectController)


// export router

// updateuser
router.put('/user/edit',jwtMiddleware,multerConfig.single("profileImage"),userController.editUser)
module.exports = router