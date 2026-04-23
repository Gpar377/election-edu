# ElectionEdu: Democratic Intelligence Hub 🇮🇳

**Winner's Choice for PromptWars: Virtual - Election Process Education Vertical**

ElectionEdu is a hyper-advanced, AI-native portal designed to empower citizens with the knowledge and tools they need to participate in the world's largest democracy. By combining **Google Gemini 1.5 Flash** with real-time station intelligence, we bridge the information gap between the Election Commission and the common citizen.

## 🌟 Key Features

### 🧠 Gemini-Powered Knowledge Assistant
A smart, dynamic assistant that goes beyond FAQs. It uses Gemini 1.5 Flash to provide context-aware answers to complex legal and procedural questions. Whether you've lost your ID or just moved states, the assistant provides logical guidance tailored to your situation.

### 📍 Smart Polling Locator
A high-fidelity integration demonstrating the power of Google Maps. Users can find their nearest station, check live crowd intelligence (Optimal/Moderate), and get turn-by-turn navigation.

### 📊 Citizen Readiness Dashboard
An interactive scoring engine that assesses a voter's readiness based on registration status, ID availability, and procedural knowledge. It gamifies the civic responsibility of voting.

### 🗺️ Interactive Lifecycle Roadmap
A beautiful, animated timeline detailing every stage of the election from voter registration to the final result declaration.

## 🛠️ Technology Stack

- **Core**: React 19, Vite, TypeScript
- **Intelligence**: Google Gemini AI (@google/generative-ai)
- **Services**: Google Maps Platform (Mock Integration)
- **Styling**: Noir-Themed Vanilla CSS with Glassmorphism
- **Animations**: Framer Motion
- **Icons**: Lucide-React
- **Testing**: Vitest & React Testing Library

## 🏗️ Approach & Logic

Our approach centered on **"Intelligent Simplification"**. The election process is legally complex; our assistant simplifies it using:
1. **Decision Trees**: Routing users to the right information based on their inputs.
2. **Contextual Awareness**: Maintaining chat history to provide deep, relevant help.
3. **Inclusive Design**: Following WCAG guidelines for accessibility and clear hierarchy.

## 🚀 How to Run

1. **Clone & Install**:
   ```bash
   git clone <repo-url>
   cd election-assistant
   npm install
   ```

2. **Environment Setup**:
   Create a `.env` file in the root and add your Gemini API Key:
   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```
   *Note: If no key is provided, the app runs in **Demo Mode** with simulated responses.*

3. **Development Server**:
   ```bash
   npm run dev
   ```

4. **Run Tests**:
   ```bash
   npm run test
   ```

## 🔐 Security & Implementation
- **Responsible AI**: System prompts for Gemini are tuned to provide only authoritative, official election information.
- **Data Privacy**: No user PII is stored; all interactions are session-based.
- **Code Quality**: Modular component architecture with full TypeScript typing.

## 📝 Assumptions
- Users have basic internet connectivity.
- Official ECI portals remain the source of truth for final verification.
- "Demo Mode" stations are representative of the Kanchipuram district for demonstration purposes.

---

*Built for the [Hackathon Name] by [Your Name/Team Name].*
