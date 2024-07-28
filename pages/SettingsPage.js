import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import {
    TextInput,
    Switch,
    Button,
    Text,
    RadioButton,
    IconButton,
    useTheme,
    Divider,
    Surface,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const SettingsPage = () => {
    const theme = useTheme();
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [isFormulaFed, setIsFormulaFed] = useState(false);
    const [formulaBrand, setFormulaBrand] = useState('');
    const [feedingUnit, setFeedingUnit] = useState('oz');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleSave = () => {
        setIsEditing(false);
        // Here you would typically save the state to some persistent storage
        console.log('Saving settings:', { firstName, lastName, birthDate, isFormulaFed, formulaBrand, feedingUnit });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || birthDate;
        setShowDatePicker(false);
        setBirthDate(currentDate);
    };

    const formatDate = (date) => {
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ScrollView>
                <Surface style={styles.surface}>
                    <Text variant="titleLarge" style={styles.sectionTitle}>Personal Information</Text>
                    <TextInput
                        label="First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                        disabled={!isEditing}
                        style={styles.input}
                        mode="outlined"
                        outlineStyle={{ borderRadius: 10 }}
                    />
                    <TextInput
                        label="Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                        disabled={!isEditing}
                        style={styles.input}
                        mode="outlined"
                        outlineStyle={{ borderRadius: 10 }}
                    />
                    <View style={styles.dateContainer}>
                        <Text variant="bodyLarge">Birth Date:</Text>
                        <Text variant="bodyLarge" style={styles.dateText}>{formatDate(birthDate)}</Text>
                        {isEditing && (
                            <IconButton
                                icon="calendar"
                                size={24}
                                onPress={() => setShowDatePicker(true)}
                                style={styles.calendarButton}
                            />
                        )}
                    </View>
                    {showDatePicker && (
                        <DateTimePicker
                            value={birthDate}
                            mode="date"
                            display="default"
                            onChange={onDateChange}
                        />
                    )}
                </Surface>

                <Surface style={styles.surface}>
                    <Text variant="titleLarge" style={styles.sectionTitle}>Feeding Preferences</Text>
                    <View style={styles.switchContainer}>
                        <Text variant="bodyLarge">Formula Fed?</Text>
                        <Switch
                            value={isFormulaFed}
                            onValueChange={setIsFormulaFed}
                            disabled={!isEditing}
                        />
                    </View>
                    {isFormulaFed && (
                        <TextInput
                            label="Formula Brand/Name"
                            value={formulaBrand}
                            onChangeText={setFormulaBrand}
                            disabled={!isEditing}
                            style={styles.input}
                            mode="outlined"
                            outlineStyle={{ borderRadius: 10 }}
                        />
                    )}
                    <Text variant="bodyLarge" style={styles.feedingUnitTitle}>Feeding Unit</Text>
                    <RadioButton.Group onValueChange={value => setFeedingUnit(value)} value={feedingUnit}>
                        <View style={styles.radioContainer}>
                            <RadioButton.Item label="oz" value="oz" disabled={!isEditing} />
                            <RadioButton.Item label="ml" value="ml" disabled={!isEditing} />
                        </View>
                    </RadioButton.Group>
                </Surface>

                <View style={styles.buttonContainer}>
                    {isEditing ? (
                        <Button mode="contained" onPress={handleSave} style={styles.button}>
                            Save
                        </Button>
                    ) : (
                        <Button mode="outlined" onPress={handleEdit} style={styles.button}>
                            Edit
                        </Button>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    surface: {
        padding: 16,
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 8,
        elevation: 4,
    },
    sectionTitle: {
        marginBottom: 16,
        fontWeight: 'bold',
    },
    input: {
        marginBottom: 16,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    dateText: {
        marginLeft: 8,
        flex: 1,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    feedingUnitTitle: {
        marginBottom: 8,
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonContainer: {
        padding: 16,
    },
    button: {
        paddingVertical: 8,
    },
    calendarButton: {
        margin: 0,
    },
});

export default SettingsPage;