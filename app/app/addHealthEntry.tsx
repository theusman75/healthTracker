import { Formik } from 'formik';
import React from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { useHealthStore } from '@/store/store';
import { checkAbnormalReadings } from '@/utils/alertUtils';
import { healthSchema } from '@/validation/healthSchema';
import { router } from 'expo-router';

const SYMPTOMS = [
    'Headache',
    'Fatigue',
    'Dizziness',
    'Cough',
    'Chest Pain',
];

export default function AddHealthEntry() {
    const addEntry = useHealthStore((state) => state.addEntry);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Add Health Entry</Text>

            <Formik
                initialValues={{
                    heartRate: '',
                    systolic: '',
                    diastolic: '',
                    spo2: '',
                    temperature: '',
                    symptoms: [] as string[],
                    notes: '',
                }}
                validationSchema={healthSchema}
                onSubmit={(values, { resetForm }) => {
                    const alerts = checkAbnormalReadings(
                        Number(values.heartRate),
                        Number(values.spo2),
                        Number(values.temperature)
                    );

                    const newEntry = {
                        id: Date.now().toString(),
                        date: new Date().toISOString(),
                        heartRate: Number(values.heartRate),
                        systolic: Number(values.systolic),
                        diastolic: Number(values.diastolic),
                        spo2: Number(values.spo2),
                        temperature: Number(values.temperature),
                        symptoms: values.symptoms,
                        notes: values.notes,
                    };

                    addEntry(newEntry);

                    if (alerts.length > 0) {
                        Alert.alert('Health Alert', alerts.join('\n'));
                    } else {
                        Alert.alert('Success', 'Health entry saved');
                    }

                    router.back();
                }}
            >
                {({
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    setFieldValue,
                }) => (
                    <>
                        {/* Input Fields */}
                        {renderInput('Heart Rate (bpm)', 'heartRate', values, handleChange, errors, touched)}
                        {renderInput('Systolic', 'systolic', values, handleChange, errors, touched)}
                        {renderInput('Diastolic', 'diastolic', values, handleChange, errors, touched)}
                        {renderInput('SpO2 (%)', 'spo2', values, handleChange, errors, touched)}
                        {renderInput('Temperature (°C)', 'temperature', values, handleChange, errors, touched)}

                        {/* Symptoms Multi Select */}
                        <Text style={styles.label}>Symptoms</Text>
                        {SYMPTOMS.map((symptom) => {
                            const selected = values.symptoms.includes(symptom);

                            return (
                                <TouchableOpacity
                                    key={symptom}
                                    style={[
                                        styles.symptomItem,
                                        selected && styles.symptomSelected,
                                    ]}
                                    onPress={() => {
                                        if (selected) {
                                            setFieldValue(
                                                'symptoms',
                                                values.symptoms.filter((s) => s !== symptom)
                                            );
                                        } else {
                                            setFieldValue('symptoms', [
                                                ...values.symptoms,
                                                symptom,
                                            ]);
                                        }
                                    }}
                                >
                                    <Text>{symptom}</Text>
                                </TouchableOpacity>
                            );
                        })}

                        {errors.symptoms && touched.symptoms && (
                            <Text style={styles.error}>{errors.symptoms}</Text>
                        )}

                        {/* Notes */}
                        <TextInput
                            placeholder="Notes (optional)"
                            style={styles.notes}
                            multiline
                            value={values.notes}
                            onChangeText={handleChange('notes')}
                        />

                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => handleSubmit()}
                        >
                            <Text style={styles.submitText}>Save Entry</Text>
                        </TouchableOpacity>
                    </>
                )}
            </Formik>
        </ScrollView>
    );
}

const renderInput = (
    label: string,
    field: string,
    values: any,
    handleChange: any,
    errors: any,
    touched: any
) => (
    <View style={{ marginBottom: 16 }}>
        <Text style={{ marginBottom: 6 }}>{label}</Text>
        <TextInput
            style={{
                borderWidth: 1,
                borderColor:
                    errors[field] && touched[field] ? 'red' : '#ccc',
                borderRadius: 8,
                padding: 12,
            }}
            keyboardType="numeric"
            value={values[field]}
            onChangeText={handleChange(field)}
        />
        {errors[field] && touched[field] && (
            <Text style={{ color: 'red' }}>{errors[field]}</Text>
        )}
    </View>
);

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f7f9fc',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontWeight: '600',
        marginBottom: 6,
    },
    symptomItem: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 8,
    },
    symptomSelected: {
        backgroundColor: '#dbeafe',
    },
    notes: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginTop: 10,
        minHeight: 80,
        textAlignVertical: 'top',
    },
    submitButton: {
        marginTop: 20,
        backgroundColor: '#2563eb',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
    },
    submitText: {
        color: 'white',
        fontWeight: '600',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});