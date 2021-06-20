import React, {SyntheticEvent, useState} from 'react';
import axios from "axios";

const Forgot = () => {
  const [email, setEmail] = useState('')
  const [notify, setNotify] = useState({
    show: false,
    error: false,
    message: ''
  })

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()

    await axios.post('/forgot', {email})
      .then(() => {
        setNotify({
          show: true,
          error: false,
          message: 'Email was send!'
        })
      })
      .catch(() => {
        setNotify({
          show: true,
          error: true,
          message: "Email does not exist!"
        })
      })
  }

  let info;

  if (notify.show) {
    info = (
      <div className={notify.error ? 'alert alert-danger' : 'alert alert-success'}>
        { notify.message }
      </div>
    )
  }

  return (
    <>
      <form className="form-signin" onSubmit={submit}>
        { info }
        <h1 className="h3 mb-3 font-weight-normal mb-3">Please set your email</h1>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Send email
        </button>
      </form>
    </>
  );
};

export default Forgot;
