import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import LinearGradient from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import { useNavigation } from '@react-navigation/native';

const AuthSelectionScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Login' as never);
  };

  const handleJoinOrganization = () => {
    navigation.navigate('JoinOrganization' as never);
  };

  return (
    <Layout>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.title}>Welcome to FundFlow</Text>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Icon name="account-balance" size={40} color="#FFFFFF" />
              </View>
            </View>

            <Text style={styles.subtitle}>Choose your action</Text>
            <Text style={styles.description}>
              Sign in or join an existing organization
            </Text>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <Button
                title="Login"
                onPress={handleLogin}
                variant="outline"
                style={styles.button}
              />
              <Button
                title="Join Organization"
                onPress={handleJoinOrganization}
                variant="outline"
                style={styles.button}
              />
            </View>

            {/* Admin Option */}
            <TouchableOpacity
              style={styles.adminOption}
              onPress={() => navigation.navigate('CreateOrganization' as never)}
            >
              <Text style={styles.adminText}>Create New Organization</Text>
              <Icon name="admin-panel-settings" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </Layout>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 32,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 48,
    opacity: 0.9,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: '#FFFFFF',
    borderWidth: 2,
  },
  adminOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  adminText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginRight: 8,
    opacity: 0.9,
  },
});

export default AuthSelectionScreen;
