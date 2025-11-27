import React, { Suspense } from 'react'
import JournalPage from '../../../components/Journal/JournalPage'

const page = () => {
  return (
<Suspense fallback={<div>Loading...</div>}>
      <JournalPage />
    </Suspense>
  )
}

export default page