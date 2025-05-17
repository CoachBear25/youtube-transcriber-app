import express from "express";
import cors from "cors";
import OpenAI from "openai";
import ytdlp from "yt-dlp-exec";
import fs from "fs";
import { exec } from "child_process";
import dotenv from "dotenv";

dotenv.config();
console.log("🟢 index.js started");
console.log("🔑 OpenAI Key Loaded:", process.env.OPENAI_API_KEY ? "✅ Present" : "❌ Missing");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Health check endpoint
app.get("/api/status", (req, res) => {
  res.json({ status: "🟢 Server is running" });
});

app.post("/api/transcribe", async (req, res) => {
  const { url } = req.body;
  console.log("📨 Request received for URL:", url);

  if (!url) return res.status(400).json({ error: "Missing YouTube URL" });

  try {
    const filename = `audio_${Date.now()}.mp3`;

    // Step 1: Download audio using yt-dlp
    console.log("📥 Step 1: Downloading audio...");
    await ytdlp(url, {
      extractAudio: true,
      audioFormat: "mp3",
      output: filename,
    });
    console.log("✅ Audio downloaded:", filename);

    // Step 2: Transcribe using Whisper CLI
    const whisperCmd = `whisper "${filename}" --model base --language en --output_format txt`;
    console.log("🗣️ Step 2: Transcribing with Whisper...");
    await runCommand(whisperCmd).catch((err) => {
      console.error("❌ Whisper command error:", err);
      throw new Error("Whisper CLI failed. Make sure it is installed and working.");
    });
    console.log("✅ Whisper transcription complete");

    const transcriptPath = filename.replace(".mp3", ".txt");
    const transcript = fs.readFileSync(transcriptPath, "utf-8");
    console.log("📄 Transcript length:", transcript.length);

    // Step 3: Summarize with GPT
    console.log("🧠 Step 3: Summarizing with GPT-4...");
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "Summarize this YouTube transcript clearly and concisely." },
        { role: "user", content: transcript },
      ],
    });

    const summary = completion.choices[0].message.content;
    console.log("✅ Summary complete");

    // Step 4: Cleanup
    console.log("🧹 Step 4: Cleaning up files...");
    if (fs.existsSync(filename)) fs.unlinkSync(filename);
    if (fs.existsSync(transcriptPath)) fs.unlinkSync(transcriptPath);
    console.log("🧼 Files cleaned up");

    // Step 5: Respond
    console.log("✅ Step 5: Sending response to frontend");
    res.json({ transcript, summary });

  } catch (err) {
    console.error("❌ Transcription Error:", err);
    res.status(500).json({ error: err.message || "Transcription failed" });
  }
});

function runCommand(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.error("🔴 Command error:", stderr);
        reject(stderr);
      } else {
        console.log("📤 Command output:", stdout);
        resolve(stdout);
      }
    });
  });
}

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server ready at http://localhost:${PORT}`));
