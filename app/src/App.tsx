import { Container, Navbar, Table } from 'react-bootstrap';

function App() {
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
          <tr>
            <td>1</td>
            <td>google.com</td>
            <td>$7.99</td>
            <td>FREE5FROMNATE</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default App;
