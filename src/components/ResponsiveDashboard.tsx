import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';

interface ResponsiveDashboardProps {
  children: React.ReactNode;
}

const { width } = Dimensions.get('window');

const ResponsiveDashboard: React.FC<ResponsiveDashboardProps> = ({ children }) => {
  const theme = useTheme();
  const isTablet = width >= 768;
  const isDesktop = width >= 1024;

  const getContainerStyle = () => {
    if (isDesktop) {
      return [styles.container, styles.desktop];
    } else if (isTablet) {
      return [styles.container, styles.tablet];
    } else {
      return [styles.container, styles.mobile];
    }
  };

  const getGridStyle = () => {
    if (isDesktop) {
      return [styles.grid, styles.desktopGrid];
    } else if (isTablet) {
      return [styles.grid, styles.tabletGrid];
    } else {
      return [styles.grid, styles.mobileGrid];
    }
  };

  return (
    <ScrollView style={getContainerStyle()} showsVerticalScrollIndicator={false}>
      <View style={getGridStyle()}>
        {children}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  mobile: {
    paddingHorizontal: 0,
  },
  tablet: {
    paddingHorizontal: 20,
  },
  desktop: {
    paddingHorizontal: 40,
  },
  grid: {
    padding: 20,
  },
  mobileGrid: {
    // Single column mobile layout
  },
  tabletGrid: {
    // Two column tablet layout
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  desktopGrid: {
    // Multi-column desktop layout
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    maxWidth: 1200,
    alignSelf: 'center',
  },
});

export default ResponsiveDashboard;
