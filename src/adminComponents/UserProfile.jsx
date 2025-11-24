import React from 'react'
import UserProfileSection from './UserProfileSection'
import DashboardSummaryCards from './DashboardSummaryCards'

export default function UserProfile() {
  return (
    <div className='flex'>
        <section className='w-full'>
            <UserProfileSection></UserProfileSection>
        </section>
        <section className=''>
            <DashboardSummaryCards></DashboardSummaryCards>
        </section>
    </div>
  )
}
