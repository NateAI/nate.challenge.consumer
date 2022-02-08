interface Product {
  id: number;
  productUrl: string;
  productPrice: string;
  discountCode: string;
};

const API_URL = 'http://localhost:8080';
const PRODUCTS_ENDPOINT = '/products';

const LOGGED_IN_USER = {
  name: 'John Doe',
  customerId: '123',
  defaultPaymentMethodId: '456',
  defaultAddressId: '789'
};

function App() {
  return (
    <h1>Hello, world!</h1>
  );
}

export default App;
