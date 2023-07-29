// index.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const trenRoutes = require('./routes/trenRoutes');

app.use(bodyParser.json());

app.use(trenRoutes);

app.get("/", (req,res)=>{
        res.send("hello world")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
