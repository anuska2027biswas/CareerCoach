import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const generateMockInterview = async (resumeText) => {

  // Limit resume length to avoid token overflow
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


export { generateMockInterview };