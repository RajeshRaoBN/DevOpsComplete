// In src/index.js 
const express = require("express"); 
const bodyParser = require("body-parser");
const UserRouter = require("./routes/userRoutes");

const app = express(); 
const PORT = process.env.PORT || 3000; 

app.use(bodyParser.json());
app.use("/api/users", UserRouter);

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});