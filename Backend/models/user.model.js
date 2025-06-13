import mongoose from "mongoose";

const transcriptAnalysisSchema = new mongoose.Schema({
  question: String,
  response: String,
  fillerCount: Number,
  longPauseCount: Number,
  avgConfidence: Number,
  sentimentCounts: {
    POSITIVE: Number,
    NEUTRAL: Number,
    NEGATIVE: Number,
  },
  evaluation: {
    knowledge: Number,
    fluency: Number,
    relevance: Number,
    communicationClarity: Number,
    confidence: Number,
    feedback: String,
  }
}, { _id: false });

const cameraAnalysisSchema = new mongoose.Schema({
  attentionPercent: Number,
  totalDistraction: Number,
  totalFrames: Number,
}, { _id: false });

const interviewSchema = new mongoose.Schema({
  role: String,
  skill: String,
  cloudinary_url: String,
  cameraAnalysis: cameraAnalysisSchema,
  transcriptAnalysis: [transcriptAnalysisSchema]
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: {
    type: String,
    required: true,
  },
  interviews: [interviewSchema]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
