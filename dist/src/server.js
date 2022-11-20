import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();
var PORT = +process.env.PORT || 4000;
app.listen(PORT, function () {
    console.log("Server is up and listening on port ".concat(PORT, "."));
});
