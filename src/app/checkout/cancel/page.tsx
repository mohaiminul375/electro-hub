import Image from "next/image";
import Link from "next/link";
import cross from "../../../../public/cross.png"
export const dynamic = 'force-dynamic';

const Cancel = () => {
    return (
        <section className="flex justify-center items-center px-4">
            <head>
                <title>Electro-Hub | Payment Cancel</title>
            </head>
            <div className="w-full max-w-sm bg-white dark:bg-darkCard rounded-lg shadow-lg p-6 text-center">
                <Image className="mx-auto" src={cross} alt="check" height={50} width={50} />
                <h2 className="text-xl font-bold mt-4 text-red-600">Payment Canceled!</h2>
                <p className="text-gray-600 dark:text-white mt-2">You Cancel The payment
                </p>
                <div className="mt-5 flex gap-4 justify-center">
                    <Link href="/">
                        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition w-full md:w-auto">
                            Go to Home
                        </button>
                    </Link>

                </div>
            </div>
        </section>
    );
};

export default Cancel;