import { Navigate, createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './components/Layout/AppLayout';
import { PageFive } from './pages/PageFive';
import { PageFour } from './pages/PageFour';
import { PageOne } from './pages/PageOne';
import { PageThree } from './pages/PageThree';
import { PageTwo } from './pages/PageTwo';
import { StartPage } from './pages/StartPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <StartPage />
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      { index: true, element: <PageOne /> },
      { path: 'page-2', element: <PageTwo /> },
      { path: 'page-3', element: <PageThree /> },
      { path: 'page-4', element: <PageFour /> },
      { path: 'page-5', element: <PageFive /> }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);

