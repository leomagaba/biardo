import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.017abb45636e467cbcd158d8ec32b708',
  appName: 'SIGEA',
  webDir: 'dist',
  server: {
    url: 'https://017abb45-636e-467c-bcd1-58d8ec32b708.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#2563eb',
      showSpinner: false
    }
  }
};

export default config;