import { AssemblyAI } from "assemblyai";

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLY_API,
});

export const getAudioAnalysis = async (cloudinary_url, questions) => {
  try{
  const audioFile = cloudinary_url;

  const params = {
    audio: audioFile,
    speech_model: "universal",
    disfluencies: true,
    sentiment_analysis: true,
    punctuate: true,
    format_text: true,
    redact_pii: false,
    filter_profanity: false
  };
  const transcript = await client.transcripts.transcribe(params);
  
  const results = [];
  
  for (const q of questions) {
      const segmentWords = transcript.words.filter(
        (w) => w.start >= q.micStartTime && w.end <= q.micStopTime
      );

      const fillerWords = ['so','um', 'uh', 'like', 'you know', 'I mean'];
      let fillerCount = 0;
      let longPauseCount = 0;
      let totalConfidence = 0;

      for (let i = 0; i < segmentWords.length; i++) {
        const word = segmentWords[i];
        const prev = segmentWords[i - 1];

        if (fillerWords.includes(word.text.toLowerCase().replace(/[.,!?]/g, ''))) {
          fillerCount++;
        }

        if (i > 0 && word.start - prev.end > 1600) {
          longPauseCount++;
        }

        totalConfidence += word.confidence || 0;
      }

      const avgConfidence = segmentWords.length
        ? totalConfidence / segmentWords.length
        : 0;

      const sentiments = transcript.sentiment_analysis_results.filter(
        (s) => s.start >= q.micStartTime && s.end <= q.micStopTime
      );

      const sentimentCounts = { POSITIVE: 0, NEUTRAL: 0, NEGATIVE: 0 };
      sentiments.forEach((s) => sentimentCounts[s.sentiment.toUpperCase()]++);

      const spokenText = segmentWords.map((w) => w.text).join(' ');

      results.push({
        
        question: q.question,
        response: spokenText,
        fillerCount,
        longPauseCount,
        avgConfidence: Number((avgConfidence * 100).toFixed(2)),
        sentimentCounts,
        
      });
    }

    return results;
  } catch (err) {
    console.error(err);
  }
  
};
