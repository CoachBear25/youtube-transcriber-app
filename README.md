# 📼 YouTube Transcriber + GPT Summary App

**Turn any YouTube video into a clean, readable transcript and intelligent summary — powered by Whisper + GPT.**

---

## 🚀 Features

- 🎤 Upload or paste YouTube links to extract audio  
- 🔊 Whisper-based transcription (OpenAI)  
- ✍️ GPT-powered intelligent summaries  
- 🧾 Displays transcript and summary side-by-side  
- 🌈 Clean, minimal UI (React + Tailwind)  
- 🧱 Modular codebase: `client/` + `server/`  

---

## 🗂 Project Structure

```
youtube-transcriber-app/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Pages/views
│   │   ├── App.jsx         # Main app entry
│   │   └── main.jsx        # Vite bootstrap
│   └── index.html          # HTML template
├── server/                 # Express backend
│   ├── routes/             # API routes
│   ├── controllers/        # Route logic
│   ├── index.js            # API entry point
│   └── .env                # Environment config (not committed)
├── README.md               # This file
└── package.json            # Root-level config
```

---

## 📸 Screenshots

<img src="https://github.com/user-attachments/assets/b438cfd5-79b5-4ef6-bd82-6dc5d09cba56" width="100%" />


> 🔁 Replace URLs with your actual hosted images (e.g. from GitHub Issues or Imgur).

---

## ⚙️ Tech Stack

| Frontend     | Backend        | AI/ML         | Tools               |
|--------------|----------------|----------------|---------------------|
| React + Vite | Express (Node) | OpenAI Whisper | Tailwind CSS        |
| Axios        | yt-dlp         | GPT-4 / GPT-3.5 | Git / GitHub        |

---

## 🧪 Local Setup

### 1. Clone the repo:

```bash
git clone https://github.com/CoachBear25/youtube-transcriber-app.git
cd youtube-transcriber-app
```

### 2. Install dependencies:

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 3. Create `.env` in `/server`

```bash
OPENAI_API_KEY=your_openai_key_here
```

> ✅ `.env` is safely ignored by Git

### 4. Run it locally:

```bash
# Backend
cd server
npm run dev

# Frontend (new terminal)
cd client
npm run dev
```

Visit `http://localhost:5173` to use the app.

---

## 📡 API Reference

### `POST /transcribe`

**Description:** Transcribes and summarizes audio from a YouTube link.

**Payload:**
```json
{
  "url": "https://www.youtube.com/watch?v=..."
}
```

**Response:**
```json
{
  "transcript": "Full transcript text...",
  "summary": "GPT-generated summary..."
}
```

---

## 🧠 How It Works

1. **Frontend** sends a YouTube URL to the backend.
2. **Backend** downloads the audio via `yt-dlp`.
3. **Whisper** transcribes the audio.
4. **GPT** summarizes the transcript.
5. The result is returned to the frontend and shown to the user.

---

## 🐞 Known Issues

- ❌ Some YouTube videos may be blocked or restricted by region  
- 🐢 Whisper transcription may take time on longer videos  
- 💬 No live speaker diarization (yet)  
- 🧪 Only supports English at the moment (language toggle coming soon!)

---

## 📌 Roadmap

- 🗂 Multi-language support  
- 🧠 Segment-wise summary  
- 🎙 Live microphone transcription  
- 📥 Export summary to `.pdf` or `.md`

---

## 👨‍💻 Author

Built by [CoachBear25](https://github.com/CoachBear25) — lifting weights and lifting code. 🐻💪

---

## 📄 License

MIT — use, remix, and build on it!
