import React from "react";
import Weather from "./Components/Weather/Weather";
import { BrowserRouter as Router,Routes, Route, Link } from "react-router-dom";
import NavigationBar from "./Common/NavigationBar/NavigationBar";

class App extends React.Component {
  render() {
    
    return (
      <div className="App">
        <NavigationBar />
        <Router>
           <div className="d-flex justify-content-center"> 
            <Link to="/weekly">
              <button className="btn btn-dark">
                Search By Location
              </button>              
            </Link>
           </div>
          
          <div className="row">
            <Routes>
              <Route path="/weekly" element={<Weather />} />
            </Routes>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
