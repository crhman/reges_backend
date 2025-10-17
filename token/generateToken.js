import jwb from 'jsonwebtoken';

const generateToken = (id) => {
    return jwb.sign({ id }, "secretKey", { expiresIn: '1d' });

};

export default generateToken;
