import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Layout from '@/components/Layout';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Department, OrganizationSettings } from '@/types';

interface DepartmentInput {
  name: string;
  budget: string;
  manager: string;
}

const CreateOrganizationScreen: React.FC = () => {
  const theme = useTheme();
  const { createOrganization, isLoading } = useAuth();
  const navigation = useNavigation();
  
  const [formData, setFormData] = useState({
    name: '',
    budget: '',
  });
  const [departments, setDepartments] = useState<DepartmentInput[]>([
    { name: '', budget: '', manager: '' },
  ]);
  const [roles, setRoles] = useState<string[]>(['']);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Organization name is required';
    }

    if (!formData.budget.trim()) {
      newErrors.budget = 'Total budget is required';
    } else if (isNaN(Number(formData.budget)) || Number(formData.budget) <= 0) {
      newErrors.budget = 'Please enter a valid budget amount';
    }

    departments.forEach((dept, index) => {
      if (!dept.name.trim()) {
        newErrors[`department_${index}_name`] = 'Department name is required';
      }
      if (!dept.budget.trim()) {
        newErrors[`department_${index}_budget`] = 'Department budget is required';
      } else if (isNaN(Number(dept.budget)) || Number(dept.budget) <= 0) {
        newErrors[`department_${index}_budget`] = 'Please enter a valid budget amount';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleDepartmentChange = (index: number, field: keyof DepartmentInput, value: string) => {
    const newDepartments = [...departments];
    newDepartments[index][field] = value;
    setDepartments(newDepartments);
    
    if (errors[`department_${index}_${field}`]) {
      setErrors(prev => ({ ...prev, [`department_${index}_${field}`]: '' }));
    }
  };

  const addDepartment = () => {
    setDepartments([...departments, { name: '', budget: '', manager: '' }]);
  };

  const removeDepartment = (index: number) => {
    if (departments.length > 1) {
      setDepartments(departments.filter((_, i) => i !== index));
    }
  };

  const handleRoleChange = (index: number, value: string) => {
    const newRoles = [...roles];
    newRoles[index] = value;
    setRoles(newRoles);
  };

  const addRole = () => {
    setRoles([...roles, '']);
  };

  const removeRole = (index: number) => {
    if (roles.length > 1) {
      setRoles(roles.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const organizationData = {
        name: formData.name,
        departments: departments.map((dept) => ({
          name: dept.name,
          budget: Number(dept.budget),
          spent: 0,
          manager: dept.manager,
          employees: [],
        })),
        roles: roles.filter(role => role.trim() !== ''),
        settings: {
          budgetLimits: departments.reduce((acc, dept, index) => {
            acc[`dept${index}`] = Number(dept.budget);
            return acc;
          }, {} as { [key: string]: number }),
          approvalHierarchy: {
            level1: ['admin'],
            level2: ['manager'],
          },
          emailNotifications: true,
          dailyDigest: true,
        } as OrganizationSettings,
      };

      const success = await createOrganization(organizationData);
      if (success) {
        Alert.alert(
          'Organization Created',
          'Your organization has been created successfully!',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Dashboard' as never),
            },
          ]
        );
      } else {
        Alert.alert('Error', 'Failed to create organization. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <Layout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Icon name="arrow-back" size={24} color={theme.colors.onSurface} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>Create Organization</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <View style={[styles.logo, { backgroundColor: theme.colors.primary }]}>
              <Icon name="business" size={40} color="#FFFFFF" />
            </View>
          </View>

          <Text style={[styles.subtitle, { color: theme.colors.onSurface }]}>
            Create New Organization
          </Text>
          <Text style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>
            Set up your organization with departments and roles
          </Text>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Organization Name"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              placeholder="Enter organization name"
              error={errors.name}
            />

            <Input
              label="Total Budget"
              value={formData.budget}
              onChangeText={(value) => handleInputChange('budget', value)}
              placeholder="Enter total budget"
              keyboardType="numeric"
              error={errors.budget}
            />

            {/* Departments */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
                  Departments
                </Text>
                <TouchableOpacity style={styles.addButton} onPress={addDepartment}>
                  <Icon name="add" size={20} color={theme.colors.primary} />
                </TouchableOpacity>
              </View>

              {departments.map((dept, index) => (
                <View key={index} style={styles.departmentCard}>
                  <View style={styles.departmentHeader}>
                    <Text style={[styles.departmentTitle, { color: theme.colors.onSurface }]}>
                      Department {index + 1}
                    </Text>
                    {departments.length > 1 && (
                      <TouchableOpacity onPress={() => removeDepartment(index)}>
                        <Icon name="delete" size={20} color={theme.colors.error} />
                      </TouchableOpacity>
                    )}
                  </View>

                  <Input
                    label="Department Name"
                    value={dept.name}
                    onChangeText={(value) => handleDepartmentChange(index, 'name', value)}
                    placeholder="e.g., Engineering, Marketing"
                    error={errors[`department_${index}_name`]}
                  />

                  <Input
                    label="Budget"
                    value={dept.budget}
                    onChangeText={(value) => handleDepartmentChange(index, 'budget', value)}
                    placeholder="Enter budget amount"
                    keyboardType="numeric"
                    error={errors[`department_${index}_budget`]}
                  />

                  <Input
                    label="Manager Name"
                    value={dept.manager}
                    onChangeText={(value) => handleDepartmentChange(index, 'manager', value)}
                    placeholder="Enter manager name"
                  />
                </View>
              ))}
            </View>

            {/* Roles */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
                  Roles
                </Text>
                <TouchableOpacity style={styles.addButton} onPress={addRole}>
                  <Icon name="add" size={20} color={theme.colors.primary} />
                </TouchableOpacity>
              </View>

              {roles.map((role, index) => (
                <View key={index} style={styles.roleCard}>
                  <Input
                    label={`Role ${index + 1}`}
                    value={role}
                    onChangeText={(value) => handleRoleChange(index, value)}
                    placeholder="e.g., Manager, Developer, Analyst"
                  />
                  {roles.length > 1 && (
                    <TouchableOpacity
                      style={styles.removeRoleButton}
                      onPress={() => removeRole(index)}
                    >
                      <Icon name="delete" size={20} color={theme.colors.error} />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>

            <Button
              title="Create Organization"
              onPress={handleSubmit}
              loading={isLoading}
              style={styles.submitButton}
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
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  form: {
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 8,
  },
  departmentCard: {
    backgroundColor: 'rgba(103, 126, 234, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(103, 126, 234, 0.1)',
  },
  departmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  departmentTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  removeRoleButton: {
    padding: 8,
    marginLeft: 8,
  },
  submitButton: {
    marginTop: 8,
  },
});

export default CreateOrganizationScreen;
