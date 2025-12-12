import React, { Suspense } from 'react'
import TasksPage from '../../../components/Tasks/TaskPage'
import Loader from '../../../components/Loader'

const page = () => {
  return (
<Suspense fallback={<Loader/>}>
      <TasksPage/>
    </Suspense>
  )
}

export default page