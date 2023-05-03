import { CalendarApp } from "../components/calendar"
import PersistentDrawerRight from "../components/header"


function Main() {
  return (
    
    <PersistentDrawerRight>
         <CalendarApp view="month"/>
    </PersistentDrawerRight>
    
  )
}

export default Main