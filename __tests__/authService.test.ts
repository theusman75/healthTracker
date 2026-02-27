import { mockLogin } from '../services/authService';

describe('mockLogin Service', () => {
    it('resolves with user for correct credentials', async () => {
        const user = await mockLogin('test@health.com', '123456');
        expect(user).toEqual({
            name: 'John Doe',
            email: 'test@health.com',
        });
    });

    it('rejects with error for wrong credentials', async () => {
        await expect(mockLogin('wrong@user.com', 'password')).rejects.toThrow(
            'Invalid email or password'
        );
    });
});