import express from "express";
import { SignUp,Login,addInterview} from "../controller/user.controller.js";


const router = express.Router();

router.post('/SignUp',SignUp);
router.post('/Login',Login);
router.post("/addInterview",addInterview);

export default router;
