import {
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  InputGroup,
} from "react-bootstrap";
import { MdAddShoppingCart } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";

const AddCheckout = ({ getProduct }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      name: name,
      price: price,
      quantity: quantity,
      image: image,
    };

    postProduct(newProduct);
    setImage("");
    setQuantity("");
    setName("");
    setPrice("");
  };

  const postProduct = async (newProduct) => {
    try {
      const res = await axios.post(
        "https://663a808a1ae792804bef916d.mockapi.io/tasks",
        newProduct
      );
    } catch (error) {
      console.log(error);
    }
    getProduct();
  };

  return (
    <div>
      <Container>
        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-2" controlId="name">
            <FormLabel>Product Name</FormLabel>
            <FormControl
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></FormControl>
          </FormGroup>
          <FormGroup className="mb-2" controlId="price">
            <FormLabel>Product Price</FormLabel>
            <FormControl
              type="number"
              required
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            ></FormControl>
          </FormGroup>
          <FormGroup className="mb-2" controlId="quantity">
            <FormLabel>Product Quantity</FormLabel>
            <FormControl
              type="number"
              required
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
            ></FormControl>
          </FormGroup>
          <Form.Label htmlFor="basic-url">Product Image</Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text id="basic-addon">
              https://example.com
            </InputGroup.Text>
            <Form.Control
              type="url"
              id="basic-url"
              aria-describedby="basic-addon"
              required
              onChange={(e) => setImage(e.target.value)}
              value={image}
            />
          </InputGroup>
          <Button variant="danger" type="submit" className="mt-3">
            <MdAddShoppingCart /> Add to Cart
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default AddCheckout;
