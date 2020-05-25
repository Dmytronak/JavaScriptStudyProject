import React from 'react';
import Routes from './shared/routes/route';
import './App.scss'
const App: React.FC<any> = (props:any) => {
  return (
      <Routes history={props.history}/>
  );
}

export default App;
