import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({ baseURL: API_URL, withCredentials: true });

// Auto-attach JWT token
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('dp_token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth
export const register = (data) => api.post('/api/auth/register', data);
export const login = (data) => api.post('/api/auth/login', data);
export const getMe = () => api.get('/api/auth/me');
export const sendVerifyEmail = () => api.post('/api/auth/send-verify-email');
export const forgotPassword = (data) => api.post('/api/auth/forgot-password', data);
export const resetPassword = (token, data) => api.post(`/api/auth/reset-password/${token}`, data);

// Mock payment (demo mode — instant success)
export const mockPay = (data) => api.post('/api/payments/mock-pay', data);

// Services
export const getServices = () => api.get('/api/services');
export const getService = (slug) => api.get(`/api/services/${slug}`);
export const submitInquiry = (data) => api.post('/api/services/inquire', data);
export const selectService = (slug) => api.post(`/api/services/select/${slug}`);

// Internships
export const getInternships = () => api.get('/api/internships');
export const getInternship = (id) => api.get(`/api/internships/${id}`);
export const getMyApplications = () => api.get('/api/internships/my/applications');

// Payments
export const createOrder = (data) => api.post('/api/payments/create-order', data);
export const verifyPayment = (data) => api.post('/api/payments/verify', data);
export const getMyPayments = () => api.get('/api/payments/my');
export const getOfferLetterData = (applicationId) => api.get(`/api/payments/offer-letter/${applicationId}`);


// Chat
export const getChatHistory = () => api.get('/api/chat/history');
export const sendMessage = (data) => api.post('/api/chat/send', data);

// Dashboard
export const getDashboardSummary = () => api.get('/api/dashboard/summary');

export default api;
