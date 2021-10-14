
import * as yup from 'yup'
import React, { useState, useEffect} from "react";
import './App.css';

const schema = yup.object().shape({
  user: yup.string().required('user is required').min(6, 'user needs to be 6 char min'),
  email: yup
  .string()
  .email('Must be a valid email address!')
  .required('Email is required!'),
  password: yup
  .string().required('user is required').min(6, 'user needs to be 6 char min'),
  // star: yup.string().oneOf(['wars', 'trek'], 'you must select a star'),
  // language: yup.string().oneOf(['1','2','3'], 'Yo must choose a language'),
  agree: yup.boolean().oneOf([true], 'you must give away all your data')
})
const initForm = {
  user: '',
  email: '',
  password: '',
  // star: '',
  agree: false,
  // language: '', 
}


function App() {
  const [form, setForm] = useState(initForm)
  const [errors, setErrors] = useState(initForm)
 const [disabled, setDisabled] = useState(true)
 
 const setFormErrors = (name, value) => {
   yup.reach(schema, name).validate(value)
     .then( () => setErrors( {...errors, [name]: ''}))
     .catch(err => setErrors( {...errors, [name]: err.errors[0]} ))
 }
 
 useEffect( () =>{
   schema.isValid(form).then(valid => setDisabled(!valid))
 },[form])
 
 
  const change = event => {
   const {checked, value, name, type} = event.target
   const valueToUse = type === 'checkbox' ? checked: value
   setFormErrors(name, valueToUse)
   setForm({...form, [name]: valueToUse})
  }
 


  return (
    <div className="container">
      <h1>User Onboarding</h1>
      <div style={ { color: 'red'}}> 
          <div>{errors.user}</div> <div>{errors.star}</div> <div>{errors.agree}</div> <div>{errors.language}</div>
        </div>
        <form > 
          {/** Username */}
          <label >
          User
          <input 
                onChange={change}
                value={form.user}
                name='user'
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
          {/* <label >Star Trek
                <input 
                onChange={change}
                checked={form.star === 'trek'}
                value="trek"
                name='star'
                type='radio'/>
          </label><br/>
          <label >Star Wars
                <input 
                onChange={change}
                checked={form.star === 'wars'}
                value="wars"
                name='star'
                type='radio'/>
          </label><br/> */}

          <label >Terms of Service 
                <input 
                onChange={change}
                checked={form.agree}
                name='agree'
                type='checkbox'/>
          </label><br/>

          {/* <label>Role */}
              {/* Select */}
              {/* <select onChange={change} value={form.language} name='language' >
                <option value=''> --- Select One --- </option>
                <option value='1'>JavaScript</option>
                <option value='2'>Python</option>
                <option value='3'>Java</option>
              </select>
            </label><br/> */}
          {/**  A Submit button to send our form data to the server.  */}
          <label >
            <button disabled={disabled}>submit</button>
          </label>

        </form>
      

    </div>
  );
}

export default App;
