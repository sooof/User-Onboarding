
import axios from 'axios';
import * as yup from 'yup'
import React, { useState, useEffect} from "react";
import Number from './Number'
import './App.css';

const schema = yup.object().shape({
  username: yup.string().required('user is required').min(6, 'Username needs to be 6 char min'),
  email: yup.string()
  .email('Must be a valid email address!')
  .required('Email is required!'),
  password: yup
  .string().required('user is required').min(6, 'Password needs to be 6 char min'),
  agree: yup.boolean().oneOf([true], 'you must agree ')
})
const initForm = {
  username: '',
  email: '',
  password: '',
  agree: false,
}


const initialFriends = []

function App() {
  const [form, setForm] = useState(initForm)
  const [errors, setErrors] = useState(initForm)
 const [disabled, setDisabled] = useState(true)
 const [number, setNumber] = useState(initialFriends)    
 const [friends, setFriends] = useState(initialFriends)     
 
 const setFormErrors = (name, value) => {
   yup.reach(schema, name).validate(value)
     .then( () => setErrors( {...errors, [name]: ''}))
     .catch(err => setErrors( {...errors, [name]: err.errors[0]} ))
 }
 
//  useEffect(() => {
//     getFriends()
//   }, [])
 useEffect( () =>{
   schema.isValid(form).then(valid => setDisabled(!valid))
 },[form])
 
 
  const change = event => {
   const {checked, value, name, type} = event.target
   const valueToUse = type === 'checkbox' ? checked: value
   setFormErrors(name, valueToUse)
   setForm({...form, [name]: valueToUse})
  }

  // const getFriends = () => {
  //   axios.get('http://buddies.com/api/friends')
  //   .then(res => {
  //     console.log("App.js: res.data = ", res.data)
  //     setNumber(res.data);
  //   }).catch(err => console.error(err))
  // }

  // const postNewFriend = newFriend => {
  //   axios.post('http://buddies.com/api/friends', newFriend)
  //   .then(res => {

  //     setFriends([res.data, ...friends]);
  //    // setFormValues(initialFormValues);
  //   }).catch(err => {
  //     console.error(err);
  //    // setFormValues(initialFormValues);
  //   }).finally( ()=>{
  //    // setFormValues(initialFormValues);
  //   })
  // }
 
  


  return (
    <div className="container">
      <h1>User Onboarding</h1>
      <div style={ { color: 'red'}}> 
          <div>{errors.username}</div> <div>{errors.email}</div> <div>{errors.agree}</div> <div>{errors.password}</div>
        </div>
        <form > 
          {/** Username */}
          <label >
          User
          <input 
                onChange={change}
                value={form.username}
                name='username'
                type='text'/>
          </label>
          <br/>
        {/** Email */}
          <label >
          Email
          <input 
                onChange={change}
                value={form.email}
                name='email'
                type='text'/>
          </label>
          <br/>
        {/** Password */}
          <label >
          Password
          <input 
                onChange={change}
                value={form.password}
                name='password'
                type='text'/>
          </label>
          <br/>
          
          {/**  Terms of Service (checkbox)  */}
          <label >Terms of Service 
                <input 
                onChange={change}
                checked={form.agree}
                name='agree'
                type='checkbox'/>
          </label><br/>

          {/**  A Submit button to send our form data to the server.  */}
          <label >
            <button disabled={disabled}>submit</button>
          </label>

        </form>
      
        {
        friends.map(friend => {
          return (
            <Number key={form.id} details={form} />
          )
        })
      }

    </div>
  );
}

export default App;
