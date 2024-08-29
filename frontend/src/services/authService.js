const BASE_URL = 'http://localhost:3001/api';

export const registerUser = async (nome, email, senha) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, senha }),
    });
    return response.json();
};

export const loginUser = async (email, senha) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
    });
    return response;
};

export const fetchUserName = async (email) => {
    const response = await fetch(`${BASE_URL}/user/nome?email=${email}`);
    return response.json();
};
