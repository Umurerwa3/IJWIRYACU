import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { AdminDashboard } from './components/AdminDashboard';
import { UserManagement } from './components/UserManagement';
import { Dashboard } from './components/Dashboard';
import { AnalyticsHub } from './components/AnalyticsHub';
import { ReportIssue } from './components/ReportIssue';
import { ReportQueue } from './components/ReportQueue';
import { TrackReports } from './components/TrackReports';
import { TrendingIssues } from './components/TrendingIssues';
import { DistrictComparison } from './components/DistrictComparison';
import { TeamPerformance } from './components/TeamPerformance';
import { MapView } from './components/MapView';
import { PriorityAlertPanel } from './components/PriorityAlertPanel';
import { DataAccountability } from './components/DataAccountability';
import { SuccessStories } from './components/SuccessStories';
import { ThemeProvider } from './context/ThemeContext';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App: React.FC = () => {
  const language = 'en'; // Default language

  return (
    <ThemeProvider>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className="min-h-screen bg-gray-100 dark:bg-dark-bg text-gray-900 dark:text-dark-text transition-colors">
          <Router>
            <Routes>
              <Route path="/" element={<AdminDashboard />}>
                <Route index element={<Dashboard language={language} />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="analytics" element={<AnalyticsHub language={language} />} />
                <Route path="reports/issue" element={<ReportIssue language={language} />} />
                <Route path="reports/queue" element={<ReportQueue language={language} />} />
                <Route path="reports/track" element={<TrackReports language={language} />} />
                <Route path="trending" element={<TrendingIssues language={language} />} />
                <Route path="district-comparison" element={<DistrictComparison language={language} />} />
                <Route path="team-performance" element={<TeamPerformance language={language} />} />
                <Route path="map" element={<MapView language={language} />} />
                <Route path="alerts" element={<PriorityAlertPanel language={language} />} />
                <Route path="accountability" element={<DataAccountability language={language} />} />
                <Route path="success-stories" element={<SuccessStories language={language} />} />
              </Route>
            </Routes>
          </Router>
        </div>
      </MuiThemeProvider>
    </ThemeProvider>
  );
};

export default App;