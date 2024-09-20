import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const getUsers = async () => {
    const response = await axios.get(`${API_URL}/users/`);
    return response.data;
};

export const getChatHistory = async (senderId: number, receiverId: number) => {
    const response = await axios.get(`${API_URL}/chats/${receiverId}?sender_id=${senderId}`);
    return response.data;
};
