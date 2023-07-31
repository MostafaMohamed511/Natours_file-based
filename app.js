const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();
const portNum = 3000;
app.use(express.json());
app.use(morgan('dev'));
const toursJson = fs.readFileSync(
  `${__dirname}/dev-data/data/tours-simple.json`
);
const tours = JSON.parse(toursJson);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.get('/', (request, response) => {
  response.status(200).send('hello!!!');
});

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: { tours },
    },
  });
};

const getTour = (req, res) => {
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
};

const addTour = (req, res) => {
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
};

const updateTour = (req, res) => {
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
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  res.status(204).send();
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet completed',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet completed',
  });
};
const addUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet completed',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet completed',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet completed',
  });
};

// app.get('/tours', getAllTours);
// app.get('/tours/:id', getTour);
// app.post('/tours', addTour);
// app.patch('/tours/:id', updateTour);
// app.delete('/tours/:id', deleteTour);

app.route('/tours').get(getAllTours).post(addTour);
app.route('/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);
app.route('/users').get(getAllUsers).post(addUser);
app.route('/users/:id').get(getUser).patch(updateUser).delete(deleteUser);
app.listen(portNum, () => {
  console.log('listing...');
});
