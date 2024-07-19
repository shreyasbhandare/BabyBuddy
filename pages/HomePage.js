import { View, StyleSheet } from "react-native"
import { Text, Icon, Button } from "react-native-paper"

export default () => {
    return (
        <View style={styles.homeContainer}>
            <View style={[styles.titleContainer]}>
                <Text variant="headlineLarge" style={styles.iconContainer}>BabyBuddy</Text>
            </View>
            <View style={[styles.feedingContainer]}>
                <View style={styles.sectionTitle}>
                    <Text variant="headlineMedium" style={{ fontWeight: 800, marginRight: 5 }}>Feeding</Text>
                    <Icon
                        source="baby-bottle-outline"
                        size={35}
                    />
                </View>
            </View>
            <View style={[styles.dirtyDiaperContainer]}>
                <View style={styles.sectionTitle}>
                    <Text variant="headlineMedium" style={{ fontWeight: 800, marginRight: 5 }}>Dirty Diaper</Text>
                    <Icon
                        source="emoticon-poop"
                        size={35}
                    />
                </View>
            </View>
            <View style={[styles.wetDiaperContainer]}>
                <View style={styles.sectionTitle}>
                    <Text variant="headlineMedium" style={{ fontWeight: 800, marginRight: 5 }}>Wet Diaper</Text>
                    <Icon
                        source="weather-rainy"
                        size={35}
                    />
                </View>
            </View>
            <View style={[styles.sleepContainer]}>
                <View style={styles.sectionTitle}>
                    <Text variant="headlineMedium" style={{ fontWeight: 800, marginRight: 5 }}>Sleep</Text>
                    <Icon
                        source="sleep"
                        size={35}
                    />
                </View>
            </View>
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
        paddingLeft: 15
        //backgroundColor: '#b11'
    },
    dirtyDiaperContainer: {
        flex: 1,
        paddingLeft: 15
        //backgroundColor: '#c11'
    },
    wetDiaperContainer: {
        flex: 1,
        paddingLeft: 15
        //backgroundColor: '#f12'
    },
    sleepContainer: {
        flex: 1,
        paddingLeft: 15
        //backgroundColor: '#d33'
    },
    sectionTitle: {
        flex: 1,
        flexDirection: 'row'
    }
})