const express = require("express");
const path = require('path');
const app = express();

var publicDir = path.join(__dirname, 'public');
app.use("/public/", express.static(publicDir));

/*
  -> IMPORTANT
  -> it is a security risk to serve node_modules via express. You should use a bundler like webpack or browserify
*/
var nodeModulesDir = path.join(__dirname, 'node_modules');
app.use('/node_modules/', express.static(nodeModulesDir)); 

app.use(express.static(path.join(__dirname,"public")));
app.use('/build/',express.static(path.join(__dirname,"node_modules/three/build")));
app.use('/examples/',express.static(path.join(__dirname,"node_modules/three/examples")));
app.use('/controls/',express.static(path.join(__dirname,"node_modules/three/examples/jsm/controls")));

app.get("/", function (req, res) {
  res.sendFile(publicDir + "/src/index.html");
});

app.listen(3001, function () {
  console.log("Server is running on localhost3001");
});