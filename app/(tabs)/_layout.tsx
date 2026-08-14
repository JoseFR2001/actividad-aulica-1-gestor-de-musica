import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#7C4DFF' }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Inicio',
                    tabBarLabel: 'Inicio',
                    tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="songs"
                options={{
                    title: 'Canciones',
                    tabBarLabel: 'Canciones',
                    tabBarIcon: ({ color, size }) => <Ionicons name="musical-notes-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="artists"
                options={{
                    title: 'Artistas',
                    tabBarLabel: 'Artistas',
                    tabBarIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="albums"
                options={{
                    title: 'Álbumes',
                    tabBarLabel: 'Álbumes',
                    tabBarIcon: ({ color, size }) => <Ionicons name="disc-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="playlists"
                options={{
                    title: 'Playlists',
                    tabBarLabel: 'Playlists',
                    tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title: 'Favoritos',
                    tabBarLabel: 'Favoritos',
                    tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}
