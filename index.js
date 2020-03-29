let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let apiRoutes = require("./routes");
var cors = require('cors')
let app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

const uri = "mongodb+srv://user:password@server/database?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

var db = mongoose.connection;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

var port = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('Hello World with Express'));

app.use('/api', apiRoutes);
app.listen(port, function () {
    console.log("API open on port " + port);
});
