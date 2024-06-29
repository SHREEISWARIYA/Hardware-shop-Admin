import Cookies from "js-cookie";
import { OTP_COOKIE, AUTH_COOKIE } from "../config/config";

interface Logout {
    (): void
}
interface Login {
    (): string | undefined
}
interface getOTP {
    (): number | undefined
}

export const handleLogout: Logout = () => {
    Cookies.remove(AUTH_COOKIE)
    window.location.reload();
}

export const handleLogin: Login = () => {
    const statusCookie = Cookies.get(AUTH_COOKIE)
    if (!statusCookie && window.location.pathname !== '/signin') {
        return window.location.href = '/signin';
    }
    if (statusCookie && window.location.pathname === '/signin') {
        return window.location.href = '/';
    }
}

export const handleGetOTP: getOTP = () => {
    return Number(Cookies.get(OTP_COOKIE))
}