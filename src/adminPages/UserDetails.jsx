
import React from 'react'
import { UserListSection, mockUsers } from '../adminComponents/UserListSection' 


export default function UserDetails() {

  const usersData = mockUsers;
  const totalUserCount = 1149; 

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">User Management</h2>
        <section className="max-w-6xl mx-auto">
          <UserListSection 
            users={usersData} 
            totalUsers={totalUserCount} 
          />
        </section>
    </div>
  )
}