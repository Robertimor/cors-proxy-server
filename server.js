const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

app.get("/geonames", async (req, res) => {
  const { city, lang } = req.query;
  const apiUrl = `http://api.geonames.org/searchJSON?q=${city}&lang=${lang}&maxRows=1&username=ТВОЙ_ЮЗЕРНЕЙМ`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при запросе к Geonames API" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));