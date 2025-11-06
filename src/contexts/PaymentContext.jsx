import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api';
import { useAuth } from './AuthContext'; // để lấy user đã đăng nhập

const PaymentContext = createContext();

const initialState = {
  payments: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    semester: '',
    courseName: '',
  },
  sort: '', // course_asc, amount_desc, etc
  totalAmount: 0,
};

// Reducer quản lý state
function paymentReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };

    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        payments: action.payload,
        totalAmount: action.payload.reduce((sum, p) => sum + Number(p.amount), 0),
      };

    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, [action.field]: action.value },
      };

    case 'SET_SORT':
      return { ...state, sort: action.value };

    default:
      return state;
  }
}

export const PaymentProvider = ({ children }) => {
  const { user } = useAuth(); // lấy user.id từ login
  const [state, dispatch] = useReducer(paymentReducer, initialState);

  // ✅ Lấy payments cho user hiện tại
  const fetchPayments = async () => {
    if (!user?.id) return; // chưa login chưa fetch
    dispatch({ type: 'FETCH_START' });
    try {
      const data = await api.getPayments({ userId: user.id }); // userId là chuỗi => khớp db.json
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'FETCH_FAILURE', payload: err.message });
    }
  };

  // ✅ Thêm Payment
  const addPayment = async (newPayment) => {
    try {
      await api.addPayment({ ...newPayment, userId: user.id });
      fetchPayments();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Cập nhật Payment
  const updatePayment = async (id, updatedPayment) => {
    try {
      await api.updatePayment(id, updatedPayment);
      fetchPayments();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Xóa Payment
  const deletePayment = async (id) => {
    try {
      await api.deletePayment(id);
      fetchPayments();
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch khi Login xong
  useEffect(() => {
    fetchPayments();
  }, [user]);

  return (
    <PaymentContext.Provider
      value={{
        ...state,
        dispatch,
        fetchPayments,
        addPayment,
        updatePayment,
        deletePayment,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

// Custom hook để dùng nhanh trong component
export const usePayment = () => useContext(PaymentContext);
