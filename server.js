const express = require('express');
const app = express();

app.use(express.static('dist'));
app.use('/node_modules', express.static('node_modules'));

app.listen(8080, () => {console.log("Port:8080")});
