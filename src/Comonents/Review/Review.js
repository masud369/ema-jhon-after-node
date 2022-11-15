import React, { useEffect, useState } from "react";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/dataBaseManager";
import fakeData from "../../fakeData/products.json";
import Reveiwitem from "../Reviewitem/Reveiwitem";
import Cart from "../Cart/Cart";
import happyImage from "../../images/giphy.gif";
import { useNavigate } from "react-router-dom";

const Review = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const savCart = getDatabaseCart();
    const prosuctKeys = Object.keys(savCart);

fetch("http://localhost:5000/productbyKeys",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify(prosuctKeys)
})
.then(res=>res.json())
.then(data=>{setCart(data), console.log(data)})

  }, []);

  // const total = cart.reduce( (total,pdr)=> total+pdr.price * pdr.quantity,0)

  // const removeQnty =(key)=>{

  //     const newAdd =cart.find((pd) =>{
  //      if(pd.id===key){
  //       let result = pd.quantity=+1;
  //       return result;
  //      }
  //     });

  //      setCart(newAdd);
  // }
  //   // // const savCart = getDatabaseCart();
  // // const prosuctKeys = Object.keys(savCart)
  //   const product = fakeData.find(pd =>{ if(pd.id === itemId){
  //   product.quantity =- 1;
  //   }});
  // setCart(product);
  const addNmiuns = (itemId, option) => {
    console.log(itemId);
    const findItem = { ...cart.find((item) => item.id === itemId) };
    if (findItem.quantity === 1 || findItem.quantity > 1) {
      if (option === "+") {
        findItem.quantity = findItem.quantity + 1;
      } else if(findItem.quantity > 2 || findItem.quantity === 2 ){
        findItem.quantity = findItem.quantity - 1;
      }
      let cartClone = [...cart];
      let findIndex = cartClone.indexOf(
        cart.find((item) => item.id === itemId)
      );
      cartClone[findIndex] = findItem;
      setCart(cartClone);
    }
  };

  const removeQuantity = (itemId) => {
    addNmiuns(itemId, "-");
  };
  const addQuantity = (itemId) => {
    addNmiuns(itemId, "+");
  };
  const removeItem = (idName) => {
    const newCart = cart.filter((pd) => pd.id !== idName);
    setCart(newCart);
    removeFromDatabaseCart(idName);
  };
  const [orderplaced, setOrderplaced] = useState(false);
  const navigation = useNavigate();
  const handelProceedOrder = () => {
    navigation('/shipment')
  };
  let thanksImage;
  if (orderplaced) {
    thanksImage = <img src={happyImage} alt="" />;
  }
  return (
    <div className="shop-container">
      <div className="products-container">
        <h2> The total item {cart.length}</h2>
        {cart.map((pd) => (
          <Reveiwitem
            addQuantity={addQuantity}
            removeQuantity={removeQuantity}
            removeItem={removeItem}
            product={pd}
            key={pd.id}
          ></Reveiwitem>
        ))}
        {thanksImage}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handelProceedOrder} className="add-cart">
            Porceed Checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
