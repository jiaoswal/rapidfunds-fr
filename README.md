# Rapid Funds - Corporate Internal Funding App

A modern, mobile-friendly React Native application for streamlining corporate funding approvals and organization management.

## Features

### 🔐 Authentication & Organization Management
- **Splash Screen** - Clean, modern welcome screen with app branding
- **Login System** - Secure email/password authentication
- **Join Organization** - Request access to existing organizations
- **Create Organization** - Admin-only organization setup with departments and roles

### 📊 Dashboard & Analytics
- **Interactive Dashboard** - Overview of organization budget with charts
- **Budget Overview** - Department-wise spending analysis with AI suggestions
- **Daily Digest** - Pending approvals and budget highlights
- **Real-time Notifications** - System alerts and approval requests

### 🏢 Organization Management
- **Org Chart** - Drag-and-drop organizational hierarchy (admin-editable)
- **AI-Powered Suggestions** - Smart role recommendations and budget optimization
- **Department Management** - Budget allocation and spending tracking
- **Multi-admin Support** - Multiple administrators per organization

### 👤 User Management
- **Profile Management** - Personal information and password changes
- **Role-based Access** - Different permissions for admins and members
- **Approval Workflows** - Streamlined funding request processes

### 📱 Mobile-First Design
- **Responsive UI** - Optimized for mobile devices
- **Touch-friendly** - Intuitive gestures and interactions
- **Modern Design** - Clean, professional interface
- **Accessibility** - Screen reader support and high contrast

## Technology Stack

- **React Native** - Cross-platform mobile development
- **TypeScript** - Type-safe development
- **Expo** - Development platform and tools
- **React Navigation** - Navigation and routing
- **React Native Paper** - Material Design components
- **React Native Chart Kit** - Data visualization
- **AsyncStorage** - Local data persistence
- **React Native Vector Icons** - Icon library

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rapidfunds-fr
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on device/simulator**
   ```bash
   npm run ios
   # or
   npm run android
   ```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Layout.tsx
├── context/            # React Context providers
│   └── AuthContext.tsx
├── navigation/         # Navigation configuration
│   └── AppNavigator.tsx
├── screens/           # Screen components
│   ├── SplashScreen.tsx
│   ├── LoginScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── OrgChartScreen.tsx
│   ├── NotificationsScreen.tsx
│   ├── ProfileScreen.tsx
│   └── BudgetOverviewScreen.tsx
├── types/             # TypeScript type definitions
│   └── index.ts
└── utils/             # Utility functions and constants
    └── theme.ts
```

## Key Features Explained

### 1. Splash Screen
- Modern gradient design with app branding
- "Tap anywhere" interaction for intuitive navigation
- Smooth transitions to authentication flow

### 2. Authentication Flow
- **Login**: Email/password authentication with validation
- **Join Organization**: Request access with organization code validation
- **Create Organization**: Admin-only organization setup with departments

### 3. Dashboard
- Budget overview with interactive charts
- Daily digest of pending approvals
- Quick access to key features
- Real-time notifications

### 4. Organization Chart
- Drag-and-drop hierarchy management
- AI-powered role suggestions
- Search functionality
- Admin-only editing capabilities

### 5. Budget Management
- Department-wise budget tracking
- Spending analysis with charts
- AI suggestions for optimization
- Excel integration (planned)

### 6. Notifications
- Real-time alerts and updates
- Filter by type (pending, read, alerts)
- Mark all as read functionality
- Clickable notifications for navigation

## Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
API_BASE_URL=your_api_url
CLAUDE_API_KEY=your_claude_api_key
```

### Theme Customization
Modify `src/utils/theme.ts` to customize colors and styling:

```typescript
export const theme = {
  ...MD3LightTheme,
  colors: {
    primary: '#667eea',
    secondary: '#764ba2',
    // ... other colors
  },
};
```

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React Native best practices
- Use functional components with hooks
- Implement proper error handling

### Component Structure
```typescript
interface ComponentProps {
  // Define props interface
}

const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Component logic
  return (
    // JSX
  );
};

export default Component;
```

### State Management
- Use React Context for global state
- Local state with useState for component-specific data
- AsyncStorage for persistent data

## Testing

### Running Tests
```bash
npm test
# or
yarn test
```

### Test Structure
- Unit tests for utility functions
- Component tests for UI components
- Integration tests for navigation flows

## Deployment

### Building for Production

1. **iOS**
   ```bash
   expo build:ios
   ```

2. **Android**
   ```bash
   expo build:android
   ```

### App Store Deployment
1. Configure app.json with production settings
2. Build production bundle
3. Submit to App Store/Play Store

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## Roadmap

### Version 2.0
- [ ] Real API integration
- [ ] Push notifications
- [ ] Offline support
- [ ] Advanced analytics
- [ ] Multi-language support

### Version 3.0
- [ ] AI-powered insights
- [ ] Advanced reporting
- [ ] Integration with external systems
- [ ] Advanced security features