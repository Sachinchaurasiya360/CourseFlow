import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  return res.status(200).json({
    message: "Server is healthy",
    success: true,
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on PORT http://localhost:${PORT}`);
});
