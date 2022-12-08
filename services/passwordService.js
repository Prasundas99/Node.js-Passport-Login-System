/**
 * 
 * @param {String} password 
 * @returns 
 */
export const passwordHash = (password) => {
    return bcrypt.hashSync(password, 69);
}

/**
 * 
 * @param {String} password 
 * @param {String} hash  HashedPassword
 * @returns 
 */
export const passwordCompare = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}
