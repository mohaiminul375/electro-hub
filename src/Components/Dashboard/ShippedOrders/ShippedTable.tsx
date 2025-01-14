import { useMarkedDelivered } from "@/app/admin-dashboard/shipped-orders/api/route";
import Swal from "sweetalert2";

interface Address {
    division: string;
    district: string;
    full_address: string;
}
interface Order {
    _id: string,
    order_id: string;
    orderCreatedAt: string;
    orderApproveAt: string;
    customer_name: string;
    customer_email: string;
    customer_Phone: string;
    address: Address;
    products: Array<[]>;
    payment_method: string;
    order_status: string;
    orderShippedAt: string;
}
interface TableProps {
    idx: number;
    order: Order
}
interface OrderData {
    orderDeliveredAt: string;
}
const ShippedTable = ({ order, idx }: TableProps) => {
    const markedDelivered = useMarkedDelivered();
    const {
        // _id,
        order_id,
        orderCreatedAt,
        orderShippedAt,
        customer_name,
        customer_email,
        customer_Phone,
        address,
        products,
        order_status,
    } = order;
    const orderDate = new Date(orderCreatedAt).toLocaleString();
    // Marked delivered
    const makeDelivered = (order_id: string) => {
        const newData: OrderData = {
            orderDeliveredAt: new Date().toLocaleString(),
        }
        console.log(order_id)
        Swal.fire({
            title: "Are you sure Marked Delivered?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delivered it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                // await packedOrder.mutateAsync({ order_id, newData })
                await markedDelivered.mutateAsync({ order_id, newData });
            }
        });
    }
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
                {/* {orderApproveAt} */}
            </td>
            <td className="px-4 py-2">
                {address?.division}<br />
                {address?.district}<br />
            </td>
            <td className="px-4 py-2">

                {products?.length}
                {/* {address.full_address}<br /> */}
            </td>
            <td className="px-4 py-2">
                {orderShippedAt}
            </td>

            <td className="px-4 py-2">
                {order_status}
            </td>
            <td className="px-4 py-2">
                <button
                    onClick={() => makeDelivered(order_id)}
                    className="bg-primary text-xs p-2 rounded-md text-white">
                    Marked as <br /> Delivered
                </button>
            </td>

        </tr>
    );
};

export default ShippedTable;