import express from 'express';
import { getUserList, signInUser, signUpUser } from '../controller/auth.controller.js';

const router = express();

router.route('/signup').post(signUpUser);
router.route('/signin').post(signInUser);
router.route('/getUserList').get(getUserList);

export default router;
