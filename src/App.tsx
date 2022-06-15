import './App.scss';
import { Routes, Route } from 'react-router-dom';
import ReadItem from './components/ReadItem';
import CreateItem from './components/CreateItem';
import UpdateItem from './components/UpdateItem';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<ReadItem/>}/>
        <Route path='/readposts' element={<ReadItem/>} />
        <Route path='/create' element={<CreateItem/>} />
        <Route path='/readposts/:id' element={<UpdateItem/>} />
      </Routes>
    </div>
  );
}

export default App;