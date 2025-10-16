import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '@/context/AuthContext';
import TabNavigator from '@/navigation/TabNavigator';

// Screens
import SplashScreen from '@/screens/SplashScreen';
import AuthSelectionScreen from '@/screens/AuthSelectionScreen';
import LoginScreen from '@/screens/LoginScreen';
import JoinOrganizationScreen from '@/screens/JoinOrganizationScreen';
import CreateOrganizationScreen from '@/screens/CreateOrganizationScreen';
import DashboardScreen from '@/screens/DashboardScreen';
import OrgChartScreen from '@/screens/OrgChartScreen';
import NotificationsScreen from '@/screens/NotificationsScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import BudgetOverviewScreen from '@/screens/BudgetOverviewScreen';
import SettingsScreen from '@/screens/SettingsScreen';

export type RootStackParamList = {
  Splash: undefined;
  AuthSelection: undefined;
  Login: undefined;
  JoinOrganization: undefined;
  CreateOrganization: undefined;
  MainTabs: undefined;
  Notifications: undefined;
  Profile: undefined;
  BudgetOverview: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // You could show a loading screen here
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'MainTabs' : 'Splash'}
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      >
        {!isAuthenticated ? (
          // Auth Stack
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="AuthSelection" component={AuthSelectionScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="JoinOrganization" component={JoinOrganizationScreen} />
            <Stack.Screen name="CreateOrganization" component={CreateOrganizationScreen} />
          </>
        ) : (
          // Main App Stack
          <>
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            {/* Stack-only screens accessible from tabs */}
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="BudgetOverview" component={BudgetOverviewScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
