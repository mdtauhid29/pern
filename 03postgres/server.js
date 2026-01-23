import express from 'express';
import { db } from './db.js';
import { cars } from './schema.js';

const app = express();
const port = 3000;
const router = express.Router();

app.use(express.json());
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} ${req.method} ${req.url}`);
    next();
})

app.get('/',(req,res) => { res.send('assalamualaikum'); });

//get all cars
router.get('/', (req,res) => {
    //res.send('here is your cars');
    res.json(cars);
});

//get a car by id
router.get('/:id', (req,res) => {
    const id = Number(req.params.id);
    const car = cars.find((car) => car.id === id);

    if(!car) return res.status(404).send('car not found');
    res.json(car);
});

//add a car
router.post('/', async (req,res) => {
    const { model, make, year, price } = req.body;
    if(!model||!make||!year||!price){
        return res.status(404).json({error: 'missing field'});
    }
    const [newCar] = await db.insert(cars).values({model,make,year,price}).returning();
    res.status(201).json(newCar);
});

//update a car by id
router.put('/:id',(req,res) => {
    const id = Number(req.params.id);
    const index = cars.findIndex(c => c.id ===id);

    if(index === -1){
        return res.status(404).send('car not found');
    }
    const { model, make, year} = req.body;
    if(model) cars[index].model = model;
    if(make) cars[index].make = make;
    if(year) cars[index].year = year;
    res.json(cars[index]);
})

//delete a car byb id
router.delete('/:id', (req,res) => {
    const id = Number(req.params.id);
    const index = cars.findIndex(c => c.id === id);

    if(index === -1){
        return res.status(404).send('car not found');
    }

    const deleted = cars.splice(index,1)[0];
    res.json({message: "Car deleted", car:deleted});
})

app.use('/api/v1/cars', router);

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});