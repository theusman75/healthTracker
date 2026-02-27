import { useHealthStore } from '@/store/store';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { checkAbnormalReadings } from '../../utils/alertUtils';

export default function HistoryScreen() {
    const router = useRouter();
    const entries = useHealthStore((state) => state.entries);

    const sortedEntries = useMemo(() => {
        return [...entries].sort(
            (a, b) =>
                new Date(b.date).getTime() -
                new Date(a.date).getTime()
        );
    }, [entries]);

    if (sortedEntries.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text>No health history found.</Text>
            </View>
        );
    }

    return (
        <SafeAreaView>
            <Text style={styles.title}>Health Hisotry</Text>

            <FlatList
                data={sortedEntries}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.container}
                renderItem={({ item }) => {
                    const alerts = checkAbnormalReadings(
                        item.heartRate,
                        item.spo2,
                        item.temperature
                    );

                    const hasAlert = alerts.length > 0;

                    return (
                        <TouchableOpacity
                            style={[
                                styles.card,
                                hasAlert && styles.alertCard,
                            ]}
                            onPress={() =>
                                router.push(`/app/${item.id}`)
                            }
                        >
                            <Text style={styles.date}>
                                {new Date(item.date).toLocaleString()}
                            </Text>

                            <Text
                                style={
                                    item.heartRate > 120
                                        ? styles.abnormal
                                        : styles.normal
                                }
                            >
                                ❤️ HR: {item.heartRate} bpm
                            </Text>

                            <Text>
                                🫁 SpO2: {item.spo2}%
                            </Text>

                            <Text>
                                🌡 Temp: {item.temperature} °C
                            </Text>

                            {hasAlert && (
                                <Text style={styles.warning}>
                                    ⚠ Abnormal Reading
                                </Text>
                            )}
                        </TouchableOpacity>
                    );
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 16,
        marginBottom: 20,
    },
    container: {
        padding: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
    },
    alertCard: {
        borderWidth: 1,
        borderColor: 'red',
    },
    date: {
        fontSize: 12,
        color: 'gray',
        marginBottom: 6,
    },
    abnormal: {
        color: 'red',
        fontWeight: '600',
    },
    normal: {
        color: 'black',
    },
    warning: {
        marginTop: 6,
        color: 'red',
        fontWeight: '600',
    },
});