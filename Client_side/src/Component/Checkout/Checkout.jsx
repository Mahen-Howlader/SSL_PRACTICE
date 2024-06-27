import axios from "axios";

function Checkout() {

    function handelCreatePayment(e) {
        e.preventDefault()
        axios.post("http://localhost:5000/create-payment", {
            amount: 1000,
            currency: "USD"
        })
        .then((res) => {
            console.log(res?.data);
            const redirectURL = res.data?.paymentULR;
            if(redirectURL){
                window.location.replace(redirectURL)
            }
        })

    }

    return (
        <div>
            <div className="font-[sans-serif] lg:flex lg:items-center lg:justify-center lg:h-screen max-lg:py-4">
                <div className="bg-purple-100 p-8 w-full max-w-5xl max-lg:max-w-xl mx-auto rounded-md">
                    <h2 className="text-3xl font-extrabold text-gray-800 text-center">Checkout</h2>

                    <div className="grid lg:grid-cols-3 gap-6 max-lg:gap-8 mt-16">
                        <div className="lg:col-span-2">
                            <h3 className="text-lg font-bold text-gray-800">Choose your payment method</h3>

                            <div className="grid gap-4 sm:grid-cols-2 mt-4">
                                <div className="flex items-center">
                                    <input type="radio" className="w-5 h-5 cursor-pointer" id="card" defaultChecked />
                                    <label htmlFor="card" className="ml-4 flex gap-2 cursor-pointer">
                                        <img src="https://readymadeui.com/images/visa.webp" className="w-12" alt="card1" />
                                        <img src="https://readymadeui.com/images/american-express.webp" className="w-12" alt="card2" />
                                        <img src="https://readymadeui.com/images/master.webp" className="w-12" alt="card3" />
                                    </label>
                                </div>

                                <div className="flex items-center">
                                    <input type="radio" className="w-5 h-5 cursor-pointer" id="paypal" />
                                    <label htmlFor="paypal" className="ml-4 flex gap-2 cursor-pointer">
                                        <img src="https://readymadeui.com/images/paypal.webp" className="w-20" alt="paypalCard" />
                                    </label>
                                </div>
                            </div>

                            <form onSubmit={handelCreatePayment} className="mt-8">
                                <div className="grid sm:col-span-2 sm:grid-cols-2 gap-4">
                                    <div>
                                        <input type="text" placeholder="Name of card holder" className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                                    </div>
                                    <div>
                                        <input type="text" placeholder="Your email" className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                                    </div>
                                    <div>
                                        <input type="number" placeholder="XXXX XXXX XXXX XXXX" className="col-span-full px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                                    </div>
                                    <div>
                                        <input type="number" placeholder="MM/YY" className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                                    </div>
                                    <div>
                                        <input type="number" placeholder="CVV" className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 mt-8">
                                    <button  type="submit" className="px-7 py-3.5 text-sm tracking-wide bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit</button>
                                </div>
                            </form>
                        </div>

                        <div className="bg-white p-6 rounded-md max-lg:-order-1">
                            <h3 className="text-lg font-bold text-gray-800">Summary</h3>
                            <ul className="text-gray-800 mt-6 space-y-3">
                                <li className="flex flex-wrap gap-4 text-sm">Sub total <span className="ml-auto font-bold">$48.00</span></li>
                                <li className="flex flex-wrap gap-4 text-sm">Discount (20%) <span className="ml-auto font-bold">$4.00</span></li>
                                <li className="flex flex-wrap gap-4 text-sm">Tax <span className="ml-auto font-bold">$4.00</span></li>
                                <hr />
                                <li className="flex flex-wrap gap-4 text-base font-bold">Total <span className="ml-auto">$52.00</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Checkout;