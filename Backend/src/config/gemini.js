import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// MOCK INTERVIEW GENERATION WITH AI //

const generateMockInterview = async (resumeText) => {

  
  const trimmedResume = resumeText.slice(0, 6000);

  const prompt = `
You are a senior software engineer conducting a realistic technical interview.

Analyze the following candidate resume and generate a mock interview.

RESUME:
${resumeText}

Create 4 interview rounds:

1. Technical Round
2. Project Round
3. Experience Round
4. HR Round

Requirements:

- Each round MUST contain exactly 5 questions
- Questions must be tailored to the candidate's skills, projects, and experience
- Avoid generic questions
- Questions should resemble real software engineering interviews
- Mix conceptual, practical, and scenario-based questions

Each question should include:

- question
- difficulty (easy | medium | hard)
- focus area (e.g., authentication, database design, system design, teamwork)

Return ONLY valid JSON in this format:

{
  "rounds": {
    "technical": [
      {
        "question": "",
        "difficulty": "",
        "focus": ""
      }
    ],
    "project": [],
    "experience": [],
    "hr": []
  }
}

Do not include explanations or markdown.
Return JSON only.
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: "You generate structured JSON responses only."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.4
  });

  const rawOutput = response.choices[0].message.content;

  // Extract JSON safely
  const jsonMatch = rawOutput.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error("Invalid AI response format");
  }

  const parsed = JSON.parse(jsonMatch[0]);

  return parsed;
};


// RESUME PARSING WITH AI //


const parseResumeWithAI = async (resumeText) => {

  const trimmedResume = resumeText.slice(0, 6000);

  const prompt = `
You are an AI Resume Parser.

Analyze the following resume and extract structured information.

RESUME:
${trimmedResume}

Return ONLY valid JSON in this format:

{
"name":"",
"email":"",
"phone":"",
"address":"",
"bio":"",
"linkedin":"",
"github":"",
"portfolio":"",
"skills":[],
"projects":[
  {
    "title":"",
    "description":"",
    "technologies":[]
  }
],
"experience":[
  {
    "company":"",
    "role":"",
    "duration":"",
    "description":""
  }
],
"education":[
  {
    "institution":"",
    "degree":"",
    "year":""
  }
],
"achievements":[]
}

Rules:
- Skills must be an array
- Projects must contain title, description and technologies
- If information is missing return null
- Do not include explanation
- Return JSON only
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: "You extract structured resume data in JSON."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.2
  });

  const rawOutput = response.choices[0].message.content;

  const jsonMatch = rawOutput.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error("Invalid AI response format");
  }

  const parsedData = JSON.parse(jsonMatch[0]);

  return parsedData;
};

export { parseResumeWithAI , generateMockInterview };
