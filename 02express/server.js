import express from 'express';

const app = express();
const port = 3000;
const router = express.Router();

app.get('/',(req,res) => {
    res.send('assalamualaikum');
});

router.get('/', (req,res) => {
    res.send('here is your cars');
})

app.use('/api/v1/cars', router);

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});