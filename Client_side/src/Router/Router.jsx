import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Success from "../Component/Success";
import Fail from "../Component/Fail";
import Cancel from "../Component/Cancel";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>
    },
    {
        path: "/success",
        element: <Success></Success>
    },
    {
        path: "/fail",
        element: <Fail></Fail>
    },
    {
        path: "/cancel",
        element: <Cancel></Cancel>
    },

]);

export default router;