import { createMemoryRouter} from "react-router-dom";
import {IndexLayout} from "./index_layout/index_layout";
import {HomeScreen} from "./home/HomeScreen.tsx";
import {LoginPage} from "./Login/LoginPage.tsx";
import {ProfilePage} from "./Profile/ProfilePage.tsx";
import CreateCompanyForm from "../components/Company/CreateCompanyForm.tsx";
import {RegisterPage} from "./Register/RegisterPage.tsx";
import ChatPage from "./Chats/ChatPage.tsx";
import ResumeEditorPage from "./CreateResume/ResumePage.tsx";

export const appRouter = createMemoryRouter([
    {
        path: "/",
        element: <IndexLayout/>,
        children: [
            {
                path: "/",
                index: true,
                element: <HomeScreen/>
            },
            {
                path: "/login",
                element: <LoginPage/>
            },
            {
                path: "/register",
                element: <RegisterPage/>
            },
            {
                path: "/profile",
                element: <ProfilePage/>
            },
            {
                path: "/create/company",
                element: <CreateCompanyForm/>
            },
            {
                path: "/chats",
                element: <ChatPage/>
            },
            {
                path: "/resume/:userId",
                element: <ResumeEditorPage/>
            }
        ]
    }
])
