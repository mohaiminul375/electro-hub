'use client'
interface Payments {
    _id: string;
    customer_name: string;
    customer_email: string;
    customer_Phone: string;
    transaction_id: string;
    status: string;
    created_at: string;
    payment_method: string;
}
interface TableProps {
    payment: Payments;
    idx: number;
}

const PaymentHistoryTable = ({ payment, idx }: TableProps) => {
    const { customer_name,
        customer_email,
        customer_Phone,
        transaction_id,
        status,
        created_at,
        payment_method, } = payment;
    const date = new Date(created_at).toLocaleString();
    return (
        <tr className="bg-white dark:bg-darkCard border-b hover:bg-gray-50">
            <td className="px-4 py-2">{idx + 1}</td>
            <td className="px-4 py-2">{transaction_id}</td>
            <td className="px-4 py-2">{customer_name}<br />{customer_email}</td>
            <td className="px-4 py-2">{customer_Phone}</td>
            <td className="px-4 py-2">
                {status}
            </td>
            <td className="px-4 py-2 flex items-center gap-4">

                {payment_method}<br />
                {date}



            </td>

        </tr >
    );
};

export default PaymentHistoryTable;