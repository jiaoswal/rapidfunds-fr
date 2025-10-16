import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

const { width, height } = Dimensions.get('window');

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children, backgroundColor }) => {
  const theme = useTheme();
  const isTablet = width >= 768;
  const isDesktop = width >= 1024;

  const getContainerStyle = () => {
    if (isDesktop) {
      return [
        styles.container,
        styles.desktop,
        { backgroundColor: backgroundColor || theme.colors.background }
      ];
    } else if (isTablet) {
      return [
        styles.container,
        styles.tablet,
        { backgroundColor: backgroundColor || theme.colors.background }
      ];
    } else {
      return [
        styles.container,
        styles.mobile,
        { backgroundColor: backgroundColor || theme.colors.background }
      ];
    }
  };

  const getContentStyle = () => {
    if (isDesktop) {
      return [styles.content, styles.desktopContent];
    } else if (isTablet) {
      return [styles.content, styles.tabletContent];
    } else {
      return [styles.content, styles.mobileContent];
    }
  };

  return (
    <View style={getContainerStyle()}>
      <View style={getContentStyle()}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mobile: {
    // Mobile styles - single column
  },
  tablet: {
    // Tablet styles - two column layout
    paddingHorizontal: 40,
  },
  desktop: {
    // Desktop styles - multi-column layout
    paddingHorizontal: 60,
  },
  content: {
    flex: 1,
  },
  mobileContent: {
    // Single column mobile layout
  },
  tabletContent: {
    // Two column tablet layout
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  desktopContent: {
    // Multi-column desktop layout
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: 1200,
    alignSelf: 'center',
  },
});

export default ResponsiveLayout;
