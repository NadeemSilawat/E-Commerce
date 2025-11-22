const axios = require('axios');

const testAuth = async () => {
    try {
        const registerRes = await axios.post('http://127.0.0.1:5000/api/auth', {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123'
        });
        console.log('Register Success:', registerRes.data);

        const loginRes = await axios.post('http://127.0.0.1:5000/api/auth/login', {
            email: 'test@example.com',
            password: 'password123'
        });
        console.log('Login Success:', loginRes.data);
    } catch (error) {
        console.error('Error Message:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        }
    }
};

testAuth();
