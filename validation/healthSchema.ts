import * as Yup from 'yup';

export const healthSchema = Yup.object().shape({
    heartRate: Yup.number()
        .typeError('Heart rate must be a number')
        .min(40, 'Heart rate must be at least 40 bpm')
        .max(200, 'Heart rate cannot exceed 200 bpm')
        .required('Heart rate is required'),

    systolic: Yup.number()
        .typeError('Systolic must be a number')
        .required('Systolic pressure is required'),

    diastolic: Yup.number()
        .typeError('Diastolic must be a number')
        .required('Diastolic pressure is required'),

    spo2: Yup.number()
        .typeError('SpO2 must be a number')
        .min(70, 'SpO2 must be at least 70%')
        .max(100, 'SpO2 cannot exceed 100%')
        .required('SpO2 is required'),

    temperature: Yup.number()
        .typeError('Temperature must be a number')
        .min(34, 'Temperature too low')
        .max(42, 'Temperature too high')
        .required('Temperature is required'),

    symptoms: Yup.array()
        .min(1, 'Select at least one symptom'),

    notes: Yup.string().optional(),
});