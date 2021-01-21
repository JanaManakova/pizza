const express = require('express');
const app = express();
const { readData, writeData } = require('./utils');

const port = 9999;
const hostname = 'localhost';

let dishcase = [];

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

app.options('/*', (request, response) => {
    response.statusCode = 200;
    response.send('OK');
});

app.get('/disharr', async (request, response) => {
    dishcase = await readData();
    response.setHeader('Content-Type', 'application/json');
    response.status(200).json(dishcase);
});

app.post('/disharr', async (request, response) => {
    const dishArr = request.body;
    dishcase.push(dishArr);
    await writeData(dishcase);
    response.status(200).json({info: 'Dish succefully created!'});
});

app.post('/disharr/:dishArrId/dish', async (request, response) => {
    const dish = request.body;
    const dishArrId = Number(request.params.dishArrId);
    dishcase[dishArrId].dishs.push(dish);
    await writeData(dishcase);
    response.status(200).json({info: 'Dish succefully created!'});
});

app.patch('/disharr/:dishArrId/dish/:dishId', async (request, response) => {
    const { newName} = request.body;
    const dishArrId = Number(request.params.dishArrId);
    const dishId = Number(request.params.dishId);

    dishcase[dishArrId].dishs[dishId].name = newName;

    await writeData(dishcase);
    response.status(200).json({info: 'Dish succefully changed!'});
});

app.delete('/disharr/:dishArrId/dish/:dishId', async (request, response) => {
    const dishArrId = Number(request.params.dishArrId);
    const dishId = Number(request.params.dishId);

    dishcase[dishArrId].dishs.splice(dishId, 1);

    await writeData(dishcase);
    response.status(200).json({info: 'Dish succefully deleted!'});
});

app.patch('/disharr/:dishArrId', async (request, response) => {
    const dishArrId = Number(request.params.dishArrId);
    const { dishId, destShelfId } = request.body;

    const dishToMove =  dishcase[dishArrId].dishs.splice(dishId, 1);
    dishcase[destShelfId].dishs.push(dishToMove);

    await writeData(dishcase);
    response.status(200).json({info: 'Dish succefully moved!'});
});

app.listen(port, hostname, (error) => {
    if (error) {
        console.error(error);
    }
});
