import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Changepassword = () => {

  const [data, setdata] = useState({ cpassword: "", password: "", confirm: "" });
  const [userId, setUserId] = useState(null);

  const handlechange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  }

  const getId = () => {
    const token = localStorage.getItem('Member');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;
      setUserId(userId);
    }
  }

  const submit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirm) {
      window.alert("Confirm and new password should be same");
    } else {
      try {
        const response = await axios.patch(`https://e-housing-helping.onrender.com/member/memberpassword/${userId}`, {
          cpassword: data.cpassword,
          password: data.password
        });

        if (response.status === 201) {
          toast.success(`🦄 ${response.data.message}!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
          // window.alert(response.data.message);
        } else {
          toast.error(`🦄 ${response.data.error}!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
          // window.alert(response.data.error);
        }
      } catch (error) {
        toast.error('🦄 Error occurs!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        console.error('Error logging in:', error);
        // window.alert("Error occurs");
      }
    }

  }


  useEffect(() => {
    getId();
  }, []);


  return (

    <>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />



      <div className="container">
        <h3 className="text-center py-5 display-6">Change Your Password</h3>

        <form className="w-50 mx-auto" onSubmit={submit} style={{ maxWidth: '500px' }}>
          <div className="mb-4">
            <label htmlFor="currentPassword" className="form-label">Current Password</label>
            <input
              type="password"
              name="cpassword"
              className="form-control shadow-sm"
              id="currentPassword"
              onChange={handlechange}
              required
              style={{ borderRadius: '10px', padding: '10px' }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="form-label">New Password</label>
            <input
              type="password"
              name="password"
              className="form-control shadow-sm"
              id="newPassword"
              onChange={handlechange}
              required
              style={{ borderRadius: '10px', padding: '10px' }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
            <input
              type="password"
              name="confirm"
              className="form-control shadow-sm"
              id="confirmPassword"
              onChange={handlechange}
              required
              style={{ borderRadius: '10px', padding: '10px' }}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-success btn-lg px-4 py-2" style={{ borderRadius: '10px' }}>
              Change Password
            </button>
          </div>
        </form>
      </div>

    </>


  )
}

export default Changepassword