import { v4 as uuidv4 } from 'uuid';

const validateUser = async (userId: number, token: string): Promise<boolean> => {
    return !!(userId % 2);
};

const authUser = async (userId: number, token: string): Promise<string | false> => {
    const isUserValid = await validateUser(userId, token);
    if (isUserValid) {
        return `${userId}-${uuidv4()}`;
    }

    return false;
};

export { authUser };
