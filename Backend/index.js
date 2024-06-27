const express = require("express")
const cors = require("cors")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;
require("dotenv").config()
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
    optionSuccessStatus: 200,
}

// middleware
app.use(express.urlencoded())
app.use(cors(corsOptions))
app.use(express.json())




// mongodb
const { default: axios } = require("axios");
const uri = "mongodb+srv://sslPayment:anz2DuILmvkpoeRz@cluster0.iagloem.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const uri = "mongodb+srv://payment_access:<password>@cluster0.iagloem.mongodb.net/?appName=Cluster0"

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



const payment = client.db("ssl").collection("payment");

async function run() {
    try {

        app.post("/create-payment", async (req, res) => {
            const infoData = req.body
            const trxId = new ObjectId().toString()

            const initiateData = {
                store_id: 'totoc667b2bb5285f4',
                store_passwd: 'totoc667b2bb5285f4@ssl',
                total_amount: infoData?.amount,
                currency: 'EUR',
                tran_id: trxId,
                success_url: 'http://localhost:5000/success-payment',
                fail_url: 'http://localhost:5000/fail',
                cancel_url: 'http://localhost:5000/cancel',
                cus_name: 'Customer Name',
                cus_email: 'cust@yahoo.com',
                cus_add1: 'Dhaka',
                cus_add2: 'Dhaka',
                cus_city: 'Dhaka',
                cus_state: 'Dhaka',
                cus_postcode: '1000',
                cus_country: 'Bangladesh',
                cus_phone: '01711111111',
                cus_fax: '01711111111',
                ship_name: 'Customer Name',
                product_name: "Laptop",
                product_profile: "general",
                product_category: "Lapdop",
                shipping_method: "NO",
                ship_add1: 'Dhaka',
                ship_add2: 'Dhaka',
                ship_city: 'Dhaka',
                ship_state: 'Dhaka',
                ship_postcode: '1000',
                ship_country: 'Bangladesh',
                multi_card_name: 'mastercard,visacard,amexcard',
                value_a: 'ref001_A',
                value_b: 'ref002_B',
                value_c: 'ref003_C',
                value_d: 'ref004_D'
            };
            const url = 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php';
            try {
                const response = await axios.post(url, initiateData, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                // console.log(response.data);
                const saveData = {
                    cus_name: "Dumy",
                    payentId: trxId,
                    amount: infoData?.amount,
                    status: "Pending"
                }
                const resData = await payment.insertOne(saveData)
                if (resData) {
                    return res.send(
                        {
                            paymentULR: response?.data?.GatewayPageURL
                        }
                    )
                }




            } catch (error) {
                console.error('Error:', error);
                return res.send(error)
            }




        })

        app.post("/success-payment", async (req, res) => {
            const successData = req.body;
            if (successData.status !== "VALID") {
                throw new Error("Unauthorized invalid payment")
            }

            const query = {
                payentId: successData?.tran_id
            };


            const update = {
                $set: {
                    status: "Success"
                }
            }

            const updateone = await payment.updateOne(query, update)
            console.log("success", successData)
            console.log("success", updateone)
            res.redirect('http://localhost:5173/success')
        })
        app.post("/cancel", async (req, res) => {
            res.redirect('http://localhost:5173/cancel')
        })
        app.post("/fail", async (req, res) => {
            res.redirect('http://localhost:5173/fail')
        })


        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error

    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send('Hello World!')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
