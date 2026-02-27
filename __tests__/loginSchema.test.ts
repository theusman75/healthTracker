import { loginSchema } from '../validation/authValidation';

describe('Login Validation Schema', () => {
    it('should pass with valid email and password', async () => {
        const validData = { email: 'test@health.com', password: '123456' };
        await expect(loginSchema.validate(validData)).resolves.toBe(validData);
    });

    it('should fail for invalid email', async () => {
        const invalidData = { email: 'invalid', password: '123456' };
        await expect(loginSchema.validate(invalidData)).rejects.toThrow(
            'Please enter a valid email'
        );
    });

    it('should fail for short password', async () => {
        const invalidData = { email: 'test@health.com', password: '123' };
        await expect(loginSchema.validate(invalidData)).rejects.toThrow(
            'Minimum 6 characters required'
        );
    });

    it('should fail if fields are empty', async () => {
        const invalidData = { email: '', password: '' };

        try {
            await loginSchema.validate(invalidData, { abortEarly: false });
        } catch (err: any) {
            expect(err.errors).toContain('Email is required');
            expect(err.errors).toContain('Password is required');
        }
    });
});