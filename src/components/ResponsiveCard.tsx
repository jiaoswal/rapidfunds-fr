import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';

interface ResponsiveCardProps {
  children: React.ReactNode;
  style?: any;
}

const { width } = Dimensions.get('window');

const ResponsiveCard: React.FC<ResponsiveCardProps> = ({ children, style }) => {
  const theme = useTheme();
  const isTablet = width >= 768;
  const isDesktop = width >= 1024;

  const getCardStyle = () => {
    const baseStyle = [
      styles.card,
      {
        backgroundColor: theme.colors.surface,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      }
    ];

    if (isDesktop) {
      baseStyle.push(styles.desktop);
    } else if (isTablet) {
      baseStyle.push(styles.tablet);
    } else {
      baseStyle.push(styles.mobile);
    }

    if (style) {
      baseStyle.push(style);
    }

    return baseStyle;
  };

  return (
    <View style={getCardStyle()}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
  },
  mobile: {
    marginBottom: 16,
  },
  tablet: {
    width: '48%',
    marginBottom: 16,
  },
  desktop: {
    width: '48%',
    marginBottom: 20,
  },
});

export default ResponsiveCard;
