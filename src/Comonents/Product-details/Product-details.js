import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData/products.json';
import Products from '../Prduct/Products';

const Productdetails = () => {
    const { productId } = useParams();
    const [product,setProduct] = useState({});
    useEffect(()=>{
        fetch(`https://intense-harbor-52396.herokuapp.com/porducts/${productId}`)
        .then(res=>res.json())
        .then(data=>setProduct(data))
    },[productId])
    // const product = fakeData.find(pd=>pd.id === productId)
    console.log(product);
    return (
        <div>
            <h2>{productId+" "}The product details</h2>
            <Products showAddToCart={false} product={product}></Products>

        </div>
    );
};

export default Productdetails;