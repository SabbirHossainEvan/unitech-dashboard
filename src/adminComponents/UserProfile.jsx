import React from 'react'
import UserProfileSection from './UserProfileSection'
import DashboardSummaryCards from './DashboardSummaryCards'

export default function UserProfile() {
  return (
    <div className='flex'>
        <section>
            <UserProfileSection></UserProfileSection>
        </section>
        <section>
            <DashboardSummaryCards></DashboardSummaryCards>
        </section>
    </div>
  )
}
