import './App.css';
import { useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import GraphView from './Components/GraphView';
import ToggleButton from './Components/ToggleButton';

function App() {
  useEffect(() => {
    
  }, [])
  
  return (
    <div style={{display:'flex', alignItems:'start', justifyContent:'space-between', flexDirection:'row', flexWrap:'wrap'}}>
      <div style={{flexBasis:'auto'}}>
      <Sidebar />
      </div>
      <div style={{flexGrow:1}}>
      <GraphView />
      </div>
    </div>
  );
}

export default App;
