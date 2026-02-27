export const mockLogin = async (
    email: string,
    password: string
): Promise<{ name: string; email: string }> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Mock credentials
            if (email === 'test@health.com' && password === '123456') {
                resolve({
                    name: 'John Doe',
                    email,
                });
            } else {
                reject(new Error('Invalid email or password'));
            }
        }, 1500);
    });
};