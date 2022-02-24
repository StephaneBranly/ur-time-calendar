import React, { useState } from 'react';
import './App.css';
import { Calendar, PasteMail } from 'components';
import { Class } from 'utils';

function App() {
  const [classes, setClasses] = useState<Class[]>([])

  return (
    <div className="App">
      <PasteMail setClasses={setClasses} />
      <div className='calendar-container'><Calendar view='compact' classes={classes}/></div>
    </div>
  );
}

export default App;
