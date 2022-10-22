import { CHAT_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from './utils/consts';
import Login from './components/Login';
import Chat from './components/Chat';
import Register from './components/Register';

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login,
    },
    {
        path: REGISTER_ROUTE,
        Component: Register,
    },
];

export const privateRoutes = [
    {
        path: CHAT_ROUTE,
        Component: Chat,
    }
];