import React, { useEffect, useState } from 'react';
import './Shop.css';
import Products from '../Prduct/Products';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/dataBaseManager';

const Shop = () => {
    // console.log(fakeData); 
    // const fake10 = dbdata.slice(0,15);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(()=>{
      fetch("https://intense-harbor-52396.herokuapp.com/porducts")
      .then(res=>res.json())
      .then(data=> setProducts(data))
    },[])


    useEffect(()=>{
      const sevCart = getDatabaseCart();
      const productKeys = Object.keys(sevCart);
      console.log(products,productKeys);
      fetch("https://intense-harbor-52396.herokuapp.com/productbyKeys",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(productKeys)
      })
      .then(res=>res.json())
      .then(data=>{setCart(data), console.log(data)})
     
    },[])  

    const productHandeler = (product)=>{
      console.log("product added "+ product.quantity);
      const toBeAddedKey = product.id;
      const sameProduct = cart.find(pd=>pd.id === toBeAddedKey);
      let count=1;
      let newCart;
      if(sameProduct){
        count = sameProduct.quantity+1;
        sameProduct.quantity= count;
        const others = cart.filter(pd=>pd.id !== toBeAddedKey);
        newCart=[...others, sameProduct]
      }else{
        product.quantity = 1;
        newCart = [...cart,product]
      }
      // const count = sameProduct.length;
      // const newCart = [ ...cart, product];
      
      setCart(newCart);
      
      addToDatabaseCart(product.id, count);

    }

    return (
        <div className='shop-container'>
            <div className='products-container'>
    
              {
                products.map(product=> <Products key={product.id}
                   product={product}
                   showAddToCart={true}
                   handelProduct={productHandeler} 
                   ></Products> )
              }
            
            </div>
            <div className="cart-container"> 
                <Cart cart={cart}>
                  <Link to='/review'><button className='add-cart'> <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon> Review Cart</button></Link>
                </Cart>
            </div>
            
        </div>
    );
};

export default Shop;