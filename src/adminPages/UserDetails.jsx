
import React from 'react'
import { UserListSection, mockUsers } from '../adminComponents/UserListSection' 
import FilterSearchSection from '../adminComponents/FilterSearchSection';


export default function UserDetails() {

  const usersData = mockUsers;
  const totalUserCount = 1149; 

  return (
    <div className="p-4  min-h-screen flex gap-5">
        <section className="w-full">
          <UserListSection 
            users={usersData} 
            totalUsers={totalUserCount} 
          />
        </section>
        <section className='w-80 mt-10'>
          <FilterSearchSection></FilterSearchSection>
        </section>
    </div>
  )
}