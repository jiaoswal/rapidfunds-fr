import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { BarChart, PieChart, LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const BudgetOverviewScreen: React.FC = () => {
  const theme = useTheme();
  const { organization } = useAuth();
  const navigation = useNavigation();
  
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('month');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleExportToExcel = () => {
    // In a real app, this would export data to Excel
    Alert.alert('Export', 'Export to Excel functionality will be implemented in the next version.');
  };

  const handleConnectExcel = () => {
    // In a real app, this would connect to Excel for data import
    Alert.alert('Connect Excel', 'Excel integration will be implemented in the next version.');
  };

  const getDepartmentData = () => {
    if (selectedDepartment === 'all') {
      return organization?.departments || [];
    }
    return organization?.departments.filter(dept => dept.id === selectedDepartment) || [];
  };

  const getBudgetData = () => {
    const departments = getDepartmentData();
    return {
      labels: departments.map(dept => dept.name),
      datasets: [
        {
          data: departments.map(dept => dept.spent),
          color: (opacity = 1) => `rgba(103, 126, 234, ${opacity})`,
        },
      ],
    };
  };

  const getPieData = () => {
    const departments = getDepartmentData();
    return departments.map((dept, index) => ({
      name: dept.name,
      population: dept.spent,
      color: `hsl(${index * 60}, 70%, 50%)`,
      legendFontColor: theme.colors.onSurface,
      legendFontSize: 12,
    }));
  };

  const getTrendData = () => {
    // Mock trend data
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          data: [200000, 300000, 400000, 500000, 600000, 750000],
          color: (opacity = 1) => `rgba(103, 126, 234, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };
  };

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

  const getBudgetStatus = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 90) return { status: 'Critical', color: theme.colors.error };
    if (percentage >= 75) return { status: 'Warning', color: theme.colors.secondary };
    return { status: 'Good', color: theme.colors.primary };
  };

  const getAISuggestions = () => {
    return [
      {
        title: 'Budget Optimization',
        description: 'Consider reallocating budget from Marketing to Engineering for better ROI',
        priority: 'high',
      },
      {
        title: 'Cost Reduction',
        description: 'Implement cost-saving measures in Sales department to stay within budget',
        priority: 'medium',
      },
      {
        title: 'Resource Allocation',
        description: 'Add more resources to Engineering team to meet project deadlines',
        priority: 'low',
      },
    ];
  };

  const departments = getDepartmentData();
  const budgetData = getBudgetData();
  const pieData = getPieData();
  const trendData = getTrendData();
  const aiSuggestions = getAISuggestions();

  return (
    <Layout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Icon name="arrow-back" size={24} color={theme.colors.onSurface} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>Budget Overview</Text>
          <TouchableOpacity onPress={handleExportToExcel}>
            <Icon name="download" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <View style={styles.filters}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContent}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                {
                  backgroundColor: selectedDepartment === 'all' ? theme.colors.primary : theme.colors.surface,
                  borderColor: theme.colors.outline,
                },
              ]}
              onPress={() => setSelectedDepartment('all')}
            >
              <Text
                style={[
                  styles.filterText,
                  {
                    color: selectedDepartment === 'all' ? '#FFFFFF' : theme.colors.onSurface,
                  },
                ]}
              >
                All Departments
              </Text>
            </TouchableOpacity>
            {organization?.departments.map((dept) => (
              <TouchableOpacity
                key={dept.id}
                style={[
                  styles.filterButton,
                  {
                    backgroundColor: selectedDepartment === dept.id ? theme.colors.primary : theme.colors.surface,
                    borderColor: theme.colors.outline,
                  },
                ]}
                onPress={() => setSelectedDepartment(dept.id)}
              >
                <Text
                  style={[
                    styles.filterText,
                    {
                      color: selectedDepartment === dept.id ? '#FFFFFF' : theme.colors.onSurface,
                    },
                  ]}
                >
                  {dept.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Budget Summary */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            Budget Summary
          </Text>

          <View style={styles.budgetSummary}>
            {departments.map((dept) => {
              const status = getBudgetStatus(dept.spent, dept.budget);
              return (
                <View key={dept.id} style={styles.budgetItem}>
                  <View style={styles.budgetItemHeader}>
                    <Text style={[styles.budgetItemName, { color: theme.colors.onSurface }]}>
                      {dept.name}
                    </Text>
                    <View style={[styles.statusBadge, { backgroundColor: status.color + '20' }]}>
                      <Text style={[styles.statusText, { color: status.color }]}>
                        {status.status}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.budgetItemDetails}>
                    <Text style={[styles.budgetAmount, { color: theme.colors.onSurface }]}>
                      ${dept.spent.toLocaleString()} / ${dept.budget.toLocaleString()}
                    </Text>
                    <Text style={[styles.budgetPercentage, { color: theme.colors.onSurfaceVariant }]}>
                      {((dept.spent / dept.budget) * 100).toFixed(1)}%
                    </Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${(dept.spent / dept.budget) * 100}%`,
                          backgroundColor: status.color,
                        },
                      ]}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Charts */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            Spending Analysis
          </Text>

          <View style={styles.chartsContainer}>
            {/* Bar Chart */}
            <View style={styles.chartContainer}>
              <Text style={[styles.chartTitle, { color: theme.colors.onSurface }]}>
                Department Spending
              </Text>
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

            {/* Pie Chart */}
            <View style={styles.chartContainer}>
              <Text style={[styles.chartTitle, { color: theme.colors.onSurface }]}>
                Budget Distribution
              </Text>
              <PieChart
                data={pieData}
                width={width - 80}
                height={220}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                style={styles.chart}
              />
            </View>

            {/* Trend Chart */}
            <View style={styles.chartContainer}>
              <Text style={[styles.chartTitle, { color: theme.colors.onSurface }]}>
                Spending Trend
              </Text>
              <LineChart
                data={trendData}
                width={width - 80}
                height={220}
                chartConfig={chartConfig}
                style={styles.chart}
                yAxisSuffix=""
                yAxisInterval={1}
              />
            </View>
          </View>
        </View>

        {/* AI Suggestions */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              AI Suggestions
            </Text>
            <Icon name="lightbulb" size={20} color={theme.colors.secondary} />
          </View>

          <View style={styles.suggestionsContainer}>
            {aiSuggestions.map((suggestion, index) => (
              <View key={index} style={styles.suggestionItem}>
                <View style={styles.suggestionHeader}>
                  <Text style={[styles.suggestionTitle, { color: theme.colors.onSurface }]}>
                    {suggestion.title}
                  </Text>
                  <View style={[
                    styles.priorityBadge,
                    {
                      backgroundColor: suggestion.priority === 'high' ? theme.colors.error + '20' :
                                      suggestion.priority === 'medium' ? theme.colors.secondary + '20' :
                                      theme.colors.primary + '20',
                    },
                  ]}>
                    <Text style={[
                      styles.priorityText,
                      {
                        color: suggestion.priority === 'high' ? theme.colors.error :
                               suggestion.priority === 'medium' ? theme.colors.secondary :
                               theme.colors.primary,
                      },
                    ]}>
                      {suggestion.priority.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.suggestionDescription, { color: theme.colors.onSurfaceVariant }]}>
                  {suggestion.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Excel Integration */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            Excel Integration
          </Text>

          <View style={styles.excelActions}>
            <Button
              title="Connect Excel"
              onPress={handleConnectExcel}
              variant="outline"
              style={styles.excelButton}
            />
            <Button
              title="Export to Excel"
              onPress={handleExportToExcel}
              style={styles.excelButton}
            />
          </View>
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
  budgetSummary: {
    gap: 16,
  },
  budgetItem: {
    padding: 16,
    backgroundColor: 'rgba(103, 126, 234, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(103, 126, 234, 0.1)',
  },
  budgetItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  budgetItemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  budgetItemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  budgetAmount: {
    fontSize: 14,
    fontWeight: '500',
  },
  budgetPercentage: {
    fontSize: 14,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(103, 126, 234, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  chartsContainer: {
    gap: 24,
  },
  chartContainer: {
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 16,
  },
  suggestionsContainer: {
    gap: 16,
  },
  suggestionItem: {
    padding: 16,
    backgroundColor: 'rgba(103, 126, 234, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(103, 126, 234, 0.1)',
  },
  suggestionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  suggestionDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  excelActions: {
    flexDirection: 'row',
    gap: 12,
  },
  excelButton: {
    flex: 1,
  },
});

export default BudgetOverviewScreen;
