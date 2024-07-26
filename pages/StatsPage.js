import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { SegmentedButtons, Card, Text, useTheme, DataTable } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const StatsPage = () => {
    const [timeRange, setTimeRange] = useState('today');
    const [viewType, setViewType] = useState('overview');
    const theme = useTheme();
    const [tableData, setTableData] = useState([]);
    const [feedingUnit, setFeedingUnit] = useState('Oz');

    const timeRangeButtons = [
        { value: 'today', label: 'Today' },
        { value: 'yesterday', label: 'Yesterday' },
        { value: 'last7days', label: '7 days' },
        { value: 'last30days', label: '30 days' },
    ];

    const viewTypeButtons = [
        { value: 'overview', label: 'Overview', icon: 'chart-box-outline' },
        { value: 'details', label: 'Details', icon: 'format-list-bulleted' },
    ];

    const statsData = [
        { title: 'Feedings', icon: 'baby-bottle-outline', value: 6 },
        { title: 'Wet Diapers', icon: 'water-outline', value: 8 },
        { title: 'Dirty Diapers', icon: 'emoticon-poop-outline', value: 4 },
        { title: 'Sleep', icon: 'sleep', value: '14h' },
    ];

    useEffect(() => {
        // Simulated data - replace this with your actual data fetching logic
        const generateData = () => {
            const activities = ['Feeding', 'Wet Diaper', 'Dirty Diaper', 'Sleep'];
            const data = [];
            const now = new Date();
            const days = timeRange === 'today' ? 1 :
                timeRange === 'yesterday' ? 1 :
                    timeRange === 'last7days' ? 7 : 30;

            for (let i = 0; i < days; i++) {
                const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
                const dateString = date.toLocaleDateString();
                const dailyData = [];

                activities.forEach(activity => {
                    const activityCount = Math.floor(Math.random() * 5) + 1; // 1 to 5 occurrences per activity
                    for (let j = 0; j < activityCount; j++) {
                        const time = new Date(date.getTime() + Math.random() * 24 * 60 * 60 * 1000);
                        dailyData.push({
                            date: dateString,
                            time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            activity,
                            count: activity === 'Sleep' ? Math.floor(Math.random() * 3) + 1 + 'h' : 1
                        });
                    }
                });

                // Add cumulative rows for each activity
                activities.forEach(activity => {
                    const activityData = dailyData.filter(item => item.activity === activity);
                    const cumulativeCount = activity === 'Sleep'
                        ? activityData.reduce((sum, item) => sum + parseInt(item.count), 0) + 'h'
                        : activityData.length;
                    data.push({
                        date: dateString,
                        time: '',
                        activity: `Total ${activity}`,
                        count: cumulativeCount,
                        isCumulative: true
                    });
                });

                // Add individual activity rows
                data.push(...dailyData);
            }

            return data.sort((a, b) => {
                if (a.date !== b.date) return new Date(b.date) - new Date(a.date);
                if (a.isCumulative && !b.isCumulative) return -1;
                if (!a.isCumulative && b.isCumulative) return 1;
                return new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time);
            });
        };

        setTableData(generateData());
    }, [timeRange]);

    const renderStatsCard = ({ title, icon, value }) => (
        <Card style={styles.card} key={title}>
            <Card.Content style={styles.cardContent}>
                <MaterialCommunityIcons name={icon} size={24} color={theme.colors.primary} />
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardValue}>{value}</Text>
            </Card.Content>
        </Card>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.buttonsContainer}>
                    <SegmentedButtons
                        value={timeRange}
                        onValueChange={setTimeRange}
                        buttons={timeRangeButtons}
                        style={styles.segmentedButtons}
                    />
                    <SegmentedButtons
                        value={viewType}
                        onValueChange={setViewType}
                        buttons={viewTypeButtons}
                        style={styles.segmentedButtons}
                    />
                </View>
                {viewType === 'overview' ? (
                    <View style={styles.cardsContainer}>
                        {statsData.map(renderStatsCard)}
                    </View>
                ) : (
                    <ScrollView>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Date/Time</DataTable.Title>
                                <DataTable.Title>Activity</DataTable.Title>
                                <DataTable.Title numeric>Count</DataTable.Title>
                            </DataTable.Header>

                            {tableData.map((item, index) => (
                                <DataTable.Row key={index} style={item.isCumulative ? styles.cumulativeRow : null}>
                                    <DataTable.Cell>{item.date} {item.time}</DataTable.Cell>
                                    <DataTable.Cell>{item.activity}</DataTable.Cell>
                                    <DataTable.Cell numeric>{item.count}</DataTable.Cell>
                                </DataTable.Row>
                            ))}
                        </DataTable>
                    </ScrollView>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 64
    },
    content: {
        flex: 1,
        padding: 16,
    },
    buttonsContainer: {
        marginBottom: 16,
    },
    segmentedButtons: {
        marginBottom: 16,
    },
    cardsContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        height: '48%',
        marginBottom: 16,
        elevation: 4,
        backgroundColor: 'white',
    },
    cardContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 16,
    },
    cardTitle: {
        fontSize: 14,
        textAlign: 'center',
        color: 'black',
    },
    cardValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    cumulativeRow: {
        backgroundColor: '#e6f7ff',
    },
});

export default StatsPage;