import './App.css';
import './style.css';
import { useEffect, useState } from 'react';
import { ADD_RECORD, DELETE_RECORD, EDIT_RECORD, UPDATE_RECORD } from './action/action'
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [salary, setSalary] = useState("");
  const [edit, setEdit] = useState("")

  const record = useSelector(state => state.Crud.users);
  const single = useSelector(state => state.Crud.user);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (edit) {
      let obj = {
        id: edit,
        fname: fname,
        lname: lname,
        salary: salary
      }
      dispatch(UPDATE_RECORD(obj));
    } else {
      let obj = {
        id: Math.floor(Math.random() * 1000),
        fname: fname,
        lname: lname,
        salary: salary
      }
      dispatch(ADD_RECORD(obj));
      setFname("")
      setSalary("")
      setLname("")
    }
  }

  useEffect(() => {
    setFname(single.fname)
    setLname(single.lname)
    setSalary(single.salary)
    setEdit(single.id);
  }, [single])
  return (
    <center>
    
      <div className='container'>
        <h1 className='mb-4'>Employee List</h1>
        <nav className="navbar navbar-dark bg-light">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span>Add Employee</span>
          </button>
      </nav>
      <div className="collapse" id="navbarToggleExternalContent">
        <div className="bg-light p-4">
           <table border={1} className='rounded border border-info'>
          <thead>
            <tr>
              <th>First name: </th>
              <th><input type='text' className='rounded-pill m-2' name='name' onChange={(e) => setFname(e.target.value)} value={fname} /></th>
            </tr>
            <tr>
              <th>Last name: </th>
              <th><input type='text'  className='rounded-pill m-2' name='name' onChange={(e) => setLname(e.target.value)} value={lname} /></th>
            </tr>
            <tr>
              <th>Salary: </th>
              <th><input type='text'  className='rounded-pill m-2' name='phone' onChange={(e) => setSalary(e.target.value)} value={salary} /></th>
            </tr>
            <tr>
              <th></th>
              <th>
                <center>
                <button className='btn btn-primary rounded-pill' onClick={() => handleSubmit()}>Submit</button>
                </center>
              </th>
            </tr>
          </thead>
        </table>
        </div>
      </div>
        <br></br> <br></br>
        <table border={1} className='table table-success table-striped text-center'>
          <thead>
            <tr className='fs-5 fw-bold'>
              <td>Id</td>
              <td>First name</td>
              <td>Last name</td>
              <td>Salary</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {
              record.map((v) => {
                const { id, fname, lname, salary } = v;
                return (
                  <tr key={id}>
                    <td >{id}</td>
                    <td>{fname}</td>
                    <td>{lname}</td>
                    <td>{salary}</td>
                    <td>
                      <button className='btn btn-danger m-1' onClick={() => dispatch(DELETE_RECORD(id))}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                      </svg></button>
                      <button className='btn btn-success' onClick={() => dispatch(EDIT_RECORD(id))}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                      </svg></button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </center>
  );
}

export default App;
