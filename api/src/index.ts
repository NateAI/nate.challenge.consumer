import cors from 'cors';
import express, { Response } from 'express';

const app = express();
const port = 8080;

const products = [
  {
    id: 1,
    productUrl: "google.com",
    productPrice: 799,
    discountCode: "FREE5FROMNATE"
  },
  {
    id: 2,
    productUrl: "facebook.com",
    productPrice: 3488
  },
  {
    id: 3,
    productUrl: "apple.com",
    productPrice: 80000,
    discountCode: "GIVEME50"
  }
];

app.use(cors());

app.get('/products', (_, res: Response) => {
  res.send(products)
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`)
});
