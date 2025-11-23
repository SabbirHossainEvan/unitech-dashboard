
import React from 'react'
import { UserListSection, mockUsers } from '../adminComponents/UserListSection' 


export default function UserDetails() {

  const usersData = mockUsers;
  const totalUserCount = 1149; 

  return (
    <div className="p-4  min-h-screen flex">
        <section className="w-full">
          <UserListSection 
            users={usersData} 
            totalUsers={totalUserCount} 
          />
        </section>
        <section></section>
    </div>
  )
}