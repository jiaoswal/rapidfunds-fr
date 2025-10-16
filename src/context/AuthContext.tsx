import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextType, User, Organization, LoginCredentials, JoinOrganizationData, CreateOrganizationData } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const storedOrg = await AsyncStorage.getItem('organization');
      
      if (storedUser && storedOrg) {
        setUser(JSON.parse(storedUser));
        setOrganization(JSON.parse(storedOrg));
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in real app, this would come from API
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: credentials.email,
        phone: '+1234567890',
        role: 'Manager',
        designation: 'Department Manager',
        department: 'Engineering',
        organizationId: 'org1',
        isAdmin: credentials.email === 'admin@rapidfunds.com',
        isApproved: true,
        createdAt: new Date().toISOString(),
      };

      const mockOrg: Organization = {
        id: 'org1',
        name: 'Tech Corp',
        invitationCode: 'TECH2024',
        budget: 1000000,
        spent: 750000,
        departments: [
          {
            id: 'dept1',
            name: 'Engineering',
            budget: 500000,
            spent: 400000,
            manager: '1',
            employees: ['1', '2', '3'],
          },
          {
            id: 'dept2',
            name: 'Marketing',
            budget: 200000,
            spent: 150000,
            manager: '2',
            employees: ['4', '5'],
          },
          {
            id: 'dept3',
            name: 'Sales',
            budget: 300000,
            spent: 200000,
            manager: '3',
            employees: ['6', '7', '8'],
          },
        ],
        admins: ['1'],
        settings: {
          budgetLimits: {
            dept1: 500000,
            dept2: 200000,
            dept3: 300000,
          },
          approvalHierarchy: {
            level1: ['1'],
            level2: ['2', '3'],
          },
          emailNotifications: true,
          dailyDigest: true,
        },
        createdAt: new Date().toISOString(),
      };

      setUser(mockUser);
      setOrganization(mockOrg);
      
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      await AsyncStorage.setItem('organization', JSON.stringify(mockOrg));
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setUser(null);
      setOrganization(null);
      await AsyncStorage.multiRemove(['user', 'organization']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const joinOrganization = async (data: JoinOrganizationData): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - in real app, this would validate the organization code
      if (data.organizationCode !== 'TECH2024') {
        return false;
      }
      
      // In real app, this would send a request to admin for approval
      return true;
    } catch (error) {
      console.error('Join organization error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const createOrganization = async (data: CreateOrganizationData): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock organization creation
      const newOrg: Organization = {
        id: 'org' + Date.now(),
        name: data.name,
        invitationCode: 'ORG' + Math.random().toString(36).substr(2, 6).toUpperCase(),
        budget: 1000000,
        spent: 0,
        departments: data.departments.map((dept, index) => ({
          ...dept,
          id: 'dept' + index,
        })),
        admins: [user?.id || '1'],
        settings: data.settings,
        createdAt: new Date().toISOString(),
      };

      setOrganization(newOrg);
      await AsyncStorage.setItem('organization', JSON.stringify(newOrg));
      
      return true;
    } catch (error) {
      console.error('Create organization error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    organization,
    login,
    logout,
    joinOrganization,
    createOrganization,
    isAuthenticated: !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
