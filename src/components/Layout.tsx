import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';

interface LayoutProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, backgroundColor }) => {
  const theme = useTheme();
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: backgroundColor || theme.colors.background }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={backgroundColor || theme.colors.background}
      />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Layout;
