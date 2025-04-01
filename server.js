import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Загружаем переменные из .env
console.log("API_KEY загружен:", process.env.VITE_API_KEY);

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.VITE_API_KEY; // Берём API-ключ из .env
const UNSPLASH_KEY = process.env.VITE_UNSPLASH_KEY

console.log(UNSPLASH_KEY);

app.get("/getApiKey", (req, res) => {
  res.json({ apiKey: process.env.VITE_API_KEY });
});

// app.get("/geonames", async (req, res) => {
//   res.json({ apiKey: process.env.VITE_UNSPLASH_KEY })
// })

app.get("/geonames", async (req, res) => {
  const { city, lang } = req.query;
  const username = "robertimor"; // Используется как API-ключ в Geonames

  if (!city || !lang) {
    return res.status(400).json({ error: "Missing required parameters: city or lang" });
  }

  const apiUrl = `http://api.geonames.org/searchJSON?q=${city}&lang=${lang}&maxRows=1&username=${username}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Ошибка запроса к Geonames");

    const data = await response.json();
    res.json(data); // Отправляем ответ с Geonames
  } catch (error) {
    console.error("Ошибка при запросе к Geonames API:", error);
    res.status(500).json({ error: "Ошибка при запросе к Geonames API" });
  }
});

// app.get("/geonames", async (req, res) => {
//   // const { city, lang } = req.query;
//   const city = "London"
//   const lang = "ru"
  
//   if (!city || !lang) {
//     return res.status(400).json({ error: "Missing required parameters: city or lang" });
//   }

//   const apiUrl = `http://api.geonames.org/searchJSON?q=${city}&lang=${lang}&maxRows=1&username=${UNSPLASH_KEY}`;

//   try {
//     const response = await fetch(apiUrl);
//     if (!response.ok) throw new Error("Failed to fetch data from Geonames");

//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error("Ошибка при запросе к Geonames API:", error);
//     res.status(500).json({ error: "Ошибка при запросе к Geonames API" });
//   }
// });

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));

