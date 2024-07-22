import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import HomePage from '../pages/HomePage'
import SettingsPage from '../pages/SettingsPage';

const HomeRoute = () => <HomePage />

const StatsRoute = () => <Text>Stats</Text>;

const SettingsRoute = () => <SettingsPage />

const BottomNavbar = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
    { key: 'stats', title: 'Stats', focusedIcon: 'chart-box', unfocusedIcon: 'chart-box-outline' },
    { key: 'settings', title: 'Settings', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    stats: StatsRoute,
    settings: SettingsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomNavbar;