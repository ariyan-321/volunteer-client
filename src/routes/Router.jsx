import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import MainHome from "../components/MainHome";
import Home from "../components/Home";
import AllVolunteerNeed from "../components/AllVolunteerNeed";
import AddVolunteerNeedPost from "../components/AddVolunteerNeedPost";
import ManageMyPost from "../components/ManageMyPost";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../components/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import VoluntteerNeedPostDetails from "../components/VoluntteerNeedPostDetails";
import UpdateVolunteerNeedPosts from "../components/UpdateVolunteerNeedPosts";

const router=createBrowserRouter([
    {
        path:"/",
        element:<MainHome></MainHome>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/all-volunteer-need",
                element:<AllVolunteerNeed></AllVolunteerNeed>
            },
            
            {
                path:"/add-volunteer-need-post",
                element:<PrivateRoute><AddVolunteerNeedPost></AddVolunteerNeedPost></PrivateRoute>
            },
            {
                path:"/manage-my-posts",
                element:<PrivateRoute><ManageMyPost></ManageMyPost></PrivateRoute>
            },
            {
                path:"/details/:id",
                element:<PrivateRoute><VoluntteerNeedPostDetails></VoluntteerNeedPostDetails></PrivateRoute>,
                loader:({params})=> fetch(`https://assignment-11-new.vercel.app/volunteer/${params.id}`)
            },
            {
                path:"/update-volunteer-need-post/:id",
                element:<PrivateRoute><UpdateVolunteerNeedPosts></UpdateVolunteerNeedPosts></PrivateRoute>,
            }
        ],
    },
    {
        path:"/logIn",
        element:<Login></Login>
    },
    {
        path:"/register",
        element:<Register></Register>
    }
]);


export default router;