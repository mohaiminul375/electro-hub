import Image from "next/image";
import delivery from '../../../public/assets/shipped.png'
import support from '../../../public/assets/customer-support.png'
import guaranty from '../../../public/assets/guarantey.png'
import payment from '../../../public/assets/secure-payment.png'


const Promises = () => {
    return (
        <section className='mt-10 '>
            <div>
                <h2 className='text-3xl font-semibold px-3 md:px-0'>Our Promises</h2>
            </div>
            {/* Promises container */}
            <div className="grid md:grid-cols-4 gap-6">
                <div className="flex items-center p-3 border border-gray-200 rounded-lg shadow-sm bg-white dark:bg-darkCard mt-5 transition-transform duration-300 ease-in-out hover:scale-110 group">
                    <div className="mr-4">
                        <Image className="transform transition-transform duration-500 group-hover:rotate-[360deg]" height={100} width={100} src={delivery} alt="Fast Delivery Icon" />
                    </div>
                    <div>
                        <h4 className="text-base font-semibold text-primary mb-1">
                            5-Day Fast Delivery
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-white">
                            With free shipping on all orders  no minimum required!
                        </p>
                    </div>
                </div>
                <div className="flex items-center p-3 border border-gray-200 rounded-lg shadow-sm bg-white dark:bg-darkCard mt-5 transition-transform duration-300 ease-in-out hover:scale-110 group">
                    <div className="mr-4">
                        <Image className="transform transition-transform duration-500 group-hover:rotate-[360deg]" height={100} width={100} src={guaranty} alt="Fast Delivery Icon" />
                    </div>
                    <div>
                        <h4 className="text-base font-semibold text-primary mb-1">
                            Authentic Products Guaranteed
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-white">
                            100% original items with full brand warranty no fakes, ever.
                        </p>
                    </div>
                </div>
                <div className="flex items-center p-3 border border-gray-200 rounded-lg shadow-sm bg-white dark:bg-darkCard mt-5 transition-transform duration-300 ease-in-out hover:scale-110 group">
                    <div className="mr-4">
                        <Image className="transform transition-transform duration-500 group-hover:rotate-[360deg]" height={100} width={100} src={support} alt="Fast Delivery Icon" />
                    </div>
                    <div>
                        <h4 className="text-base font-semibold text-primary mb-1">
                            Dedicated 24/7 Support
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-white">
                            Our team is here around the clock to help you with anything you need.
                        </p>
                    </div>
                </div>
                <div className="flex items-center p-3 border border-gray-200 rounded-lg shadow-sm bg-white dark:bg-darkCard mt-5 transition-transform duration-300 ease-in-out hover:scale-110 group">
                    <div className="mr-4">
                        <Image className="transform transition-transform duration-500 group-hover:rotate-[360deg]" height={100} width={100} src={payment} alt="Fast Delivery Icon" />
                    </div>
                    <div>
                        <h4 className="text-base font-semibold text-primary mb-1">
                            Secure Payments via SSLCommerz
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-white">
                            All transactions are encrypted and safe, powered by SSLCommerz.
                        </p>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Promises;