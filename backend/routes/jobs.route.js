import express from 'express'
const router = express.Router()
import { postJob, getAllJobs, getJobById, getAdminJobs, editJob } from '../controllers/job.controller.js'; 
import isAuthenticated from '../middlewares/isAuthenticated.js';

router.route('/post').post(isAuthenticated , postJob)
router.route('/get').get(isAuthenticated , getAllJobs)
router.route('/get/:id').get( getJobById)
router.route('/getadmin').get(isAuthenticated , getAdminJobs)
router.route('/update/:id').put(isAuthenticated , editJob)

export default router;