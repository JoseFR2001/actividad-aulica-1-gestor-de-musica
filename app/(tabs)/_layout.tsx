import { MiniPlayer } from '@/src/components/MiniPlayer';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: '#2CE38A',
                    tabBarInactiveTintColor: '#B6D8C8',
                    tabBarStyle: {
                        backgroundColor: '#0D1D17',
                        borderTopColor: '#183B2D',
                        height: 78,
                        paddingTop: 8,
                        paddingBottom: 12,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        position: 'absolute',
                        overflow: 'hidden',
                        left: 12,
                        right: 12,
                        bottom: 12,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    tabBarLabelStyle: {
                        fontSize: 11,
                        fontWeight: '700',
                    },
                    tabBarItemStyle: {
                        borderRadius: 14,
                    },
                }}
            >
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
            <MiniPlayer />
        </>
    );
}
