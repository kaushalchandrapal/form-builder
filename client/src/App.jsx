
import { BrowserRouter } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppRoutes from './routes';
import store from './store';
import { SnackbarProvider } from './contexts/snackbar';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <BrowserRouter>
            <DndProvider backend={HTML5Backend}>
              <AppRoutes />
            </DndProvider>
          </BrowserRouter>
        </SnackbarProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
