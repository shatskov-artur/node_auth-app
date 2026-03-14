import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Activate() {
  const { token } = useParams();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`/api/auth/activate/${token}`, { method: 'POST', credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setStatus('error');
          setMessage(data.error);
        } else {
          setStatus('success');
          setMessage(data.message);
        }
      });
  }, [token]);

  if (status === 'loading') return <div className="container"><p>Activating...</p></div>;

  return (
    <div className="container">
      {status === 'success' ? (
        <>
          <h1>Account activated!</h1>
          <div className="alert alert-success">{message}</div>
          <div className="links"><Link to="/login">Log in</Link></div>
        </>
      ) : (
        <>
          <h1>Invalid link</h1>
          <div className="alert alert-error">{message}</div>
          <div className="links"><Link to="/register">Register</Link></div>
        </>
      )}
    </div>
  );
}
