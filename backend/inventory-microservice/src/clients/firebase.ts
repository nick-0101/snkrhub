export {}

const { initializeApp, cert } = require('firebase-admin/app');

// Init firebase
const connectFirebase = async() => {
    const firebaseApp = initializeApp({
        credential: cert({ 
            "type": process.env.FIREBASE_TYPE,
            "project_id": process.env.FIREBASE_PROJECT_ID,
            "private_key_id": process.env.FIREBASE_PRVIATE_KEY_ID,
            "private_key": process.env.FIREBASE_PRIVATE_KEY,
            "client_email": process.env.FIREBASE_CLIENT_EMAIL,
            "client_id": process.env.FIREBASE_CLIENT_ID,
            "auth_uri": process.env.FIREBASE_AUTH_URI,
            "token_uri": process.env.FIREBASE_TOKEN_URI,
            "auth_provider_x509_cert_url": process.env.FIREBASEAUTH_PROVIDER,
            "client_x509_cert_url": process.env.FIREBASE_CLIENT_CERT
        }),
    });
    return firebaseApp
}

module.exports = connectFirebase;