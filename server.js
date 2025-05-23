import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Загружаем переменные из .env
console.log("API_KEY загружен:", process.env.VITE_API_KEY);

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/getApiKey", (req, res) => {
  res.json({ apiKey: process.env.VITE_API_KEY });
});

app.get("/getUnsplashApiKey", (req, res) => {
  res.json({ apiKey: process.env.VITE_UNSPLASH_KEY });
});

app.get("/geonames", async (req, res) => {
  const { city, lang } = req.query;
  const username = "robertimor"; // Используется как API-ключ в Geonames

  if (!city || !lang) {
    return res
      .status(400)
      .json({ error: "Missing required parameters: city or lang" });
  }

  const apiUrl = `http://api.geonames.org/searchJSON?q=${city}&lang=${lang}&maxRows=1&username=${username}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data); // Отправляем ответ с Geonames
  } catch (error) {
    console.error("Ошибка при запросе к Geonames API:", error);
    res.status(500).json({ error: "Ошибка при запросе к Geonames API" });
  }
});



app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
