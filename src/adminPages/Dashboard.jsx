import React from 'react'
import DashboardOverview from '../adminComponents/DashboardOverview'

import CourseSection from '../adminComponents/CourseSection'

export default function Dashboard() {
  return (
    <div>
        <section>
          <DashboardOverview></DashboardOverview>
        </section>
        <section>
          <CourseSection></CourseSection>
        </section>
        
    </div>
  )
}
