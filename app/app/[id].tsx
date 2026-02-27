import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHealthStore } from '../../store/store';
import { checkAbnormalReadings } from '../../utils/alertUtils';

export default function EntryDetailsScreen() {
    const { id } = useLocalSearchParams();
    const entry = useHealthStore((state) =>
        state.entries.find((e) => e.id === id)
    );

    if (!entry) {
        return (
            <View style={styles.center}>
                <Text>Entry not found</Text>
            </View>
        );
    }

    const alerts = checkAbnormalReadings(
        entry.heartRate,
        entry.spo2,
        entry.temperature
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Entry Details
            </Text>

            <Text>Date: {new Date(entry.date).toLocaleString()}</Text>
            <Text>Heart Rate: {entry.heartRate} bpm</Text>
            <Text>
                Blood Pressure: {entry.systolic}/{entry.diastolic}
            </Text>
            <Text>SpO2: {entry.spo2}%</Text>
            <Text>Temperature: {entry.temperature} °C</Text>

            <Text style={styles.section}>Symptoms:</Text>
            {entry.symptoms.map((s) => (
                <Text key={s}>• {s}</Text>
            ))}

            {entry.notes ? (
                <>
                    <Text style={styles.section}>Notes:</Text>
                    <Text>{entry.notes}</Text>
                </>
            ) : null}

            {alerts.length > 0 && (
                <View style={styles.alertBox}>
                    <Text style={styles.alertText}>
                        ⚠ Abnormal Readings Detected
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    section: {
        marginTop: 15,
        fontWeight: '600',
    },
    alertBox: {
        marginTop: 20,
        padding: 12,
        backgroundColor: '#fee2e2',
        borderRadius: 8,
    },
    alertText: {
        color: 'red',
        fontWeight: '600',
    },
});