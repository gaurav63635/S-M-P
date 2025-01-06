import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';


const MemberAccount = () => {

  const [member, setmember] = useState(null);
  const [society, setsociety] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [edit, setedit] = useState(false);
  const [update, setupdate] = useState({});

  const handlechange = (e) => {
    setupdate({ ...update, [e.target.name]: e.target.value });
  }

  const getId = () => {
    const token = localStorage.getItem('Member');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;
      setUserId(userId);
    }
  }

  const getData = async () => {
    try {
      const response = await axios.get(`https://e-housing-helping.onrender.com/member/member/${userId}`);

      if (response.status === 200) {
        setmember(response.data.member || null);
        if (response.data.member && response.data.member.society) {
          getSociety(response.data.member.society);
        } else {
          setLoading(false);
        }
      } else {
        window.alert(response.data.error);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching member data in:', error);
      window.alert("Error occurs");
      setLoading(false);
    }
  }

  const getSociety = async (societyId) => {
    try {
      const response = await axios.get(`http://localhost:7000/society/getsociety/${societyId}`);

      if (response.status === 200) {
        setsociety(response.data.data || null);
      } else {
        window.alert(response.data.error);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching society in:', error);
      window.alert("Error fetching society");
      setLoading(false);
    }
  }

  const updatemember = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`http://localhost:7000/member/member/${userId}`, update)

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
        // alert(response.data.message);
        setedit(false);
        getData();
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      toast.error('🦄 Error occurs during updating the data!', {
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
      // alert("Error occurs during updating the data");
    }
  }


  useEffect(() => {
    getId();
  }, []);

  useEffect(() => {
    if (userId) {
      getData();
    }
  }, [userId]);

  useEffect(() => {
    if (edit && member) {
      setupdate({
        firstname: member.firstname,
        lastname: member.lastname,
        email: member.email,
        mobile: member.mobile,
      });
    }
  }, [edit, member]);

  if (loading) {
    return <div>Loading member or society data...</div>;
  }

  if (!member) {
    return <div>No member data available.</div>;
  }

  const editform = () => {
    if (edit) {
      return (
        <form className='w-50 m-auto card p-4 shadow-sm'>
          <h4 className='text-center mb-4'>Update Account Details</h4>

          <div className="mb-3">
            <label htmlFor="firstname" className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              name='firstname'
              id="firstname"
              aria-describedby="firstNameHelp"
              onChange={handlechange}
              value={update.firstname}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              name='lastname'
              id="lastname"
              onChange={handlechange}
              value={update.lastname}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name='email'
              id="email"
              onChange={handlechange}
              value={update.email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">Mobile</label>
            <input
              type="number"
              className="form-control"
              name='mobile'
              id="mobile"
              onChange={handlechange}
              value={update.mobile}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" onClick={updatemember}>Submit</button>
        </form>

      )
    } else {
      return (
        <div className="container">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Your Details</h4>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-4">
                  <strong>First Name:</strong>
                </div>
                <div className="col-sm-8">
                  {member.firstname}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4">
                  <strong>Last Name:</strong>
                </div>
                <div className="col-sm-8">
                  {member.lastname}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4">
                  <strong>Email:</strong>
                </div>
                <div className="col-sm-8">
                  {member.email}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4">
                  <strong>Mobile:</strong>
                </div>
                <div className="col-sm-8">
                  {member.mobile}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4">
                  <strong>Society Name:</strong>
                </div>
                <div className="col-sm-8">
                  {society.name}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4">
                  <strong>Members:</strong>
                </div>
                <div className="col-sm-8">
                  {member.totalmembers}
                </div>
              </div>
              <div className="text-center">
                <button className="btn btn-outline-success" onClick={() => setedit(true)}>
                  Edit Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }


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


      <div className='container'>
        <h2 className='text-center py-5 display-5'>My Account</h2>

        {editform()}
      </div>


    </>


  )
}

export default MemberAccount