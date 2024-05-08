import axios from "axios";
import React, { useEffect, useState } from "react";
import homeStyle from "./Home.module.css";
import { Container } from "react-bootstrap";
import AddCheckout from "../components/add/AddCheckout";
import ListCheckout from "../components/list/ListCheckout";

const Home = () => {
  const getProduct = async () => {
    try {
      const res = await axios(
        "https://663a808a1ae792804bef916d.mockapi.io/tasks"
      );
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const [visible, setVisible] = useState(true);
  const [product, setProduct] = useState([]);
  return (
    <div>
      <Container className={homeStyle.title}>
        <header>Checkout page</header>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            setVisible(!visible);
          }}
        >
          {visible ? "gizle" : "göster"}
        </button>
      </Container>
      <Container className={homeStyle.component}>
        <div className={homeStyle.first}>{visible && <AddCheckout getProduct={getProduct} />}</div>
        <div className={homeStyle.second}>
        <ListCheckout getProduct={getProduct} product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Home;
