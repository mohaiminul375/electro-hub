import Image from "next/image";
import Link from "next/link";
import cry from "../../../../public/cry.png"
export const dynamic = 'force-dynamic';

const Failed = () => {
    return (
        <section className="flex justify-center items-center px-4">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6 text-center">
                <Image className="mx-auto" src={cry} alt="check" height={50} width={50} />
                <h2 className="text-xl font-bold mt-4 text-red-600">Payment Failed!</h2>
                <p className="text-gray-600 mt-2">Your payment Failed Please try later or contact to support.
                </p>
                <div className="mt-5 flex gap-4 justify-center">
                    <Link href="/">
                        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition w-full md:w-auto">
                            Go to Home
                        </button>
                    </Link>
                    <Link href="/orders">
                        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary-dark transition w-full md:w-auto">
                            Support
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Failed;