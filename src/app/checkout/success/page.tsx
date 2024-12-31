import Image from 'next/image';
import Link from 'next/link';
import check from '../.../../../../../public/check.png'; // Replace with your check image path

const PaymentSuccess = () => {
    return (
        <section className="flex justify-center items-center px-4">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6 text-center">
                <Image className="mx-auto" src={check} alt="check" height={50} width={50} />
                <h2 className="text-xl font-bold mt-4 text-green-600">Payment Successful!</h2>
                <p className="text-gray-600 mt-2">Thank you for your payment. Your order has been successfully placed.
                    Wait for Approve.
                </p>
                <div className="mt-5 flex gap-4 justify-center">
                    <Link href="/">
                        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition w-full md:w-auto">
                            Go to Home
                        </button>
                    </Link>
                    <Link href="/orders">
                        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary-dark transition w-full md:w-auto">
                            View Orders
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PaymentSuccess;
