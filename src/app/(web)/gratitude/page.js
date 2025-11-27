import React, { Suspense } from 'react'
import GratitudePage from '../../../components/Gratitude/GratitudePage'

const page = () => {
  return (
<Suspense fallback={<div>Loading...</div>}>
      <GratitudePage />
    </Suspense>
  )
}

export default page