import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
    TextInput,
    Switch,
    Button,
    Text,
    RadioButton,
    IconButton,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const SettingsPage = () => {
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
        <ScrollView style={styles.container}>
            <TextInput
                label="First Name"
                value={firstName}
                onChangeText={setFirstName}
                disabled={!isEditing}
                style={styles.input}
            />
            <TextInput
                label="Last Name"
                value={lastName}
                onChangeText={setLastName}
                disabled={!isEditing}
                style={styles.input}
            />
            <View style={styles.dateContainer}>
                <Text style={styles.labelText}>Birth Date: </Text>
                <Text style={styles.dateText}>{formatDate(birthDate)}</Text>
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
            <View style={styles.switchContainer}>
                <Text style={{ fontSize: 16 }}>Formula Fed?</Text>
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
                />
            )}
            {isFormulaFed && (
                <View>
                    <Text style={{ fontSize: 16 }}>Feeding Unit</Text>
                    <RadioButton.Group onValueChange={value => setFeedingUnit(value)} value={feedingUnit}>
                        <View style={styles.radioContainer}>
                            <RadioButton.Item label="oz" value="oz" disabled={!isEditing} labelStyle={styles.radioLabel} />
                            <RadioButton.Item label="ml" value="ml" disabled={!isEditing} labelStyle={styles.radioLabel} />
                        </View>
                    </RadioButton.Group>
                </View>
            )}
            {isEditing ? (
                <Button mode="contained" onPress={handleSave} style={styles.button} labelStyle={{ fontSize: 18 }}>
                    Save
                </Button>
            ) : (
                <Button mode="outlined" onPress={handleEdit} style={styles.button} labelStyle={{ fontSize: 18 }}>
                    Edit
                </Button>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 64
    },
    input: {
        marginBottom: 12,
        fontSize: 20,
        padding: 5,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 12,
    },
    button: {
        marginTop: 16
    },
    labelText: {
        fontSize: 16,
    },
    dateText: {
        fontSize: 20,
    },
    radioLabel: {
        fontSize: 20,
    },
    calendarButton: {
        margin: 0,
    }
});

export default SettingsPage;