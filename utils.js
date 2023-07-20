/**
 *
 * @param {string} email Searched email
 * @param {string} password Searched password
 * @param {array} users Array of user objects
 */
const getUser = (email, password, users) => {
    const currentUser = users.find(user => user.email === email && user.password === password)
    // if(!currentUser) return null
    return currentUser
}

module.exports = { getUser }