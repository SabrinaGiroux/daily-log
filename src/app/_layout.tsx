import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { colors } from '@/src/styles/colors';

const BAR_HEIGHT = 50;

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.header,
          shadowColor: 'transparent',
          height: BAR_HEIGHT,
        },
        headerTintColor: '#333',

        tabBarStyle: {
          backgroundColor: colors.header,
          height: BAR_HEIGHT,
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#333',
        tabBarInactiveTintColor: '#999',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="today-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
