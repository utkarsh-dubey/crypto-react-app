import { makeStyles } from '@material-ui/core';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CoinsTable from './components/CoinsTable';
import CoinDetails from './Pages/CoinDetails';

const useStyles = makeStyles(()=>({
  App: {
    backgroundColor: "#14161A",
    color: "white",
    minHeight : "100vh"
  }
}));


function App() {

  const classes = useStyles();
  return ( 
    <div className={classes.App}>
      <Routes>
        <Route path='/' exact element={<CoinsTable/>}/>
        <Route path='/coin/:id' element={<CoinDetails/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
