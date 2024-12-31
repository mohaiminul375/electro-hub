import Link from "next/link";

interface Order {
    _id: string,
    order_id: string;
    orderCreatedAt: string;
    customer_name: string;
    customer_email: string;
    customer_Phone: string;
    address: object;
    products: Array<[]>;
    payment_method: string;
    order_status: string;
}
interface TableProps {
    idx: number;
    order: Order
}

const OrdersTable = ({ order, idx }: TableProps) => {
    const {
        _id,
        order_id,
        orderCreatedAt,
        customer_name,
        customer_email,
        customer_Phone,
        address,
        products,
        payment_method,
        order_status,
    } = order;
    const orderDate = new Date(orderCreatedAt).toLocaleString()
    return (
        <tr className="bg-white border-b hover:bg-gray-50">
            <td className="px-4 py-2">{idx + 1}</td>
            <td className="px-4 py-2">
                {order_id}<br />
                {orderDate}<br />

            </td>
            <td className="px-4 py-2">
                {customer_name}<br />
                {customer_email}<br />
                {customer_Phone}<br />
            </td>
            <td className="px-4 py-2">
                {address?.division}<br />
                {address?.district}<br />
                {/* {address.full_address}<br /> */}
            </td>
            <td className="px-4 py-2">
                {products?.length}
            </td>
            <td className="px-4 py-2">
                {payment_method}
            </td>
            <td className="px-4 py-2">
                {order_status}
            </td>
            <td className="px-4 py-2">
                <button className="bg-primary p-2 rounded-md text-white">
                    <Link href={`pending-orders/${_id}`}>
                        See Details
                    </Link>
                </button>
            </td>

        </tr>
    );
};

export default OrdersTable;