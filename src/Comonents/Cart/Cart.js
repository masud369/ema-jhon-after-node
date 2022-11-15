
import './Cart.css';

const Cart = (props) => {
    // console.log(props.cart.name);
    const cart = props.cart;
    const total = cart.reduce( (total,pdr)=> total+pdr.price||1 * pdr.quantity,0)
    let shipCost = 0;
    if(total>200){
        shipCost = 0;
    }else if(total>100){
        shipCost = 4.99;
    }else if(total>0){
        shipCost = 12.99;
    }
    let tax = (total*.10).toFixed(2);
    const numFormating =(num)=>{
        const precision = num.toFxed(2);
        return precision;
    }
    const granTotal = (Number(total)+Number(shipCost)+Number(tax)).toFixed(2);
    return (
        <div>
            <h2>Order Summery-</h2>
            <h3>This is cart:{cart.length}</h3>
            <h4>Total: {total}</h4>
            <h4><small>Tax:{" "+tax}</small></h4>
            <p><small>Shipping cost: {" "+shipCost}</small></p>
            <h3 className='red'>Grand total:{" "+granTotal}</h3>
             {
                props.children
             }
        </div>
    );
};

export default Cart;