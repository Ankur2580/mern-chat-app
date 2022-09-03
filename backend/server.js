const express = require("express");
const app = express();
const {chats} = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const {notFound , errorHandler} = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();

app.use(express.json());

app.get("/" , (req , res) => {
    res.send("API is running");
})

app.get("/api/chat" , (req,res) => {
    res.send(chats);
})

app.use("/api/user" , userRoutes);

app.use(notFound);
app.use(errorHandler)

app.get("/api/chat/:id" , (req,res) => {
    const single_chat = chats.find((c) => c._id === req.params.id);
    res.send(single_chat);
    // console.log(req.params.id);
})

 const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started at port ${PORT}`));