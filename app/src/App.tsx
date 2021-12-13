interface Product {
  id: number;
  productUrl: string;
  productPrice: string;
  discountCode: string;
};

const API_URL = 'http://localhost:8080';
const PRODUCTS_ENDPOINT = '/products';

function App() {
  return (
    <h1>Hello, world!</h1>
  );
}

export default App;
