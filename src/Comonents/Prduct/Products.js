import React from 'react';
import './Products.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Products = (props) => {
    // console.log(props)
    const {name,img,seller,price,stock,id}=props.product;
    return (
        <div className='product-container'>
            <div className="product-img"> 
                <img src={img} alt="" />
            </div>
            <div className="product-description">
                <h4 className='product-name'><Link to={"/product/"+id}>Product Name:{" "+name}</Link> </h4>
                <br />  
                <p><small>seller: {seller}</small></p>  
                <p>Price:{price}</p>
                <p><small>Only {stock} in left -Order soon</small></p>
                {props.showAddToCart && <button className='add-cart' onClick={()=>props.handelProduct(props.product)}><FontAwesomeIcon icon={faCartShopping} />add to cart</button>}
             </div>
        </div>
    );
};

export default Products;