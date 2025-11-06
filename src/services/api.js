//api.js chứa các hàm gọi API tới JSON Server
import axios from 'axios';

// Cấu hình Base URL cho JSON Server (Cổng 3001)
const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ================= USER API =================
export const getUsers = async () => {
  try {
    const response = await API.get('/users');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

// ================= PAYMENT API =================
// Lấy danh sách payments (có thể lọc userId hoặc để trống)
export const getPayments = async (params = {}) => {
  try {
    const response = await API.get('/payments', { params }); 
    // params ví dụ: { userId: "1" }
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch payments');
  }
};

// Thêm payment
export const addPayment = async (paymentData) => {
  try {
    const response = await API.post('/payments', paymentData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add payment');
  }
};

// Cập nhật payment
export const updatePayment = async (id, updatedPayment) => {
  try {
    const response = await API.put(`/payments/${id}`, updatedPayment);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update payment');
  }
};

// Xóa payment
export const deletePayment = async (id) => {
  try {
    const response = await API.delete(`/payments/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete payment');
  }
};

export default API;
