import { useAuthStore, useHealthStore } from '@/store/store';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Dashboard() {
    const router = useRouter();
    const { user } = useAuthStore();
    const entries = useHealthStore((state) => state.entries);

    const todayEntry = useMemo(() => {
        const today = new Date().toISOString().split('T')[0];
        return entries.find((e) => e.date.startsWith(today));
    }, [entries]);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <Text style={styles.greeting}>
                Welcome, {user?.name}
            </Text>

            {/* Today's Summary */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Today's Health Summary</Text>

                {todayEntry ? (
                    <>
                        <Text>❤️ Heart Rate: {todayEntry.heartRate} bpm</Text>
                        <Text>
                            🩸 Blood Pressure: {todayEntry.systolic}/
                            {todayEntry.diastolic}
                        </Text>
                        <Text>🫁 SpO2: {todayEntry.spo2}%</Text>
                        <Text>🌡 Temperature: {todayEntry.temperature} °C</Text>
                    </>
                ) : (
                    <Text style={styles.noData}>
                        No health data logged today.
                    </Text>
                )}
            </View>

            {/* Quick Actions */}
            <View style={styles.actionsContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push('/app/addHealthEntry')}
                >
                    <Text style={styles.buttonText}>Add Health Entry</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.secondaryButton]}
                    onPress={() => router.push('/app/healthHistory')}
                >
                    <Text style={styles.buttonText}>View History</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#f7f9fc',
    },
    greeting: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        marginBottom: 30,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
    },
    noData: {
        color: 'gray',
    },
    actionsContainer: {
        gap: 16,
    },
    button: {
        backgroundColor: '#2563eb',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
    },
    secondaryButton: {
        backgroundColor: '#10b981',
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
    },
});