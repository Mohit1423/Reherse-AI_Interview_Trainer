import create_content from "../utils/gemini.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { getAudioAnalysis } from "../utils/AssemblyAPI.js";

export const createQuestions = async (req, res) => {
  try {
    const { role, skill } = req.body;

    const prompt = `
            You are an AI interview assistant. I’m preparing for an interview for the role of a ${role}, and I want to be interviewed based on the skill of ${skill}.
            

            Generate exactly 6 interview questions formatted as a **raw JSON array of objects only**. 

            - The first question must be a standard introduction like: "Tell me about yourself".
            - The next 4 questions should focus on the selected skill and the chosen role.
            - The final question should be a wrap-up or reflective one (e.g., “Why should we hire you?”, “Do you have any questions for us?”).
            - Ensure that the questions are not too hard to answer and are relevant to the role and skill.
            - Make the questions sound human-like and engaging.
            
            ⚠️ Important:
            - Respond with **only a raw JSON array of objects**, like:

            [
                {"Question 1"},
                {"Question 2"},
                {"Question 3"},
                {"Question 4"},
                {"Question 5"},
                {"Question 6"}
            ]
                        `;

    const response = await create_content(prompt);
    res.status(200).json({
      message: "Success",
      data: response,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const SaveInterview = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded." });
    }

    const fileUri = getDataUri(file);

    const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
      folder: "Ai_Interview/userInterviews",
      resource_type: "video",
      timeout: 300000,
    });

    res.status(200).json({
      message: "Success",
      data: cloudResponse.secure_url,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const generateTranscriptAnalysis = async (req, res) => {
  try {
    const { cloudinary_url, questions } = req.body;

    if (cloudinary_url === undefined || questions === undefined) {
      return res.status(400).json({
        message: "No cloudinary url or questions provided",
        success: false,
      });
    }
    const response = await getAudioAnalysis(cloudinary_url, questions);
    res.status(200).json({
      message: "Success",
      data: response,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const AnalyzeTranscripts = async (req, res) => {
  try {
    const audioAnalysis = req.body;

    if (!audioAnalysis) {
      return res.status(400).json({
        message: "No audio analysis provided",
        success: false,
      });
    }
    const enrichedAnalysis = await Promise.all(
      audioAnalysis.map(async (entry) => {
        const { question, response } = entry;

        const prompt = `
            You are a virtual interview evaluator.

            Evaluate the following answer to the interview question:

            Question: ${question}

            Candidate Response: ${response}

            Return an object with:
            - knowledge (score out of 10)
            - fluency (score out of 10)
            - relevance (score out of 10)
            - communicationClarity (score out of 10)
            - confidence (score out of 10)
            - feedback (natural-language, concise)

            Respond only with a valid JSON object.
                `;

        let aiResponse = await create_content(prompt);
        const extractJson = (text) => {
          try {
            const firstBrace = text.indexOf("{");
            const lastBrace = text.lastIndexOf("}");
            if (firstBrace === -1 || lastBrace === -1)
              throw new Error("No JSON braces found");

            const jsonString = text.substring(firstBrace, lastBrace + 1);
            return JSON.parse(jsonString);
          } catch (err) {
            console.error(
              "JSON parse error:",
              err.message,
              "\nOriginal response:",
              text
            );
            return null;
          }
        };

        const result = extractJson(aiResponse);
        if (!result) {
          throw new Error("Invalid AI response format");
        }

        return {
          ...entry,
          evaluation: result,
        };
      })
    );
    res.status(200).json({
      message: "Success",
      data: enrichedAnalysis,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
