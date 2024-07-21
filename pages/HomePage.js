import { useState, useCallback, useRef, useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native"
import { Text, Icon, Button, Snackbar } from "react-native-paper"

export default () => {
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [feedingCount, setFeedingCount] = useState(0);
    const animatedValue = useRef(new Animated.Value(0)).current;
    
    const [poopDiaperCount, setPoopDiaperCount] = useState(0);
    const poopAnimatedValue = useRef(new Animated.Value(0)).current;

    const [wetDiaperCount, setWetDiaperCount] = useState(0);
    const wetAnimatedValue = useRef(new Animated.Value(0)).current;

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

    const onDismissSnackbar = () => setSnackbarVisible(false);

    const formatCount = (value) => {
        return Number.isInteger(value) ? value.toString() : value.toFixed(1);
    };


    return (
        <View style={styles.homeContainer}>
            <View style={[styles.titleContainer]}>
                <Text variant="headlineLarge" style={styles.iconContainer}>BabyBuddy</Text>
            </View>
            <View style={[styles.feedingContainer]}>
                <View style={styles.sectionTitle}>
                    <Text variant="headlineSmall" style={{ fontWeight: 800, marginRight: 5 }}>Feeding</Text>
                    <Icon
                        source="baby-bottle-outline"
                        size={35}
                    />
                </View>
                <View style={styles.feedingActionsContainer}>
                    <Button mode="contained" onPress={() => updateFeedingCount(-1)}
                        labelStyle={{ fontSize: 20, marginHorizontal: 0 }}
                        contentStyle={{ width: 50, height: 60, paddingLeft: 10 }} >
                        -1
                    </Button>
                    <Button mode="contained" onPress={() => updateFeedingCount(-0.5)}
                        labelStyle={{ fontSize: 20, marginHorizontal: 0 }}
                        contentStyle={{ width: 50, height: 60, paddingLeft: 10 }} >
                        -0.5
                    </Button>
                    <Animated.View style={animatedStyle}>
                        <Text variant="headlineMedium" style={{
                            width: 80,
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }}>
                            {formatCount(feedingCount)}
                        </Text>
                    </Animated.View>
                    <Button mode="contained" onPress={() => updateFeedingCount(0.5)}
                        labelStyle={{ fontSize: 20, marginHorizontal: 0 }}
                        contentStyle={{ width: 50, height: 60, paddingLeft: 10 }} >
                        +0.5
                    </Button>
                    <Button mode="contained" onPress={() => updateFeedingCount(1)}
                        labelStyle={{ fontSize: 20, marginHorizontal: 0 }}
                        contentStyle={{ width: 50, height: 60, paddingLeft: 10 }} >
                        +1
                    </Button>
                </View>
            </View>
            <View style={[styles.dirtyDiaperContainer]}>
                <View style={styles.sectionTitle}>
                    <Text variant="headlineSmall" style={{ fontWeight: 800, marginRight: 5 }}>Dirty Diaper</Text>
                    <Icon
                        source="emoticon-poop"
                        size={35}
                    />
                </View>
                <View style={styles.poopActionsContainer}>
                    <Button mode="contained" onPress={() => updatePoopDiaperCount(-1)}
                        labelStyle={{ fontSize: 20, marginHorizontal: 0 }}
                        contentStyle={{ width: 50, height: 60, paddingLeft: 10 }} >
                        -1
                    </Button>
                    <Animated.View style={poopAnimatedStyle}>
                        <Text variant="headlineMedium" style={{
                            width: 80,
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }}>
                            {formatCount(poopDiaperCount)}
                        </Text>
                    </Animated.View>
                    <Button mode="contained" onPress={() => updatePoopDiaperCount(1)}
                        labelStyle={{ fontSize: 20, marginHorizontal: 0 }}
                        contentStyle={{ width: 50, height: 60, paddingLeft: 10 }} >
                        +1
                    </Button>
                </View>
            </View>
            <View style={[styles.wetDiaperContainer]}>
                <View style={styles.sectionTitle}>
                    <Text variant="headlineSmall" style={{ fontWeight: 800, marginRight: 5 }}>Wet Diaper</Text>
                    <Icon
                        source="weather-rainy"
                        size={35}
                    />
                </View>
                <View style={styles.peeActionsContainer}>
                    <Button mode="contained" onPress={() => updateWetDiaperCount(-1)}
                        labelStyle={{ fontSize: 20, marginHorizontal: 0 }}
                        contentStyle={{ width: 50, height: 60, paddingLeft: 10 }} >
                        -1
                    </Button>
                    <Animated.View style={wetAnimatedStyle}>
                        <Text variant="headlineMedium" style={{
                            width: 80,
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }}>
                            {formatCount(wetDiaperCount)}
                        </Text>
                    </Animated.View>
                    <Button mode="contained" onPress={() => updateWetDiaperCount(1)}
                        labelStyle={{ fontSize: 20, marginHorizontal: 0 }}
                        contentStyle={{ width: 50, height: 60, paddingLeft: 10 }} >
                        +1
                    </Button>
                </View>
            </View>
            <View style={[styles.sleepContainer]}>
                <View style={styles.sectionTitle}>
                    <Text variant="headlineSmall" style={{ fontWeight: 800, marginRight: 5 }}>Sleep</Text>
                    <Icon
                        source="sleep"
                        size={35}
                    />
                </View>
                <View style={styles.sleepActionsContainer}>
                    <Button mode="contained" onPress={() => updateFeedingCount(-1)}
                        labelStyle={{ fontSize: 16, marginHorizontal: 0 }}
                        contentStyle={{ width: 60, height: 60, paddingLeft: 0 }} >
                        -4Hr
                    </Button>
                    <Button mode="contained" onPress={() => updateFeedingCount(-0.5)}
                        labelStyle={{ fontSize: 16, marginHorizontal: 0 }}
                        contentStyle={{ width: 80, height: 60, paddingLeft: 0 }} >
                        -30min
                    </Button>
                    <Animated.View style={animatedStyle}>
                        <Text variant="headlineMedium" style={{
                            width: 80,
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }}>
                            {formatCount(feedingCount)}
                        </Text>
                    </Animated.View>
                    <Button mode="contained" onPress={() => updateFeedingCount(0.5)}
                        labelStyle={{ fontSize: 16, marginHorizontal: 0 }}
                        contentStyle={{ width: 80, height: 60, paddingLeft: 0 }} >
                        +30min
                    </Button>
                    <Button mode="contained" onPress={() => updateFeedingCount(1)}
                        labelStyle={{ fontSize: 16, marginHorizontal: 0 }}
                        contentStyle={{ width: 60, height: 60, paddingLeft: 0 }} >
                        +4Hr
                    </Button>
                </View>
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
        </View>
    )
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        //backgroundColor: '#ccc'
    },
    titleContainer: {
        flex: 1,
        backgroundColor: '#026350',
        flexDirection: 'row',
        paddingLeft: 15
    },
    iconContainer: {
        marginTop: 80,
        fontSize: 48,
        height: 70,
        paddingTop: 20,
        fontWeight: 800,
        color: '#fff'
    },
    feedingContainer: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 15,
        //backgroundColor: '#b11'
    },
    feedingActionsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //backgroundColor: '#ccc',
    },
    dirtyDiaperContainer: {
        flex: 1,
        paddingHorizontal: 15,
        //backgroundColor: '#c11'
    },
    poopActionsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#ccc',
    },
    wetDiaperContainer: {
        flex: 1,
        paddingHorizontal: 15,
        //backgroundColor: '#f12'
    },
    peeActionsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#ccc',
    },
    sleepContainer: {
        flex: 1,
        paddingHorizontal: 15,
        //backgroundColor: '#d33'
    },
    sleepActionsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        //backgroundColor: '#ccc',
    },
    sectionTitle: {
        flex: 1,
        flexDirection: 'row'
    }
})