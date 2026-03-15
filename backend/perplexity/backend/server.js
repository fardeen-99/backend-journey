import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/config/database.js";
import modelresponser from "./src/services/ai.service.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();
modelresponser()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});