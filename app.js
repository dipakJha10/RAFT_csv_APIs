const app = require('express')();
const bodyparser = require('body-parser');
const morgan = require('morgan')
app.use(morgan('dev'))
const endPoints=require("./routes/endPoints")

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.use('/api',endPoints);

app.get("/", (req, res) => {
    res.send("raft labs APIs  are up and running!!");
});

app.listen(3000, () => {
    console.log('App listening on port 3000');
});

module.exports=app;