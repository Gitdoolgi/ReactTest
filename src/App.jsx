import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddressList from './components/Addresslist';
import Login from './components/Login';

function App() {
  return (
  <div className="App">
    <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">
      Address 
      </Typography>
    </Toolbar>
    </AppBar>
    <Login/>
    {/* <AddressList/> */}
  </div>
  );
}
export default App;