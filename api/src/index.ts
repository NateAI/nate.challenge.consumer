import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

import authenticateUser from './middleware/auth';
import internalServerError from './middleware/error-handler';
import accessLog from './middleware/access-log';
import productRoutes from './routes/products';
import purchaseRoutes from './routes/purchase';

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

app.use(accessLog);
app.use('/products', productRoutes);
app.use('/purchase', authenticateUser, purchaseRoutes);
app.use(internalServerError);

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`)
});
