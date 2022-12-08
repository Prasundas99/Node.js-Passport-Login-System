import { RouteNames } from "../config/config";

/**
 * 
 * @param {{
 * name: string,
 * email: string,
 * password: string
 * }} body 
 * @returns 
 */
export const registerInputDto = (body) => {
    const { name, email, password } = body;
    return {
        Route : RouteNames.REGISTER,
        method: "POST",
        name,
        email,
        password,
    };
}

/**
 * @param {{
 * email: string,
 * password: string
 * }} body 
 * @returns 
 */
export const loginInputDto = (body) => {
    const { email, password } = body;
    return {
        Route : RouteNames.LOGIN,
        method: "POST",
        email,
        password,
    };
}

