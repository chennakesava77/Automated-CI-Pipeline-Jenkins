const express = require('express');
const app = express();
const routes = require('./routes/index');

app.use(express.static('static'));
app.set('view engine', 'ejs');
app.set('views', './templates');

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});