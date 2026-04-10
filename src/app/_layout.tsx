import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: '#dfd2c4', shadowColor: 'transparent', elevation: 0 },
        headerTintColor: '#333',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 18, color: '#333' },
        tabBarStyle: {
          backgroundColor: '#dfd2c4',
          borderTopWidth: 1,
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
