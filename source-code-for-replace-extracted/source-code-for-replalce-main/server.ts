import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // Initialize Gemini Client Lazily/Carefully
  let aiClient: GoogleGenAI | null = null;
  function getAiClient() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("API Key chưa được thiết lập. Vui lòng cấu hình GEMINI_API_KEY ở bảng điều khiển Settings > Secrets.");
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return aiClient;
  }

  // --- API ROUTE 1: AI Mentor Chat ---
  app.post("/api/mentor/chat", async (req, res) => {
    try {
      const { message, history, userRole } = req.body;
      const ai = getAiClient();

      const systemInstruction = 
        `Bạn là AI Study Mentor của SmartLMS Hub, chuyên giảng dạy về .NET Core, C#, SQL Server, Kiến trúc phần mềm (Clean Architecture, Microservices, CQRS, DDD) và phân tán.` +
        `Bạn đang trao đổi học thuật với một học viên giữ vai trò: "${userRole || 'Student'}".` +
        `Hãy giải thích cặn kẽ, đưa ra các ví dụ mã nguồn C# chất lượng cao bằng Markdown (thụt lề, syntax highlighting \`\`\`csharp).` +
        `Phong thái chuyên nghiệp, nhiệt huyết, thấu hiểu và súc tích. Tránh tào lao hoặc nói dài dòng không cần thiết.`;

      // Construct a single consolidated prompt with context
      const contextPrompt = 
        `Lịch sử trò chuyện gần đây:\n` +
        (history || []).map((h: any) => `${h.role === 'user' ? 'Học viên' : 'AI Mentor'}: ${h.text}`).join('\n') +
        `\n\nHọc viên hỏi: ${message}\n\nAI Mentor giải đáp:`;

      const aiResponse = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contextPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ reply: aiResponse.text });
    } catch (error: any) {
      console.error("Chat error:", error);
      res.status(500).json({ error: error.message || "Lỗi xử lý yêu cầu AI." });
    }
  });

  // --- API ROUTE 2: AI C# Quiz Generator ---
  app.post("/api/mentor/quiz", async (req, res) => {
    try {
      const { topic, userRole } = req.body;
      const ai = getAiClient();

      const systemInstruction = 
        `Bạn là hệ thống thi cử thông minh của SmartLMS Hub.` +
        `Hãy tạo một bộ gồm 3 câu hỏi trắc nghiệm khách quan đa lựa chọn về chủ đề "${topic || 'C#'}" dành cho đối tượng "${userRole || 'Student'}".` +
        `Mỗi câu hỏi phải thực tế, mang tính thử thách cao về kỹ năng lập trình .NET/C# thực dụng.` +
        `BẮT BUỘC phản hồi theo cấu trúc JSON định dạng schema yêu cầu.`;

      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          questions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: { 
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                correctAnswerIndex: { type: Type.INTEGER },
                explanation: { type: Type.STRING }
              },
              required: ["question", "options", "correctAnswerIndex", "explanation"]
            }
          }
        },
        required: ["questions"]
      };

      const aiResponse = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Hãy tạo 3 câu hỏi trắc nghiệm chất lượng cao về chủ đề: ${topic}.`,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema,
          temperature: 0.8,
        }
      });

      const parsedData = JSON.parse(aiResponse.text || "{}");
      res.json(parsedData);
    } catch (error: any) {
      console.error("Quiz error:", error);
      res.status(500).json({ error: error.message || "Lỗi tạo câu hỏi trắc nghiệm." });
    }
  });

  // --- API ROUTE 3: Code Explainer ---
  app.post("/api/mentor/explain", async (req, res) => {
    try {
      const { code, level } = req.body;
      const ai = getAiClient();

      let targetInstruction = "";
      if (level === "expert") {
        targetInstruction = 
          `Hãy đóng vai một Kỹ sư trưởng .NET kỳ cựu (Principal .NET Architect). Phân tích mã nguồn này cực kỳ chuyên sâu.` +
          `Bố cục câu trả lời thành 3 phần rõ ràng:\n` +
          `1. Tổng quan cơ thế chạy thực tế của đoạn mã.\n` +
          `2. Hành vi luồng bộ nhớ (RAM Allocation), CPU threads, I/O bottleneck hoặc tối ưu hóa GC (Garbage Collection).\n` +
          `3. Các giải pháp refactoring thực nghiệm giúp tăng hiệu suất tối đa (ví dụ Span<T>, ArrayPool, ValueTask, Parallel...).`;
      } else {
        targetInstruction = 
          `Hãy đóng vai một giảng viên dạy C# thân thiện. Giải thích đoạn mã này đơn giản hóa đến mức học viên năm nhất cũng hiểu được.` +
          `Bổ nhỏ từng bước tuần tự chạy thế nào, ý nghĩa từng dòng lệnh và một mẹo thực hành để viết dễ hơn. Tránh dùng từ chuyên ngành quá phức tạp.`;
      }

      const aiResponse = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Hãy giải nghĩa đoạn mã nguồn sau đây:\n\n\`\`\`csharp\n${code}\n\`\`\``,
        config: {
          systemInstruction: targetInstruction,
          temperature: 0.6,
        }
      });

      res.json({ explanation: aiResponse.text });
    } catch (error: any) {
      console.error("Explain error:", error);
      res.status(500).json({ error: error.message || "Lỗi giải nghĩa mã nguồn." });
    }
  });

  // Vite static/development integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SmartLMS Hub server running on port ${PORT}`);
  });
}

startServer();
