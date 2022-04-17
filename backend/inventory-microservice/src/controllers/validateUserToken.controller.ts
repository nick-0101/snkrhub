export {}

// Firebase 
const { getAuth } = require('firebase-admin/auth');

const validateUserToken = async(userToken: string) => {
    // Extract user token
    const auth = getAuth();

    // Verify token 
    try {
        const decodedToken = await auth.verifyIdToken(userToken)
        return decodedToken.uid
    } catch (error: any) {
        return error.errorInfo
    }
}

module.exports = { validateUserToken }