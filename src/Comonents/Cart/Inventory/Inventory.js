const Inventory = () => {
    const handelAddProduct = ()=>{
        const product = {}; 
        fetch("https://intense-harbor-52396.herokuapp.com/addUser",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(product)
        })
        .then(res=>res.json())
        .then(result=>{console.log(result)})
    }

    return (
        <div>
            <form action="">
                <p><spam>Nmae:<input type="text" /></spam></p>
                <p><spam>Price:<input type="text" /></spam></p>
                <p><spam>Quantity:<input type="text" /></spam></p>
                <p><spam>ProductImage:<input type="file" /></spam></p>
            </form>
        </div>
    );
};

export default Inventory;