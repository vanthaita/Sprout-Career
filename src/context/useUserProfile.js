'use client'

import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "@/axios/axiosIntance";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get('/users/me');
      setProfile(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, loading, error, refetch: fetchProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a ProfileProvider');
  }
  return context;
};