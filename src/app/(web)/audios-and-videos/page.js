import React, { Suspense } from 'react'

import AVpage from '../../../components/Audios-videos/AVpage'

const page = () => {
  return (
<Suspense fallback={<div>Loading...</div>}>
      <AVpage/>
    </Suspense>
  )
}

export default page