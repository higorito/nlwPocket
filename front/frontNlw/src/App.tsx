import { Dialog, } from './components/ui/dialog'
import { CreateGoal } from './components/create-goal'
import { EmptyGoal } from './components/empty-goal'
import { Summary } from './summary'


function App() {
  
  return (
    <Dialog>
      
      {/* <EmptyGoal/> */}
      <Summary/>
      
      <CreateGoal />
    </Dialog>
  )
}

export default App
