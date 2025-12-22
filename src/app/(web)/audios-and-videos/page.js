import React, { Suspense } from 'react'

import AVpage from '../../../components/Audios-videos/AVpage'
import Loader from '../../../components/Loader'

const page = () => {
  return (
<Suspense fallback={<Loader/>}>
      <AVpage/>
    </Suspense>
  )
}

export default page