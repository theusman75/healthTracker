import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    Button,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import FormInput from '../../components/FormInput';
import { useAuthStore } from '../../store/store';
import { loginSchema } from '../../validation/authValidation';

const LoginScreen = () => {
    const { login, loading, error } = useAuthStore();
    const { user } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.replace('/app/dashboard');
        }
    }, [user]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Health Tracker Login</Text>

            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginSchema}
                onSubmit={(values) => login(values.email, values.password)}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                }) => (
                    <>
                        <FormInput
                            label="Email"
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            error={errors.email}
                            touched={touched.email}
                        />

                        <FormInput
                            label="Password"
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            error={errors.password}
                            touched={touched.password}
                            secureTextEntry
                        />

                        {error && <Text style={styles.errorText}>{error}</Text>}

                        {loading ? (
                            <ActivityIndicator size="large" />
                        ) : (
                            <Button title="Login" onPress={() => handleSubmit()} />
                        )}
                    </>
                )}
            </Formik>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 32,
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 12,
        textAlign: 'center',
    },
});