# 🎮 AI Esports Training Companion

AI Esports Training Companion is a session-based web application that simulates a personal esports coaching experience powered by an AI character.

Instead of acting as a generic chatbot, the system provides structured coaching designed to improve player decision-making, gameplay habits, and mindset.

---

## 🚀 Overview

This application introduces **Captain Nova**, an original AI coach character designed to guide players through a repeatable training loop.

The system uses the **Gemini AI model** to analyze player reflections and generate structured coaching insights, including mistake analysis, decision correction, and actionable training drills.

The goal is to transform passive gameplay into **active, structured improvement**.

---

## 🧠 Core Concept

The application is built around a simple but powerful loop:

Onboarding → Match Reflection → AI Analysis → Training Drills → Repeat

Each step is designed to simulate how a real esports coach would guide a player.

---

## ⚙️ Features

### 🎯 Onboarding System
Users define their training context:
- Nickname  
- Game  
- Rank  
- Role  
- Mental State  
- Goals  

This data is used as context for AI analysis.

---

### 📝 Match Reflection
Players submit a reflection describing:
- What happened in the match  
- Decisions they made  
- Mistakes and outcomes  

This becomes the core input for the AI.

---

### 🤖 AI Coaching (Captain Nova)
Powered by **Gemini**, the AI generates structured feedback:

- Key Mistake  
- Root Cause  
- Correct Decision  

The AI follows a defined schema to ensure consistent and actionable output.

---

### 🏋️ Training Drills
Based on the analysis, the system generates:
- Targeted practice drills  
- Clear instructions  
- Focused improvement tasks  

---

### 🔁 Session-Based System
- No authentication required  
- No database  
- Data stored in local state / localStorage  
- Each session is independent  

---

### 🔄 New Session
- Reset all data  
- Start a fresh training cycle  
- Maintain a clean user experience  

---

## 🤖 AI Integration

AI is the **core engine** of the application.

- Model: **Gemini**
- Input:
  - Onboarding data (player context)
  - Match reflection
- Output:
  - Structured coaching insights
  - Training drills
  - Motivational feedback

The system uses a **controlled prompt + schema-based output**, ensuring:
- Consistency  
- Relevance  
- Actionable coaching  

---

## 🎭 Character Design — Captain Nova

Captain Nova is an original AI character designed for this project.

- Role: Esports Coach  
- Personality: Focused, direct, disciplined  
- Purpose: Provide consistent coaching identity  

This adds immersion and makes the experience feel like interacting with a real coach rather than a generic AI.

---

## 🧩 What Makes This Unique

- Not a chatbot — a **structured training system**
- AI is central, not decorative
- Enforced coaching framework (not free-form responses)
- Combines gameplay analysis + mindset coaching
- Character-driven AI experience (Captain Nova)

---

## 🛠 Tech Stack

- **Frontend**: Next.js (React)
- **Styling**: Tailwind CSS
- **AI**: Gemini API
- **State Management**: localStorage / client state

---

## 🌐 Live Demo

👉 [[Vercel URL]](https://ai-esports-training-companion.vercel.app/)

---

## 📦 Installation

```bash
git clone https://github.com/your-username/your-repo
cd your-repo
npm install
npm run dev
