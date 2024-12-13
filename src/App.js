import './App.css';
import AppRoutes from './route/routes';
import { AuthProvider } from './components/auth/auth-context';
import { MessageProvider } from './components/widget/message';
import { DataProvider } from './components/data-mock/data-context';

function App() {
  return (
    <MessageProvider>
      <AuthProvider>
        <DataProvider>
          <AppRoutes />
        </DataProvider>
      </AuthProvider>
    </MessageProvider>
  );
}

export default App;
