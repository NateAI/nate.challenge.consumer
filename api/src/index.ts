import cors from 'cors';
import express, { Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 8080;

const products = [
  {
    productId: 1,
    productUrl: "https://www.bedbathandbeyond.com/store/product/kate-spade-new-york-2-slice-toaster/5374432",
    productPrice: 9499,
    discountCode: "FREE5FROMNATE"
  },
  {
    productId: 2,
    productUrl: "https://www.oculus.com/quest-2/",
    productPrice: 29900
  },
  {
    productId: 3,
    productUrl: "https://www.apple.com/shop/product/MME73AM/A/airpods-3rd-generation",
    productPrice: 17900,
    discountCode: "GIVEME50"
  }
];

app.use(cors());
app.use(bodyParser.json());

app.get('/products', (_, res: Response) => {
  res.send(products)
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`)
});
