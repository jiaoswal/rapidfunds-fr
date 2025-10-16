import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';

// Tabs
import DashboardScreen from '@/screens/DashboardScreen';
import OrgChartScreen from '@/screens/OrgChartScreen';
import DirectoryScreen from '@/screens/DirectoryScreen';
import QueriesScreen from '@/screens/QueriesScreen';
import InboxScreen from '@/screens/InboxScreen';

export type MainTabParamList = {
  Directory: undefined;
  OrgChart: undefined;
  Queries: undefined;
  Inbox: undefined;
  Dashboard: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const TabNavigator: React.FC = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
        },
        tabBarIcon: ({ color, size }) => {
          const map: Record<string, string> = {
            Directory: 'group',
            OrgChart: 'account-tree',
            Queries: 'description',
            Inbox: 'inbox',
            Dashboard: 'dashboard',
          };
          const name = map[route.name] || 'circle';
          return <Icon name={name as any} size={size} color={color} />;
        },
        tabBarLabelStyle: { fontSize: 11 },
      })}
    >
      <Tab.Screen name="Directory" component={DirectoryScreen} options={{ tabBarTestID: 'tab-directory' }} />
      <Tab.Screen name="OrgChart" component={OrgChartScreen} options={{ tabBarTestID: 'tab-orgchart' }} />
      <Tab.Screen name="Queries" component={QueriesScreen} options={{ tabBarTestID: 'tab-queries' }} />
      <Tab.Screen
        name="Inbox"
        component={InboxScreen}
        options={{
          tabBarBadge: undefined,
          tabBarBadgeStyle: { backgroundColor: '#EF4444' },
          tabBarTestID: 'tab-inbox',
        }}
      />
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ tabBarTestID: 'tab-dashboard' }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
