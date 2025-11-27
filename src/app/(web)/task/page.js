import React, { Suspense } from 'react'
import TasksPage from '../../../components/Tasks/TaskPage'

const page = () => {
  return (
<Suspense fallback={<div>Loading...</div>}>
      <TasksPage/>
    </Suspense>
  )
}

export default page