const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());
const portNum = 3000;
const toursJson = fs.readFileSync(
  `${__dirname}/dev-data/data/tours-simple.json`
);
const tours = JSON.parse(toursJson);

app.get('/', (request, response) => {
  response.status(200).send('hello!!!');
});

app.get('/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: { tours },
    },
  });
});

app.get('/tours/:id', (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  if (id >= tours.length)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });

  const tour = tours[id];
  res.status(200).json({
    status: 'success',
    data: { tour },
  });
});

app.post('/tours', (req, res) => {
  // console.log(req.body);
  const newObj = Object.assign({ id: tours.length }, req.body);
  tours.push(newObj);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        states: 'success',
        data: newObj,
      });
    }
  );
});

app.patch('/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  res.status(200).json({
    status: 'updated',
    data: {
      tour: '<Updated tour>',
    },
  });
});

app.delete('/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  res.status(204).send();
});

app.listen(portNum, () => {
  console.log('listing...');
});
