import React from "react";

const Reveiwitem = (props) => {
  const { name, quantity, id, price, img } = props.product;
  const reviewItem = {
    borderBottom: "1px solid red",
    padding: "10px",
  };
  return (
    <div style={reviewItem}>
      <img width={"120px"} src={img} alt="" />
      <h4>Name:{" " + name}</h4>
      <p>Quantity:{" " + quantity}</p>
      <p>Price:{" " + price} </p>
      <button onClick={() => props.removeItem(id)} className="add-cart">
        {" "}
        Remove
      </button>
      <button onClick={() => props.removeQuantity(id)}>removeQuantity</button>
      <button onClick={() => props.addQuantity(id)}>add Quantity</button>
    </div>
  );
};

export default Reveiwitem;
