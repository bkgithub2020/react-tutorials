import React, { useState, useEffect } from 'react';
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

  //Set data in state from Local Storage
  useEffect(() => {
    const studentsData = JSON.parse(localStorage.getItem('students'));
    if (studentsData) {
      setStudents(studentsData);
    }
  }, []);

  // Update data in Local Storage after Add new data
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/simpleform">
            <StudentForm setStudentsFunc={setStudents} studentData={students} />
          </Route>
          <Route path="/stepform">
            <StudentStepForm setStudentsFunc={setStudents} studentData={students} />
          </Route>
          <Route path="/student-list" component={StudentList} studentData={students} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
