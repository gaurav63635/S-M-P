import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MemberComplain = () => {


  const [complains, setcomplains] = useState({
    about: "", message: ""
  });
  const [comp, setcomp] = useState([]);
  const [userId, setUserId] = useState(null);


  const handlechange = (e) => {
    setcomplains({ ...complains, [e.target.name]: e.target.value });
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

    const data = {
      id: userId,
      about: complains.about,
      message: complains.message
    }

    try {
      const response = await axios.post('https://e-housing-helping.onrender.com/complain/complain', data);

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
        setcomplains({
          about: "", message: ""
        });
        getcomplain();
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
        // alert(response.data.error);
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
      // alert("Error occurs");
    }
  }

  const getcomplain = async () => {

    try {
      const response = await axios.get(`http://localhost:7000/complain/complain/${userId}`);

      if (response.status === 200) {
        setcomp(response.data.complain);
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error('Error fetching complaints:', error);
      alert("Error fetching complaints");
    }
  }


  useEffect(() => {
    getId();
  }, []);

  useEffect(() => {
    if (userId) {
      getcomplain();
    }
  }, [userId]);


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



      <div className='container mt-5'>

        <div className="card text-center w-75 m-auto">
          <div className="card-header">
            <h4 className='text-center'>My Complains</h4>
          </div>
          <div className="card-body">
            <img src="./house.avif" className="card-img-top w-50" alt="Member House" />
            <h5 className="card-title mt-4">Make complains or view your past complains here</h5>
          </div>
          <div className="card-footer text-body-secondary">
            <button className='btn btn-outline-success mx-1' data-bs-toggle="modal" data-bs-target="#formModal" data-bs-whatever="@mdo">Make Complain</button>
            <button className='btn btn-outline-success mx-1' data-bs-toggle="modal" data-bs-target="#tableModal" data-bs-whatever="@mdo">My Complain</button>
          </div>
        </div>


        <div className="modal fade" id="formModal" tabindex="-1" aria-labelledby="formModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Make New Complain</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form className='w-75 m-auto mt-4'>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">About</label>
                    <input type="text" className="form-control" name='about' id="exampleInputPassword1" onChange={handlechange} value={complains.about} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Message</label>
                    <textarea type="text" className="form-control" name='message' id="exampleInputPassword1" onChange={handlechange} value={complains.message} />
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-outline-primary" onClick={submit}>Submit</button>
                    <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>


        <div className="modal fade" id="tableModal" tabindex="-1" aria-labelledby="tableModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">View Your Complains</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <table className='w-100 text-center'>
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Status</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comp.map((data) => (
                      <tr key={data._id}>
                        <td>{data.about}</td>
                        <td>{data.status || "Pending"}</td>
                        <td>
                          <button className='btn btn-success'>View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>

    </>


  )
}

export default MemberComplain