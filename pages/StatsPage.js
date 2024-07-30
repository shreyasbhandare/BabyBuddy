import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { SegmentedButtons, Card, Text, useTheme, DataTable, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

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
        { title: 'Feeding', icon: 'baby-bottle-outline', value: 6 },
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
        <Surface style={styles.card} elevation={4} key={title}>
            <View style={[styles.cardContent, { backgroundColor: theme.colors.primary }]}>
                <MaterialCommunityIcons name={icon} size={32} color="white" />
                <Text style={styles.cardTitle}>{title}</Text>
                <View style={styles.valueContainer}>
                    <Text style={styles.cardValue}>
                        {title === 'Sleep' ? value.replace('h', '') : value}
                    </Text>
                    {(title === 'Feeding' || title === 'Sleep') && (
                        <Text style={styles.unitText}>
                            {title === 'Feeding' ? feedingUnit : 'h'}
                        </Text>
                    )}
                </View>
            </View>
        </Surface>
    );

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={[theme.colors.background, theme.colors.surface]}
                style={styles.gradient}
            >
                <View style={styles.content}>
                    <Text style={styles.header}>Baby Stats</Text>
                    <View style={styles.buttonsContainer}>
                        <SegmentedButtons
                            value={timeRange}
                            onValueChange={setTimeRange}
                            buttons={timeRangeButtons}
                            style={styles.segmentedButtons}
                            theme={{ roundness: 10 }}
                        />
                        <SegmentedButtons
                            value={viewType}
                            onValueChange={setViewType}
                            buttons={viewTypeButtons}
                            style={styles.segmentedButtons}
                            theme={{ roundness: 10 }}
                        />
                    </View>
                    {viewType === 'overview' ? (
                        <View style={styles.cardsContainer}>
                            {statsData.map(renderStatsCard)}
                        </View>
                    ) : (
                        <ScrollView style={styles.tableContainer}>
                            <DataTable>
                                <DataTable.Header style={styles.tableHeader}>
                                    <DataTable.Title textStyle={styles.tableHeaderText}>Date/Time</DataTable.Title>
                                    <DataTable.Title textStyle={styles.tableHeaderText}>Activity</DataTable.Title>
                                    <DataTable.Title numeric textStyle={styles.tableHeaderText}>Count</DataTable.Title>
                                </DataTable.Header>

                                {tableData.map((item, index) => (
                                    <DataTable.Row key={index} style={item.isCumulative ? styles.cumulativeRow : styles.tableRow}>
                                        <DataTable.Cell textStyle={styles.tableCell}>{item.date} {item.time}</DataTable.Cell>
                                        <DataTable.Cell textStyle={styles.tableCell}>{item.activity}</DataTable.Cell>
                                        <DataTable.Cell numeric textStyle={styles.tableCell}>{item.count}</DataTable.Cell>
                                    </DataTable.Row>
                                ))}
                            </DataTable>
                        </ScrollView>
                    )}
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
        textAlign: 'center',
    },
    buttonsContainer: {
        marginBottom: 24,
    },
    segmentedButtons: {
        marginBottom: 12,
    },
    cardsContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: width / 2 - 24,
        aspectRatio: 1,
        marginBottom: 16,
        borderRadius: 16,
        overflow: 'hidden',
    },
    cardContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        color: 'white',
        marginBottom: 8,
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'center',
    },
    cardValue: {
        fontSize: 42,
        fontWeight: 'bold',
        color: 'white',
    },
    unitText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        marginLeft: 4,
    },
    tableContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
    },
    tableHeader: {
        backgroundColor: '#f0f0f0',
    },
    tableHeaderText: {
        fontWeight: 'bold',
        color: '#333',
    },
    tableRow: {
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    cumulativeRow: {
        backgroundColor: '#e6f7ff',
        borderBottomWidth: 1,
        borderBottomColor: '#b3e0ff',
    },
    tableCell: {
        color: '#333',
    },
});

export default StatsPage;