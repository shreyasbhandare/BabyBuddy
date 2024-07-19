import { PaperProvider } from 'react-native-paper';
import BottomNavbar from './components/BottomNavbar';

export default function App() {
  return (
    <PaperProvider>
      <BottomNavbar />
    </PaperProvider>
  );
}
