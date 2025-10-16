import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { BarChart, PieChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const DashboardScreen: React.FC = () => {
  const theme = useTheme();
  const { user, organization, logout } = useAuth();
  const navigation = useNavigation();

  const handleLogout = async () => {
    await logout();
    navigation.navigate('Splash' as never);
  };

  const handleNotifications = () => {
    navigation.navigate('Notifications' as never);
  };

  const handleOrgChart = () => {
    navigation.navigate('OrgChart' as never);
  };

  const handleProfile = () => {
    navigation.navigate('Profile' as never);
  };

  const handleSettings = () => {
    navigation.navigate('Settings' as never);
  };

  const handleBudgetOverview = () => {
    navigation.navigate('BudgetOverview' as never);
  };

  // Mock data for charts
  const budgetData = {
    labels: organization?.departments.map(dept => dept.name) || [],
    datasets: [
      {
        data: organization?.departments.map(dept => dept.spent) || [],
        color: (opacity = 1) => `rgba(103, 126, 234, ${opacity})`,
      },
    ],
  };

  const pieData = organization?.departments.map((dept, index) => ({
    name: dept.name,
    population: dept.spent,
    color: `hsl(${index * 60}, 70%, 50%)`,
    legendFontColor: theme.colors.onSurface,
    legendFontSize: 12,
  })) || [];

  const chartConfig = {
    backgroundColor: theme.colors.surface,
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.surface,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(103, 126, 234, ${opacity})`,
    labelColor: (opacity = 1) => theme.colors.onSurface,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: theme.colors.primary,
    },
  };

  return (
    <Layout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: theme.colors.onSurface }]}>
              Welcome back,
            </Text>
            <Text style={[styles.userName, { color: theme.colors.onSurface }]}>
              {user?.name}
            </Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton} onPress={handleNotifications}>
              <Icon name="notifications" size={24} color={theme.colors.onSurface} />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={handleSettings}>
              <Icon name="settings" size={24} color={theme.colors.onSurface} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={handleProfile}>
              <Icon name="account-circle" size={24} color={theme.colors.onSurface} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Organization Info */}
        <View style={[styles.orgCard, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.orgHeader}>
            <Icon name="business" size={24} color={theme.colors.primary} />
            <Text style={[styles.orgName, { color: theme.colors.onSurface }]}>
              {organization?.name}
            </Text>
          </View>
          <Text style={[styles.orgCode, { color: theme.colors.onSurfaceVariant }]}>
            Code: {organization?.invitationCode}
          </Text>
        </View>

        {/* Budget Overview */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Budget Overview
            </Text>
            <TouchableOpacity onPress={handleBudgetOverview}>
              <Text style={[styles.seeAll, { color: theme.colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.budgetSummary}>
            <View style={styles.budgetItem}>
              <Text style={[styles.budgetLabel, { color: theme.colors.onSurfaceVariant }]}>
                Total Budget
              </Text>
              <Text style={[styles.budgetValue, { color: theme.colors.onSurface }]}>
                ${organization?.budget.toLocaleString()}
              </Text>
            </View>
            <View style={styles.budgetItem}>
              <Text style={[styles.budgetLabel, { color: theme.colors.onSurfaceVariant }]}>
                Amount Spent
              </Text>
              <Text style={[styles.budgetValue, { color: theme.colors.error }]}>
                ${organization?.spent.toLocaleString()}
              </Text>
            </View>
            <View style={styles.budgetItem}>
              <Text style={[styles.budgetLabel, { color: theme.colors.onSurfaceVariant }]}>
                Remaining
              </Text>
              <Text style={[styles.budgetValue, { color: theme.colors.primary }]}>
                ${((organization?.budget || 0) - (organization?.spent || 0)).toLocaleString()}
              </Text>
            </View>
          </View>

          {/* Budget Chart */}
          {organization?.departments && organization.departments.length > 0 && (
            <View style={styles.chartContainer}>
              <BarChart
                data={budgetData}
                width={width - 80}
                height={220}
                chartConfig={chartConfig}
                style={styles.chart}
                yAxisSuffix=""
                yAxisInterval={1}
              />
            </View>
          )}
        </View>

        {/* Daily Digest */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Daily Digest
            </Text>
            <Icon name="today" size={20} color={theme.colors.primary} />
          </View>

          <View style={styles.digestItems}>
            <View style={styles.digestItem}>
              <Icon name="pending" size={20} color={theme.colors.error} />
              <Text style={[styles.digestText, { color: theme.colors.onSurface }]}>
                5 pending approvals
              </Text>
            </View>
            <View style={styles.digestItem}>
              <Icon name="trending-up" size={20} color={theme.colors.primary} />
              <Text style={[styles.digestText, { color: theme.colors.onSurface }]}>
                Engineering department at 80% budget
              </Text>
            </View>
            <View style={styles.digestItem}>
              <Icon name="lightbulb" size={20} color={theme.colors.secondary} />
              <Text style={[styles.digestText, { color: theme.colors.onSurface }]}>
                AI suggests adding a QA team
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            Quick Actions
          </Text>

          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction} onPress={handleOrgChart}>
              <View style={[styles.quickActionIcon, { backgroundColor: theme.colors.primary + '20' }]}>
                <Icon name="account-tree" size={24} color={theme.colors.primary} />
              </View>
              <Text style={[styles.quickActionText, { color: theme.colors.onSurface }]}>
                Org Chart
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAction} onPress={handleBudgetOverview}>
              <View style={[styles.quickActionIcon, { backgroundColor: theme.colors.secondary + '20' }]}>
                <Icon name="pie-chart" size={24} color={theme.colors.secondary} />
              </View>
              <Text style={[styles.quickActionText, { color: theme.colors.onSurface }]}>
                Budget Analysis
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAction} onPress={handleNotifications}>
              <View style={[styles.quickActionIcon, { backgroundColor: theme.colors.tertiary + '20' }]}>
                <Icon name="notifications" size={24} color={theme.colors.tertiary} />
              </View>
              <Text style={[styles.quickActionText, { color: theme.colors.onSurface }]}>
                Notifications
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAction} onPress={handleProfile}>
              <View style={[styles.quickActionIcon, { backgroundColor: theme.colors.primary + '20' }]}>
                <Icon name="person" size={24} color={theme.colors.primary} />
              </View>
              <Text style={[styles.quickActionText, { color: theme.colors.onSurface }]}>
                Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>

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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: {
    fontSize: 16,
    opacity: 0.7,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  headerButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  orgCard: {
    margin: 24,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orgHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  orgName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  orgCode: {
    fontSize: 14,
    opacity: 0.7,
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
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  budgetSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  budgetItem: {
    alignItems: 'center',
  },
  budgetLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  budgetValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chartContainer: {
    alignItems: 'center',
  },
  chart: {
    borderRadius: 16,
  },
  digestItems: {
    gap: 12,
  },
  digestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  digestText: {
    fontSize: 14,
    flex: 1,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  quickAction: {
    alignItems: 'center',
    width: '45%',
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  logoutContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  logoutButton: {
    marginTop: 16,
  },
});

export default DashboardScreen;
