import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/employee" element={<EmployeeDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
