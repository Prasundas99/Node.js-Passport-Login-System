/**
 * 
 * @param {{
 * id: string,
 * name: string,
 * email: string,
 * password: string
 * }} user 
 * @returns 
 */
export const userObject = (user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
    };
};