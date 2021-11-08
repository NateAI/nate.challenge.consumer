import express, { Response } from 'express';

const app = express()
const port = 3000

app.get('/', (_, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`)
})
