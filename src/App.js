import './App.css';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';
import TaskPage from './pages/TaskPage/TaskPage';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <div className="main-content">
        <Routes>
          <Route path='/' element={<ProjectsPage></ProjectsPage>} />
          <Route path='/task-page/:pid' element={<TaskPage></TaskPage>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
