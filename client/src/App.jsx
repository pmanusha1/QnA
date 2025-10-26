import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import QuestionsPage from './pages/QuestionsPage';
import RegisterPage from './pages/RegisterPage';
import client from './apollo/client';
import AuthProvider from './context/AuthContext'

function App() {

  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/question/:id' element={<QuestionsPage />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
