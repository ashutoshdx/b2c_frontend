import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import AppLayout from './components/AppLayout';
import EmailAccounts from './components/EmailAccounts';
import WamupTemplates from './components/WarmupTemplates'
import Subscriptions from './components/Subscriptions';
import Register from './components/Register';

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <Register />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/dashboard',
        element: <AppLayout />,
        children: [
            {
                path: 'email-accounts',
                element: <EmailAccounts />
            },
            {
                path: 'warmup-templates',
                element: <WamupTemplates />
            },
            {
                path: 'subscriptions',
                element: <Subscriptions />
            }
        ]
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />)