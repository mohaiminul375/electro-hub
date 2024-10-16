import { getAllProduct } from "./route";


const page = async () => {
    const products: [] = await getAllProduct();
    // console.log(products)
    return (
        <div>
            {products.length}
        </div>
    );
};

export default page;