import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../App';

const IncomeForm = ({ onIncomeAdded }) => {
  const [formData, setFormData] = useState({
    source: '',
    amount: '',
    category: '',
    date: ''
  });

  // ✅ Get token from localStorage
  const token = localStorage.getItem("token");

  // ✅ Ensure proper header capitalization
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit income
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You are not logged in. Please login to continue.");
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/income`, formData, config);
      if (response.data.message== "Income Added Successfully") {
        const updatedIncome = await axios.get(`${baseURL}/getIncome`, config);
        alert("Income added successfully!");
console.log('Updated income data:', updatedIncome);
        setFormData({ source: '', amount: '', category: '', date: '' });
        onIncomeAdded(updatedIncome.data);
        
      }
    } catch (err) {
      console.error('Failed to add income:', err);
      alert("Error: Failed to add income. Please check token or server.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
    >
      <input
        type="text"
        name="source"
        placeholder="Source"
        value={formData.source}
        onChange={handleChange}
        className="border px-3 py-2 rounded"
        required
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        className="border px-3 py-2 rounded"
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="border px-3 py-2 rounded"
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="border px-3 py-2 rounded"
        required
      />
      <button
        type="submit"
        className="md:col-span-4 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Add Income
      </button>
    </form>
  );
};

export default IncomeForm;
