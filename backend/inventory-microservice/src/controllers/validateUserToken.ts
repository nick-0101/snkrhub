export {}

// Firebase 
const { getAuth } = require('firebase-admin/auth');

const validateUserToken = async() => {
    // Extract user token
    const auth = getAuth();
}

module.exports = { validateUserToken }