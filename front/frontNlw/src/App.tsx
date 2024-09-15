import { Dialog, } from './components/ui/dialog'
import { CreateGoal } from './components/create-goal'
import { EmptyGoal } from './components/empty-goal'
import { Summary } from './summary'
import { useQuery } from '@tanstack/react-query'
import { getSummary } from './http/get-summary'



function App() {

  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary
  })

  console.log(data)
  
  return (
    <Dialog>

      {data?.total && data.total > 0 ? <Summary /> : <EmptyGoal/>}
    
      
      <CreateGoal />
    </Dialog>
  )
}

export default App
