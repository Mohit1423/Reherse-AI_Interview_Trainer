# Reherse – AI Interview Trainer 🎤🧠

_Reherse_ is an intelligent web application that helps users practice and improve their job interview skills through AI-generated questions, speech-to-text analysis, webcam-based behavior analysis, and detailed performance feedback.

---

## 🚀 Features

- 🔐 **Authentication**: Secure SignUp and Login system
- 🎯 **Skill & Role-Based Practice**: Users can select their desired role and tech stack
- 🤖 **AI-Powered Question Generation**: Dynamic and relevant questions generated using GemenAI
- 🗣️ **Speech-to-Text**: Converts spoken responses to transcripts using AssemblyAI
- 🎥 **Video Recording**: Records and plays back user interviews
- 👁️ **Camera Analysis**: Uses MediaPipe to assess attention, facial expressions, and eye direction
- 📊 **Comprehensive Feedback**: Combines verbal and non-verbal metrics into a detailed report
- ☁️ **Cloud Uploads**: Stores interview videos securely on Cloudinary
- 📁 **Interview History**: Users can view and review their past interviews

---

## 🛠️ Tech Stack

| Layer        | Tech                                               |
|--------------|----------------------------------------------------|
| Frontend     | React.js, Tailwind CSS, DaisyUI                    |
| Backend      | Node.js, Express.js                                |
| Database     | MongoDB (with Mongoose)                            |
| AI Services  | Google Gemini                                      |
| Video        | Cloudinary (video hosting)                         |
| Analysis     | MediaPipe (Face Mesh, Attention)                   |

---


---

## 📦 Installation & Setup

1. **Clone the repo**
   
   -->git clone https://github.com/Mohit1423/Reherse-AI_Interview_Trainer

   -->cd Interview_Trainer
   -->Open two terminals

    Start the Backend Server

   -->cd to Backend
   -->Download the required modules using npm i 
   -->in the .env file you need to add the required 

                # PORT = 4000
                # MongoDB
                MONGO_URL=your_mongodb_connection_string

                # Google Gemini AI
                GOOGLE_API=your_google_gemini_api_key

                # Assembly AI
                ASSEMBLY_API=your_assembly_ai_key

                # Cloudinary
                CLOUD_NAME=your_cloudinary_name
                API_KEY=your_cloudinary_api_key
                API_SECRET=your_cloudinary_api_secret

   -->Run the command npm start 

    Start the Frontend Server

    -->cd to Frontend
    -->Download the required modules using npm i 
    -->Run the command npm run dev

   
   
