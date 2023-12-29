const express = require('express');
const app = express();
app.use(express.json())
const cors = require('cors');
const { connection } = require('./db');
const { userRouter } = require('./Router/user.route');
const { questionRouter } = require('./Router/question.route');
const { openSourceRouter } = require('./Router/openSource.route');
app.use(cors());

app.use("/users",userRouter)
app.use("/question",questionRouter)
app.use("/open",openSourceRouter)



app.listen(8080,async()=>{
    await connection
    console.log("Port is Running at 8080")
})