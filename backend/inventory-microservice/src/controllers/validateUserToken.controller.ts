export {}

// Firebase 
const { getAuth, DecodedIdToken  } = require('firebase-admin/auth');

const validateUserToken = async(userToken: string) => {
    // Extract user token
    const auth = getAuth();

    // Verify token 
    try {
        const decodedToken = await auth.verifyIdToken(userToken)
        return decodedToken.uid
    } catch (error) {
        return error
    }
}

module.exports = { validateUserToken }