import { makeStyles } from '@material-ui/core';
import './App.css';
import CoinsTable from './components/CoinsTable';

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
      <CoinsTable/>
    </div>
  );
}

export default App;
