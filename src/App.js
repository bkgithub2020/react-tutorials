import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StudentForm from './components/student/StudentForm';
import StudentStepForm from './components/student/StudentStepForm';
import StudentList from './components/student/StudentList';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Header from './components/common/Header';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/simpleform" component={StudentForm} />
          <Route path="/stepform" component={StudentStepForm} />
          <Route path="/student-list" component={StudentList} data={students} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
