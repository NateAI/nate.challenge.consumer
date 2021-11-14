import express, { Response } from 'express';

const app = express();
const port = 3000;

const products = [
  {
    id: 1,
    productUrl: "google.com",
    productPrice: "$7.99",
    discountCode: "FREE5FROMNATE"
  },
  {
    id: 2,
    productUrl: "facebook.com",
    productPrice: "$34.88"
  },
  {
    id: 3,
    productUrl: "apple.com",
    productPrice: "$1000.00",
    discountCode: "GIVEME50"
  }
];

app.get('/products', (_, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.send(products)
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`)
});
