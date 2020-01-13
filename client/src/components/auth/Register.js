import React,{ Fragment, useState } from 'react';
import { Link } from 'react-router-dom'
import connect from 'react-redux';
import { setAlert } from '../../actions/alert';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const {name, email, password, password2} = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
  const onSubmit = e => { 
    e.preventDefault();
    if(password !== password2) {
      console.log('Passwords do not match');
    }
    else{
      console.log('Success')
    }
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Đăng ký</h1>
      <p className="lead"><i className="fas fa-user"></i> Tạo tài khoản của bạn</p>
      <form className="form" onSubmit={ e => onSubmit(e)}>
        <div className="form-group">
          <input type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
            required />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address" 
            name="email" 
            value={email}
            onChange={e => onChange(e)}
            requireq
          />
          <small className="form-text"
            >Để có ảnh đại diện, vui lòng sử dụng email có ảnh của bạn</small
          >
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Đăng ký" />
      </form>
      <p className="my-1">
        Bạn đã có tài khoản? <Link to="/login"> Đăng nhập</Link>
      </p>
    </Fragment>
  )
}

export default connect()(Register);