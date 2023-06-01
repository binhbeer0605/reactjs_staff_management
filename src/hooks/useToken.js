import { useState } from 'react';

function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        return tokenString;
    };

    const [token, setToken] = useState(getToken());

    const saveToken = async (userToken) => {
        if (userToken) {
            localStorage.setItem('token', userToken);
            setToken(userToken);
        } else {
            localStorage.clear();
        }
    };
    return { setToken: saveToken, token };
}

export default useToken;
