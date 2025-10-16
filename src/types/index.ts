export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  designation: string;
  department: string;
  organizationId: string;
  isAdmin: boolean;
  isApproved: boolean;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  invitationCode: string;
  budget: number;
  spent: number;
  departments: Department[];
  admins: string[];
  settings: OrganizationSettings;
  createdAt: string;
}

export interface Department {
  id: string;
  name: string;
  budget: number;
  spent: number;
  manager: string;
  employees: string[];
  parentDepartment?: string;
}

export interface OrganizationSettings {
  budgetLimits: {
    [departmentId: string]: number;
  };
  approvalHierarchy: ApprovalHierarchy;
  emailNotifications: boolean;
  dailyDigest: boolean;
}

export interface ApprovalHierarchy {
  [level: string]: string[];
}

export interface OrgChartNode {
  id: string;
  name: string;
  title: string;
  department: string;
  reportsTo?: string;
  children: string[];
  isAdmin: boolean;
  x: number;
  y: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'approval' | 'admin' | 'system';
  isRead: boolean;
  userId: string;
  relatedId?: string;
  createdAt: string;
}

export interface FundingRequest {
  id: string;
  title: string;
  description: string;
  amount: number;
  department: string;
  requester: string;
  status: 'pending' | 'approved' | 'rejected';
  approver?: string;
  createdAt: string;
  approvedAt?: string;
}

export interface DailyDigest {
  id: string;
  date: string;
  pendingApprovals: number;
  budgetHighlights: BudgetHighlight[];
  notifications: Notification[];
  aiSuggestions: AISuggestion[];
}

export interface BudgetHighlight {
  department: string;
  budget: number;
  spent: number;
  percentage: number;
  status: 'under' | 'over' | 'at_limit';
}

export interface AISuggestion {
  id: string;
  type: 'role_suggestion' | 'budget_optimization' | 'org_chart';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  actionRequired: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface JoinOrganizationData {
  name: string;
  email: string;
  phone: string;
  role: string;
  designation: string;
  organizationCode: string;
}

export interface CreateOrganizationData {
  name: string;
  departments: Omit<Department, 'id'>[];
  roles: string[];
  settings: OrganizationSettings;
}

export interface AuthContextType {
  user: User | null;
  organization: Organization | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  joinOrganization: (data: JoinOrganizationData) => Promise<boolean>;
  createOrganization: (data: CreateOrganizationData) => Promise<boolean>;
  isAuthenticated: boolean;
  isLoading: boolean;
}
