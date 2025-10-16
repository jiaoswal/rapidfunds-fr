import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import LinearGradient from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Layout from '@/components/Layout';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const handleTap = () => {
    // Navigate to login/join selection
    navigation.navigate('AuthSelection' as never);
  };

  return (
    <Layout>
      <TouchableOpacity style={styles.container} onPress={handleTap} activeOpacity={1}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.content}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Icon name="account-balance" size={60} color="#FFFFFF" />
              </View>
            </View>

            {/* App Name */}
            <Text style={styles.appName}>Rapid Funds</Text>

            {/* Tagline */}
            <Text style={styles.tagline}>Streamline Your Funding Approvals</Text>

            {/* Tap anywhere indicator */}
            <View style={styles.tapIndicator}>
              <Text style={styles.tapText}>Tap anywhere to continue</Text>
              <Icon name="touch-app" size={24} color="#FFFFFF" style={styles.tapIcon} />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 80,
    opacity: 0.9,
    lineHeight: 24,
  },
  tapIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  tapText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginRight: 8,
  },
  tapIcon: {
    opacity: 0.8,
  },
});

export default SplashScreen;
