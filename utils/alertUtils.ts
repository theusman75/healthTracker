export const checkAbnormalReadings = (
    heartRate: number,
    spo2: number,
    temperature: number
) => {
    const alerts: string[] = [];

    if (heartRate > 120) {
        alerts.push('High heart rate detected');
    }

    if (spo2 < 90) {
        alerts.push('Low oxygen level detected');
    }

    if (temperature > 39) {
        alerts.push('High temperature detected');
    }

    return alerts;
};