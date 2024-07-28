import { useState, useCallback, useRef, useEffect } from "react";
import { View, StyleSheet, Animated, SafeAreaView, StatusBar } from "react-native";
import { Text, Icon, Button, Snackbar, useTheme, Surface, Card } from "react-native-paper";

export default () => {
    const { colors } = useTheme();

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [feedingCount, setFeedingCount] = useState(0);
    const animatedValue = useRef(new Animated.Value(0)).current;

    const [poopDiaperCount, setPoopDiaperCount] = useState(0);
    const poopAnimatedValue = useRef(new Animated.Value(0)).current;

    const [wetDiaperCount, setWetDiaperCount] = useState(0);
    const wetAnimatedValue = useRef(new Animated.Value(0)).current;

    const [sleepCount, setSleepCount] = useState(0);
    const sleepAnimatedValue = useRef(new Animated.Value(0)).current;

    const [feedingUnit, setFeedingUnit] = useState("Oz");

    const updateFeedingCount = useCallback((step) => {
        setFeedingCount(prevCount => {
            const newCount = prevCount + step;
            if (newCount < 0) {
                setSnackbarMessage('Cannot go below 0');
                setSnackbarVisible(true);
                return prevCount;
            } else if (newCount > 100) {
                setSnackbarMessage('Cannot exceed 100');
                setSnackbarVisible(true);
                return prevCount;
            } else {
                return newCount;
            }
        });
    }, []);

    const updatePoopDiaperCount = useCallback((step) => {
        setPoopDiaperCount(prevCount => {
            const newCount = prevCount + step;
            if (newCount < 0) {
                setSnackbarMessage('Cannot go below 0');
                setSnackbarVisible(true);
                return prevCount;
            } else if (newCount > 30) {
                setSnackbarMessage('Cannot exceed 30');
                setSnackbarVisible(true);
                return prevCount;
            } else {
                return newCount;
            }
        });
    }, []);

    const updateWetDiaperCount = useCallback((step) => {
        setWetDiaperCount(prevCount => {
            const newCount = prevCount + step;
            if (newCount < 0) {
                setSnackbarMessage('Cannot go below 0');
                setSnackbarVisible(true);
                return prevCount;
            } else if (newCount > 30) {
                setSnackbarMessage('Cannot exceed 30');
                setSnackbarVisible(true);
                return prevCount;
            } else {
                return newCount;
            }
        });
    }, []);

    const updateSleepCount = useCallback((step) => {
        setSleepCount(prevCount => {
            const newCount = prevCount + step;
            if (newCount < 0) {
                setSnackbarMessage('Cannot go below 0');
                setSnackbarVisible(true);
                return prevCount;
            } else if (newCount > 24) {
                setSnackbarMessage('Cannot exceed 24');
                setSnackbarVisible(true);
                return prevCount;
            } else {
                return newCount;
            }
        });
    }, []);

    useEffect(() => {
        Animated.sequence([
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 75,
                useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 75,
                useNativeDriver: true,
            }),
        ]).start();
    }, [feedingCount]);

    const interpolatedRotateAnimation = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const animatedStyle = {
        transform: [
            {
                rotateX: interpolatedRotateAnimation,
            },
        ],
    };

    useEffect(() => {
        Animated.sequence([
            Animated.timing(poopAnimatedValue, {
                toValue: 1,
                duration: 75,
                useNativeDriver: true,
            }),
            Animated.timing(poopAnimatedValue, {
                toValue: 0,
                duration: 75,
                useNativeDriver: true,
            }),
        ]).start();
    }, [poopDiaperCount]);

    const poopRotateAnimation = poopAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const poopAnimatedStyle = {
        transform: [
            {
                rotateX: poopRotateAnimation,
            },
        ],
    };

    useEffect(() => {
        Animated.sequence([
            Animated.timing(wetAnimatedValue, {
                toValue: 1,
                duration: 75,
                useNativeDriver: true,
            }),
            Animated.timing(wetAnimatedValue, {
                toValue: 0,
                duration: 75,
                useNativeDriver: true,
            }),
        ]).start();
    }, [wetDiaperCount]);

    const wetRotateAnimation = wetAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const wetAnimatedStyle = {
        transform: [
            {
                rotateX: wetRotateAnimation,
            },
        ],
    };

    useEffect(() => {
        Animated.sequence([
            Animated.timing(sleepAnimatedValue, {
                toValue: 1,
                duration: 75,
                useNativeDriver: true,
            }),
            Animated.timing(sleepAnimatedValue, {
                toValue: 0,
                duration: 75,
                useNativeDriver: true,
            }),
        ]).start();
    }, [sleepCount]);

    const sleepRotateAnimation = sleepAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const sleepAnimatedStyle = {
        transform: [
            {
                rotateX: sleepRotateAnimation,
            },
        ],
    };

    const onDismissSnackbar = () => setSnackbarVisible(false);

    const formatCount = (value) => {
        return Number.isInteger(value) ? value.toString() : value.toFixed(1);
    };

    const handleSync = () => {
        console.log("handle sync");
        setFeedingCount(0);
        setPoopDiaperCount(0);
        setWetDiaperCount(0);
        setSleepCount(0);
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
            <Surface style={[styles.header, { backgroundColor: colors.primary }]}>
                <Text variant="headlineLarge" style={styles.headerText}>BabyBuddy</Text>
            </Surface>
            <View style={styles.content}>
                <Card style={styles.card}>
                    <Card.Title
                        title="Feeding"
                        left={(props) => <Icon {...props} source="baby-bottle-outline" size={30} />}
                    />
                    <Card.Content>
                        <View style={styles.actionsContainer}>
                            <Button mode="contained" onPress={() => updateFeedingCount(-1)}>-1</Button>
                            <Button mode="contained" onPress={() => updateFeedingCount(-0.5)}>-0.5</Button>
                            <Animated.View style={[styles.countContainer, animatedStyle]}>
                                <Text variant="headlineMedium" style={styles.countText}>
                                    {formatCount(feedingCount)}
                                </Text>
                                <Text style={styles.unitText}>{feedingUnit}</Text>
                            </Animated.View>
                            <Button mode="contained" onPress={() => updateFeedingCount(0.5)}>+0.5</Button>
                            <Button mode="contained" onPress={() => updateFeedingCount(1)}>+1</Button>
                        </View>
                    </Card.Content>
                </Card>

                <Card style={styles.card}>
                    <Card.Title
                        title="Dirty Diaper"
                        left={(props) => <Icon {...props} source="emoticon-poop-outline" size={30} />}
                    />
                    <Card.Content>
                        <View style={styles.actionsContainer}>
                            <Button mode="contained" onPress={() => updatePoopDiaperCount(-1)}>-1</Button>
                            <Animated.View style={[styles.countContainer, poopAnimatedStyle]}>
                                <Text variant="headlineMedium" style={styles.countText}>
                                    {formatCount(poopDiaperCount)}
                                </Text>
                            </Animated.View>
                            <Button mode="contained" onPress={() => updatePoopDiaperCount(1)}>+1</Button>
                        </View>
                    </Card.Content>
                </Card>

                <Card style={styles.card}>
                    <Card.Title
                        title="Wet Diaper"
                        left={(props) => <Icon {...props} source="water-outline" size={30} />}
                    />
                    <Card.Content>
                        <View style={styles.actionsContainer}>
                            <Button mode="contained" onPress={() => updateWetDiaperCount(-1)}>-1</Button>
                            <Animated.View style={[styles.countContainer, wetAnimatedStyle]}>
                                <Text variant="headlineMedium" style={styles.countText}>
                                    {formatCount(wetDiaperCount)}
                                </Text>
                            </Animated.View>
                            <Button mode="contained" onPress={() => updateWetDiaperCount(1)}>+1</Button>
                        </View>
                    </Card.Content>
                </Card>

                <Card style={styles.card}>
                    <Card.Title
                        title="Sleep"
                        left={(props) => <Icon {...props} source="sleep" size={30} />}
                    />
                    <Card.Content>
                        <View style={styles.actionsContainer}>
                            <Button mode="contained" onPress={() => updateSleepCount(-4)} labelStyle={{ marginHorizontal: 2 }}>-4Hr</Button>
                            <Button mode="contained" onPress={() => updateSleepCount(-0.5)} labelStyle={{ marginHorizontal: 2 }}>-30min</Button>
                            <Animated.View style={[styles.countContainer, sleepAnimatedStyle]}>
                                <Text variant="headlineMedium" style={styles.countText}>
                                    {formatCount(sleepCount)}
                                </Text>
                            </Animated.View>
                            <Button mode="contained" onPress={() => updateSleepCount(0.5)} labelStyle={{ marginHorizontal: 2 }}>+30min</Button>
                            <Button mode="contained" onPress={() => updateSleepCount(4)} labelStyle={{ marginHorizontal: 2 }}>+4Hr</Button>
                        </View>
                    </Card.Content>
                </Card>

                <Button 
                    mode="contained" 
                    icon="database-sync-outline" 
                    onPress={handleSync} 
                    style={styles.syncButton}
                >
                    Sync
                </Button>
            </View>
            <Snackbar
                visible={snackbarVisible}
                onDismiss={onDismissSnackbar}
                action={{
                    label: 'Dismiss',
                    onPress: onDismissSnackbar,
                }}
                duration={3000}>
                {snackbarMessage}
            </Snackbar>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        elevation: 4,
    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    card: {
        marginBottom: 16,
        elevation: 2,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    countContainer: {
        alignItems: 'center',
    },
    countText: {
        fontWeight: 'bold',
    },
    unitText: {
        fontSize: 12,
        opacity: 0.7,
    },
    syncButton: {
        marginTop: 2
    },
    sleepButtonContent: {
        height: 30,  // Reduce the height of the button
        paddingVertical: 0,  // Remove vertical padding
    },
    sleepButtonLabel: {
        fontSize: 12,  // Reduce font size if needed
        marginHorizontal: 4,  // Reduce horizontal margin
    },
});