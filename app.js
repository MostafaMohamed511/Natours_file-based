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
  console.log('fuck oyoy');
  response.status(200).send('hello!!!');
});

app.get('/tours', (req, res) => {
  res.status(201).json({
    status: 'fuck you',
    data: {
      tours: { tours },
    },
  });
});
app.post('/tours', (req, res) => {
  console.log(req.body);
  const newObj = Object.assign({ id: tours.length }, req.body);
  tours.push(newObj);
  (async () => {
    await fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      (err) => {
        res.status(201).json({
          states: 'success',
          data: { newObj },
        });
        console.log('writing in');
      }
    );
    console.log('writing');
  })();
});
app.listen(portNum, () => {
  console.log('listing...');
});
