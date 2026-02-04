'use client';

import React, {useState, useEffect} from 'react';
import {useMe} from '@/features/auth/hooks/useMe';
import {useAppMutation} from '@/features/shared/hooks/useAppMutation';
import {managerClient} from '@/features/manager/managerClient';
import {useQueryClient} from '@tanstack/react-query';

export default function SettingsPage() {
  const {data: userData, isLoading} = useMe();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState(() => ({
    firstName: userData?.user.first_name || '',
    lastName: userData?.user.last_name || '',
    email: userData?.user.email_address || '',
    contactNumber: userData?.user.contact_no || '',
    companyName: userData?.user.company_name || ''
  }));

  const updateProfileMutation = useAppMutation({
    mutationFn: managerClient.updateProfile,
    successMessage: 'Profile updated successfully',
    errorMessage: 'Failed to update profile',
    onSuccessExtra: () => {
      queryClient.invalidateQueries({queryKey: ['me']});
    }
  });

  useEffect(() => {
    if (userData) {
      setTimeout(() => {
        setFormData({
          firstName: userData.user.first_name || '',
          lastName: userData.user.last_name || '',
          email: userData.user.email_address || '',
          contactNumber: userData.user.contact_no || '',
          companyName: userData.user.company_name || ''
        });
      }, 0);
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData?.user._id) return;
    console.log(userData.user.company_name)

    updateProfileMutation.mutate({
      manager_id: userData.user._id,
      updateData: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email_address: formData.email,
        contact_no: formData.contactNumber,
        company_name: formData.companyName
      }
    });
  };

  if (isLoading) {
    return <div className="mt-6">Loading...</div>;
  }

  return (
    <div className="mt-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Account Settings</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number
            </label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {userData?.user.account_type !== 'solo' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          )}

          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
