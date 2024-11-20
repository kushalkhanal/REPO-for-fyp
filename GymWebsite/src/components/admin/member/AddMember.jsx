import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import DateInputWithCalendar from "./DateInputWithCalendar";
import Dropdown from "./Dropdown";
import dayjs from "dayjs";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const dropIn = {
  hidden: {
    y: "-50vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "50vh",
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const AddMember = ({ modalOpen, handleClose, member }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    contact: "",
    email: "",
    address: "",
    dob: dayjs(),
    startDate: dayjs(),
    endDate: dayjs(),
    membershipType: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (member) {
      setFormData({
        fullName: member.name,
        username: member.username,
        password: member.password,
        contact: member.phoneNumber,
        email: member.email,
        address: member.address,
        dob: dayjs(member.dateOfBirth),
        startDate: dayjs(member.membershipStartDate),
        endDate: dayjs(member.membershipEndDate),
        membershipType: member.membershipType.membershipTypeId,
      });
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !formData.fullName ||
      (!member && (!formData.username || !formData.password)) ||
      !formData.contact ||
      !formData.email ||
      !formData.address ||
      !formData.membershipType
    ) {
      toast.error("Please fill out all required fields.");
      setLoading(false);
      return;
    }

    const data = {
      name: formData.fullName,
      username: formData.username,
      password: formData.password,
      email: formData.email,
      phoneNumber: formData.contact,
      address: formData.address,
      dateOfBirth: formData.dob,
      membershipStartDate: formData.startDate.format("YYYY-MM-DD"),
      membershipEndDate: formData.endDate.format("YYYY-MM-DD"),
      membershipType: {
        membershipTypeId: formData.membershipType,
      },
    };

    try {
      let response;
      if (member) {
        response = await axios.put(
          `http://localhost:8080/members/update/${member.memberId}`,
          data
        );
        toast.success("Member updated successfully");
      } else {
        response = await axios.post("http://localhost:8080/api/auth/register/user", data);
        toast.success("Member added successfully!");
      }
      console.log("Response:", response.data);

      handleClose();
    } catch (error) {
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
        toast.error(
          `Error: ${
            error.response.data.message ||
            "Failed to submit the form. Please try again."
          }`
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error(
          "No response from server. Please check your network connection."
        );
      } else {
        console.error("Error:", error.message);
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMembershipType = (typeId) => {
    setFormData({ ...formData, membershipType: typeId });
  };

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="p-5 bg-slate-100 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] h-auto flex flex-col rounded-lg shadow-lg"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <form onSubmit={handleSubmit}>
          <div className="pb-4">
            <div className="flex justify-between items-center">
              <h2 className="font-serif font-bold text-lg">
                {member ? "Edit Member" : "Add Member"}
              </h2>
              <button
                type="button"
                onClick={handleClose}
                className="text-2xl text-red-500"
              >
                x
              </button>
            </div>
            <p className="font-serif text-gray-600">
              {member
                ? "Edit the details of the member"
                : "Add all the details of the member"}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                required
                onChange={handleChange}
                placeholder="John Doe"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
              />
            </div>
            {!member && (
              <>
                <div className="flex flex-col">
                  <label className="font-medium">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    required
                    onChange={handleChange}
                    placeholder="Username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    required
                    onChange={handleChange}
                    placeholder="Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                  />
                </div>
              </>
            )}
            {member && (
              <>
                <input type="hidden" name="username" value={formData.username} />
                <input type="hidden" name="password" value={formData.password} />
              </>
            )}
            <div className="flex flex-col">
              <label className="font-medium">Contact</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                required
                onChange={handleChange}
                placeholder="Contact"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                required
                onChange={handleChange}
                placeholder="Email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
              />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                required
                onChange={handleChange}
                placeholder="Address"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
              />
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex flex-col flex-1">
                <label className="font-medium">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dob ? formData.dob.toISOString().slice(0, 10) : ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      dob: new Date(e.target.value) // Convert input string to Date object
                    }))
                  }
                  className="border rounded p-2"
                />
              </div>
              <div className="flex flex-col flex-1">
                <label className="font-medium">Membership Type</label>
                <Dropdown
                  onSelect={handleSelectMembershipType}
                  selectedOption={
                    formData.membershipType === 1
                      ? "Basic"
                      : formData.membershipType === 2
                      ? "Standard"
                      : formData.membershipType === 3
                      ? "Premium"
                      : ""
                  }
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex flex-col flex-1">
                <label className="font-medium">Start Date</label>
                <DateInputWithCalendar
                  selectedDate={formData.startDate}
                  onDateChange={(date) =>
                    setFormData((prev) => ({ ...prev, startDate: date }))
                  }
                />
              </div>
              <div className="flex flex-col flex-1">
                <label className="font-medium">End Date</label>
                <DateInputWithCalendar
                  selectedDate={formData.endDate}
                  onDateChange={(date) =>
                    setFormData((prev) => ({ ...prev, endDate: date }))
                  }
                />
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="mt-4 p-2 bg-blue-500 text-white rounded w-full"
            disabled={loading}
          >
            {loading ? "Submitting..." : member ? "Update" : "Add"}
          </motion.button>
          <ToastContainer />
        </form>
      </motion.div>
    </Backdrop>
  );
};

export default AddMember;
