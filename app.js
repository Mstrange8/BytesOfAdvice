const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded(({extended: false})));
app.use(express.static(path.join(__dirname, 'public')));

const adminRoutes = require('./routes/admin');
const serviceRoutes = require('./routes/service');
const blogRoutes = require('./routes/blog');

app.use(adminRoutes);
app.use(serviceRoutes);
app.use(blogRoutes);

app.listen(3000);