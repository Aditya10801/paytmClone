require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const mongoose = require("mongoose");
const mongoUri = process.env.DB;
if (!mongoUri) {
  throw new Error("Missing DB connection string in .env");
}
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const rootRouter = require("./routes/index");

app.use("/api/v1", rootRouter);

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, ()=>{
      console.log(`Server is running on port ${PORT}`);
  });
}

