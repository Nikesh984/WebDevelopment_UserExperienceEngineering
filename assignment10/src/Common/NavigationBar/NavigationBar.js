import { Navbar } from 'react-bootstrap';

function NavigationBar(){
   return(
    <div>
        <Navbar bg="dark" variant="dark" className="navbar-dark">
          <Navbar.Brand href="/">Weather App</Navbar.Brand>
        </Navbar>
        <br/>
    </div>
   )
}

export default NavigationBar;