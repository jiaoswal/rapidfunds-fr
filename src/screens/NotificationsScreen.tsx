import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import { useNavigation } from '@react-navigation/native';
import { Notification } from '@/types';

const NotificationsScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Pending Approval',
      message: 'Funding request for Marketing Campaign needs your approval',
      type: 'approval',
      isRead: false,
      userId: '1',
      relatedId: 'req1',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Budget Alert',
      message: 'Engineering department has reached 80% of its budget',
      type: 'system',
      isRead: false,
      userId: '1',
      relatedId: 'dept1',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'New Member Request',
      message: 'Sarah Johnson has requested to join your organization',
      type: 'admin',
      isRead: true,
      userId: '1',
      relatedId: 'user1',
      createdAt: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'Approval Reminder',
      message: 'You have 3 pending approvals that need attention',
      type: 'approval',
      isRead: true,
      userId: '1',
      relatedId: 'approvals',
      createdAt: new Date().toISOString(),
    },
    {
      id: '5',
      title: 'System Update',
      message: 'New features have been added to the dashboard',
      type: 'system',
      isRead: true,
      userId: '1',
      relatedId: 'system',
      createdAt: new Date().toISOString(),
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'pending' | 'read' | 'alerts'>('all');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNotificationPress = (notification: Notification) => {
    // Mark as read
    setNotifications(prev =>
      prev.map(n => n.id === notification.id ? { ...n, isRead: true } : n)
    );

    // Navigate based on notification type
    switch (notification.type) {
      case 'approval':
        Alert.alert('Funding Request', 'Navigate to funding request details');
        break;
      case 'admin':
        Alert.alert('Admin Action', 'Navigate to member approval');
        break;
      case 'system':
        Alert.alert('System Update', 'Navigate to system information');
        break;
    }
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const getFilteredNotifications = () => {
    switch (filter) {
      case 'pending':
        return notifications.filter(n => !n.isRead);
      case 'read':
        return notifications.filter(n => n.isRead);
      case 'alerts':
        return notifications.filter(n => n.type === 'system');
      default:
        return notifications;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'approval':
        return 'pending';
      case 'admin':
        return 'admin-panel-settings';
      case 'system':
        return 'info';
      default:
        return 'notifications';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'approval':
        return theme.colors.error;
      case 'admin':
        return theme.colors.primary;
      case 'system':
        return theme.colors.secondary;
      default:
        return theme.colors.onSurfaceVariant;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return `${Math.floor(diffInHours / 24)}d ago`;
    }
  };

  const filteredNotifications = getFilteredNotifications();

  return (
    <Layout>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Icon name="arrow-back" size={24} color={theme.colors.onSurface} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>Notifications</Text>
          <TouchableOpacity onPress={handleMarkAllAsRead}>
            <Text style={[styles.markAllText, { color: theme.colors.primary }]}>Mark All Read</Text>
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <View style={styles.filters}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContent}>
            {[
              { key: 'all', label: 'All' },
              { key: 'pending', label: 'Pending' },
              { key: 'read', label: 'Read' },
              { key: 'alerts', label: 'Alerts' },
            ].map((filterOption) => (
              <TouchableOpacity
                key={filterOption.key}
                style={[
                  styles.filterButton,
                  {
                    backgroundColor: filter === filterOption.key ? theme.colors.primary : theme.colors.surface,
                    borderColor: theme.colors.outline,
                  },
                ]}
                onPress={() => setFilter(filterOption.key as any)}
              >
                <Text
                  style={[
                    styles.filterText,
                    {
                      color: filter === filterOption.key ? '#FFFFFF' : theme.colors.onSurface,
                    },
                  ]}
                >
                  {filterOption.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Notifications List */}
        <ScrollView style={styles.notificationsList} showsVerticalScrollIndicator={false}>
          {filteredNotifications.length === 0 ? (
            <View style={styles.emptyState}>
              <Icon name="notifications-none" size={64} color={theme.colors.onSurfaceVariant} />
              <Text style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}>
                No notifications found
              </Text>
            </View>
          ) : (
            filteredNotifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationCard,
                  {
                    backgroundColor: theme.colors.surface,
                    borderLeftColor: getNotificationColor(notification.type),
                  },
                  !notification.isRead && styles.unreadNotification,
                ]}
                onPress={() => handleNotificationPress(notification)}
                activeOpacity={0.8}
              >
                <View style={styles.notificationContent}>
                  <View style={styles.notificationHeader}>
                    <View style={styles.notificationIconContainer}>
                      <Icon
                        name={getNotificationIcon(notification.type)}
                        size={20}
                        color={getNotificationColor(notification.type)}
                      />
                    </View>
                    <View style={styles.notificationTextContainer}>
                      <Text style={[styles.notificationTitle, { color: theme.colors.onSurface }]}>
                        {notification.title}
                      </Text>
                      <Text style={[styles.notificationTime, { color: theme.colors.onSurfaceVariant }]}>
                        {formatDate(notification.createdAt)}
                      </Text>
                    </View>
                    {!notification.isRead && (
                      <View style={styles.unreadIndicator} />
                    )}
                  </View>
                  <Text style={[styles.notificationMessage, { color: theme.colors.onSurfaceVariant }]}>
                    {notification.message}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
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
  markAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  filters: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  filterContent: {
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  notificationsList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  notificationCard: {
    marginBottom: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  unreadNotification: {
    backgroundColor: 'rgba(103, 126, 234, 0.05)',
  },
  notificationContent: {
    padding: 16,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  notificationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(103, 126, 234, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4444',
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    lineHeight: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
  },
});

export default NotificationsScreen;
