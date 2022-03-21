const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const PORT = 3000;
const userController = require('./controllers/userController');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', userController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`ouvindo na porta ${PORT}!`));
