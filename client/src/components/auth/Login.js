import React,{ Fragment, useState } from 'react';
import { Link } from 'react-router-dom'


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',   
  });

  const { email, password } = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
  const onSubmit = e => { 
    e.preventDefault(); 
      console.log('Success')
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Đăng nhập</h1>
      <p className="lead"><i className="fas fa-user"></i> Đăng nhập tài khoản của bạn</p>
      <form className="form" onSubmit={ e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address" 
            name="email" 
            value={email}
            onChange={e => onChange(e)}
            requireq
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => onChange(e)}
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Đăng nhập" />
      </form>
      <p className="my-1">
        Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
      </p>
    </Fragment>
  )
}

export default Login;