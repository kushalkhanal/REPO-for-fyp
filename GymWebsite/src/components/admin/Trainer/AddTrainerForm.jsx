import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTrainerForm = ({ trainer, onClose, refreshTrainers }) => {
  const [formData, setFormData] = useState({
    name: '',
    salary: '',
    type: '',
  });

  useEffect(() => {
    if (trainer) {
      setFormData({
        name: trainer.name,
        salary: trainer.salary,
        type: trainer.type,
      });
    }
  }, [trainer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (trainer) {
        await axios.put(`http://localhost:8080/trainers/update/${trainer.id}`, formData);
      } else {
        await axios.post('http://localhost:8080/trainers/save', formData);
      }
      onClose();
      refreshTrainers();  
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Salary
        </label>
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Type
        </label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {trainer ? 'Update Trainer' : 'Add Trainer'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddTrainerForm;
