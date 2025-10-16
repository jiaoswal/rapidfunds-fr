import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Layout from '@/components/Layout';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen: React.FC = () => {
  const theme = useTheme();
  const { user, organization, logout } = useAuth();
  const navigation = useNavigation();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Validate form
    const newErrors: { [key: string]: string } = {};

    if (!profileData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!profileData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!profileData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // In a real app, this would update the user profile
      Alert.alert('Success', 'Profile updated successfully!');
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
    setErrors({});
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    // Validate password form
    const newErrors: { [key: string]: string } = {};

    if (!passwordData.currentPassword.trim()) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!passwordData.newPassword.trim()) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // In a real app, this would change the password
      Alert.alert('Success', 'Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.navigate('Splash' as never);
          },
        },
      ]
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Layout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Icon name="arrow-back" size={24} color={theme.colors.onSurface} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>Profile</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Profile Header */}
        <View style={[styles.profileHeader, { backgroundColor: theme.colors.surface }]}>
          <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
            <Icon name="person" size={40} color="#FFFFFF" />
          </View>
          <Text style={[styles.userName, { color: theme.colors.onSurface }]}>
            {user?.name}
          </Text>
          <Text style={[styles.userRole, { color: theme.colors.onSurfaceVariant }]}>
            {user?.role} • {user?.department}
          </Text>
          {user?.isAdmin && (
            <View style={styles.adminBadge}>
              <Icon name="admin-panel-settings" size={16} color="#FFFFFF" />
              <Text style={styles.adminText}>Admin</Text>
            </View>
          )}
        </View>

        {/* Profile Information */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Personal Information
            </Text>
            {!isEditing && (
              <TouchableOpacity onPress={handleEdit}>
                <Icon name="edit" size={20} color={theme.colors.primary} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.form}>
            <Input
              label="Full Name"
              value={profileData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              placeholder="Enter your full name"
              error={errors.name}
              disabled={!isEditing}
            />

            <Input
              label="Email"
              value={profileData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholder="Enter your email"
              keyboardType="email-address"
              error={errors.email}
              disabled={!isEditing}
            />

            <Input
              label="Phone Number"
              value={profileData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              error={errors.phone}
              disabled={!isEditing}
            />

            <Input
              label="Role"
              value={user?.role || ''}
              placeholder="Your role"
              disabled={true}
            />

            <Input
              label="Designation"
              value={user?.designation || ''}
              placeholder="Your designation"
              disabled={true}
            />

            <Input
              label="Department"
              value={user?.department || ''}
              placeholder="Your department"
              disabled={true}
            />

            {isEditing && (
              <View style={styles.editActions}>
                <Button
                  title="Save"
                  onPress={handleSave}
                  style={styles.saveButton}
                />
                <Button
                  title="Cancel"
                  onPress={handleCancel}
                  variant="outline"
                  style={styles.cancelButton}
                />
              </View>
            )}
          </View>
        </View>

        {/* Change Password */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            Change Password
          </Text>

          <View style={styles.form}>
            <Input
              label="Current Password"
              value={passwordData.currentPassword}
              onChangeText={(value) => handlePasswordChange('currentPassword', value)}
              placeholder="Enter current password"
              secureTextEntry
              error={errors.currentPassword}
            />

            <Input
              label="New Password"
              value={passwordData.newPassword}
              onChangeText={(value) => handlePasswordChange('newPassword', value)}
              placeholder="Enter new password"
              secureTextEntry
              error={errors.newPassword}
            />

            <Input
              label="Confirm New Password"
              value={passwordData.confirmPassword}
              onChangeText={(value) => handlePasswordChange('confirmPassword', value)}
              placeholder="Confirm new password"
              secureTextEntry
              error={errors.confirmPassword}
            />

            <Button
              title="Change Password"
              onPress={handleChangePassword}
              style={styles.changePasswordButton}
            />
          </View>
        </View>

        {/* Organization Info */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            Organization Information
          </Text>

          <View style={styles.orgInfo}>
            <View style={styles.orgInfoItem}>
              <Icon name="business" size={20} color={theme.colors.primary} />
              <Text style={[styles.orgInfoLabel, { color: theme.colors.onSurfaceVariant }]}>
                Organization
              </Text>
              <Text style={[styles.orgInfoValue, { color: theme.colors.onSurface }]}>
                {organization?.name}
              </Text>
            </View>

            <View style={styles.orgInfoItem}>
              <Icon name="code" size={20} color={theme.colors.primary} />
              <Text style={[styles.orgInfoLabel, { color: theme.colors.onSurfaceVariant }]}>
                Organization Code
              </Text>
              <Text style={[styles.orgInfoValue, { color: theme.colors.onSurface }]}>
                {organization?.invitationCode}
              </Text>
            </View>

            <View style={styles.orgInfoItem}>
              <Icon name="calendar-today" size={20} color={theme.colors.primary} />
              <Text style={[styles.orgInfoLabel, { color: theme.colors.onSurfaceVariant }]}>
                Member Since
              </Text>
              <Text style={[styles.orgInfoValue, { color: theme.colors.onSurface }]}>
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </Text>
            </View>
          </View>
        </View>

        {/* Pending Approvals (Admin Only) */}
        {user?.isAdmin && (
          <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Pending Approvals
            </Text>

            <View style={styles.pendingApprovals}>
              <View style={styles.pendingItem}>
                <Icon name="pending" size={20} color={theme.colors.error} />
                <Text style={[styles.pendingText, { color: theme.colors.onSurface }]}>
                  3 pending member requests
                </Text>
              </View>
              <View style={styles.pendingItem}>
                <Icon name="pending" size={20} color={theme.colors.error} />
                <Text style={[styles.pendingText, { color: theme.colors.onSurface }]}>
                  2 pending funding requests
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="outline"
            style={styles.logoutButton}
          />
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 32,
    margin: 24,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 16,
    marginBottom: 16,
  },
  adminBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  adminText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  section: {
    margin: 24,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  form: {
    gap: 16,
  },
  editActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  saveButton: {
    flex: 1,
  },
  cancelButton: {
    flex: 1,
  },
  changePasswordButton: {
    marginTop: 8,
  },
  orgInfo: {
    gap: 16,
  },
  orgInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  orgInfoLabel: {
    fontSize: 14,
    flex: 1,
  },
  orgInfoValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  pendingApprovals: {
    gap: 12,
  },
  pendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pendingText: {
    fontSize: 14,
  },
  logoutContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  logoutButton: {
    marginTop: 16,
  },
});

export default ProfileScreen;
