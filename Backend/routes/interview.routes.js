import express from "express";
import { createQuestions,SaveInterview,generateTranscriptAnalysis,AnalyzeTranscripts } from "../controller/interview.controller.js";
import { SingleUpload } from "../middleware/multer.js";


const router = express.Router();
router.post('/getquestions',createQuestions);
router.post('/saveinterview',SingleUpload,SaveInterview);
router.post('/generatetranscript',generateTranscriptAnalysis);
router.post('/analyzeTranscript',AnalyzeTranscripts);
export default router;



