import { MdDelete, MdOutlineProductionQuantityLimits } from "react-icons/md";
import listStyle from "./listCheckout.module.css";
import axios from "axios";

const ListCheckout = ({ getProduct, product }) => {
  let subTotal = 0;
  let tax = 0;
  let shipping = 30;

  const handleQuantity = (item, id) => {
    try {
      const res = axios.put(
        `https://663a808a1ae792804bef916d.mockapi.io/tasks/${id}`,
        item
      );
    } catch (error) {
      console.log(error);
    }
    getProduct();
  };

  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(
        `https://663a808a1ae792804bef916d.mockapi.io/tasks/${id}`
      );
    } catch (error) {
      console.log(error);
    }
    getProduct();
  };
  return (
    <main>
      {product?.map((item) => {
        const { name, image, price, quantity, id } = item;
        subTotal += quantity * (price - (price / 100) * 11);
        tax = subTotal / 5;
        return (
          <div className={listStyle.list} key={id}>
            <img src={image} alt="" className={listStyle.img} />
            <div className="m-auto w-50 p-1">
              <h3>{name}</h3>
              <div className="d-flex gap-2">
                <p className="text-success">{price - (price / 100) * 11}</p>
                <p className="text-danger text-decoration-line-through">
                  {price}
                </p>
              </div>
              <div className={listStyle.quantity}>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    if (quantity > 1) {
                      item = { ...item, quantity: quantity - 1 };
                      handleQuantity(item, id);
                    }
                  }}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    item = { ...item, quantity: Number(quantity) + 1 };
                    handleQuantity(item, id);
                  }}
                >
                  +
                </button>
              </div>
              <button
                className="btn btn-danger mt-2 w-100"
                onClick={() => deleteProduct(id)}
              >
                <MdDelete /> Remove
              </button>
              <p className="mt-2">
                Product Total: ${quantity * (price - (price / 100) * 11)}{" "}
              </p>
            </div>
          </div>
        );
      })}

      {subTotal ? (
        <div className="mt-5">
          <table className="table table-striped table-hover table-bordered">
            <tbody>
              <tr>
                <th>Subtotal</th>
                <td className="text-end">$ {subTotal}</td>
              </tr>
              <tr>
                <th>Tax(20%)</th>
                <td className="text-end">$ {tax}</td>
              </tr>
              <tr>
                <th>Shipping</th>
                <td className="text-end">$ 30</td>
              </tr>
              <tr>
                <th>Total</th>
                <td className="text-end">
                  $ {`${subTotal + shipping + tax}`}{" "}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </main>
  );
};

export default ListCheckout;
