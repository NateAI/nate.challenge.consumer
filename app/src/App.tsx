import { useState, useEffect } from 'react';
import { Container, Navbar, Table } from 'react-bootstrap';

interface Product {
  id: number;
  productUrl: string;
  productPrice: string;
  discountCode: string;
};

const API_URL = 'http://localhost:3000';
const PRODUCTS_ENDPOINT = '/products';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(`${API_URL}${PRODUCTS_ENDPOINT}`);
        const json = await result.json();

        setProducts(json);
      } catch (e) {
        console.error(e);
        setProducts([]);
      }
    };

    fetchData();
  }, [setProducts]);

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">nate</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>URL</th>
            <th>Price</th>
            <th>Discount Code</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((product: Product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.productUrl}</td>
                <td>{product.productPrice}</td>
                <td>{product.discountCode}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  );
}

export default App;
