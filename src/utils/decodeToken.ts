import jwt from 'jsonwebtoken';

const decodeToken = (token: string): any => {
    try {
        const decoded = jwt.decode(token);
        return decoded;
    } catch (error) {
        throw new Error('Invalid token');
    }
};

export default decodeToken;
