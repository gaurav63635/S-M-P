import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const Sellpage = () => {

  const [member, setmember] = useState(null);
  const [society, setsociety] = useState(null);
  const [userId, setUserId] = useState(null);
  const [sell, setSell] = useState({});


  const getId = () => {
    const token = localStorage.getItem('Member');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;
      setUserId(userId);
      console.log("User ID:", userId);
    }
  }

  const getData = async () => {
    try {
      const response = await axios.get(`https://e-housing-helping.onrender.com/member/member/${userId}`);

      if (response.status === 200) {
        setmember(response.data.member || null);
        if (response.data.member && response.data.member.society) {
          getSociety(response.data.member.society);
        }
      } else {
        window.alert(response.data.error);
      }
    } catch (error) {
      console.error('Error fetching member data in:', error);
      window.alert("Error occurs");
    }
  }

  const getSociety = async (societyId) => {
    try {
      const response = await axios.get(`https://e-housing-helping.onrender.com/society/getsociety/${societyId}`);

      if (response.status === 200) {
        setsociety(response.data.data || null);
      } else {
        window.alert(response.data.error);
      }
    } catch (error) {
      console.error('Error fetching society in:', error);
      window.alert("Error fetching society");
    }
  }

  const getSell = async () => {
    try {
      const response = await axios.get(`https://e-housing-helping.onrender.com/selllist/selllist/${userId}`);

      if (response.status === 200) {
        setSell(response.data);
      } else {
        window.alert(response.data.error);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  const editdata = async (id) => {
    try {
      const response = await axios.patch(`https://e-housing-helping.onrender.com/selllist/selllist/${id}`)

      if (response.status === 201) {
        alert(response.data.message);
        getSell();
      } else {
        window.alert(response.data.error);
      }
    } catch (error) {
      console.error('Error updating selling data in:', error);
      window.alert("Error updating selling data");
    }
  }

  const deletedata = async (id) => {
    try {
      const response = await axios.delete(`https://e-housing-helping.onrender.com/selllist/selllist/${id}`)

      if (response.status === 200) {
        alert(response.data.message);
        getSell();
      } else {
        window.alert(response.data.error);
      }
    } catch (error) {
      console.error('Error deleting Selling data in:', error);
      window.alert("Error deleting Selling data");
    }
  }


  useEffect(() => {
    getId();
  }, []);

  useEffect(() => {
    if (userId) {
      getData();
      getSell();
    }
  }, [userId]);


  return (

    <div className='container'>
      <h4 className='text-center py-5 display-6'>Your Home Selling Data</h4>

      {member && society ? (
        <div className='row'>
          <div className='col-md-4 text-center'>
            <img
              src={`http://localhost:7000/${member.photo}`}
              alt={`Photo of ${society.name}`}
              className='img-fluid rounded shadow-sm w-75'
            />
          </div>
          <div className='col-md-8'>
            <div className='card p-3 shadow-sm'>
              <h6>Society Name: <span className="text-muted">{society.name}</span></h6>
              <h6>House Number: <span className="text-muted">{member.houseno}</span></h6>
              <h6>Sell Price: <span className="text-muted">{sell.Sellprice ? sell.Sellprice : "No sell data available"}</span></h6>
            </div>
          </div>
        </div>
      ) : (
        <p className='text-center py-5'>Loading member or society data...</p>
      )}

      <div className='row'>
        <div className='col-12'>
          <table className='table table-hover table-bordered text-center w-75 m-auto mt-5'>
            <thead className='table-dark'>
              <tr>
                <th scope='col'>Action</th>
                <th scope='col'>House No</th>
                <th scope='col'>Society Name</th>
                <th scope='col'>Sell Price</th>
              </tr>
            </thead>

            <tbody>
              {sell && member && society ? (
                <tr>
                  <td>
                    <button className='btn btn-outline-warning mx-2' onClick={() => editdata(sell._id)}>Edit</button>
                    <button className='btn btn-outline-danger mx-2' onClick={() => deletedata(sell._id)}>Delete</button>
                  </td>
                  <td>{member.houseno}</td>
                  <td>{society.name}</td>
                  <td>{sell.Sellprice ? sell.Sellprice : "No Sell Data Available"}</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="4">Loading data...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>


  )

}

export default Sellpage