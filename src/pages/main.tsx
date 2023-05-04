import { CalendarApp } from "../components/Calendar"
import PersistentDrawerRight from "../components/Header"


function Main() {
  return (
    
    <PersistentDrawerRight>
         <CalendarApp view="month"/>
    </PersistentDrawerRight>
    
  )
}

export default Main