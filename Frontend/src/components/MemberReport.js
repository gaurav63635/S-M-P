import React, { useState, useEffect } from 'react'
import axios from 'axios';

const MemberReport = () => {

  const [first, setfirst] = useState([]);
  const [data, setdata] = useState("");
  const [members, setmembers] = useState([]);
  const [table, settable] = useState();

  const handle = (e) => {
    setdata(e.target.value);
  }

  const getdata = async () => {
    try {
      const response = await axios.get(`https://e-housing-helping.onrender.com/society/allsociety`);

      if (response.status === 200) {
        setfirst(response.data.data);
      } else {
        window.alert(response.data.error);
      }
    } catch (error) {
      console.error('Error fetching society data in:', error);
      window.alert("Error occurs");
    }
  }

  const view = async (e) => {
    e.preventDefault();

    if (!data) {
      window.alert("Please select a society");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:7000/member/getmembersbysociety/${data}`);

      if (response.status === 200) {
        setmembers(response.data.members);
        settable(true);
      } else if (response.status === 404) {
        window.alert(response.data.message);
        settable(false);
      } else {
        window.alert("Unexpected response status: " + response.status);
        settable(false);
      }
    } catch (error) {
      window.alert("Members not found for selected society");
      console.log("error", error);
      settable(false);
    }

  }

  const deletedata = async (id) => {

    try {
      const response = await axios.delete(`http://localhost:7000/member/member/${id}`);

      if (response.status === 200) {
        window.alert(response.data.message);
      } else {
        window.alert(response.data.error);
      }
    } catch (error) {
      console.error('Error deleting member data in:', error);
      window.alert("Error occurs");
    }
  }


  const tables = () => {
    if (table) {
      return (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Action</th>
              <th scope="col">Image</th>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">House No</th>
              <th scope="col">Members</th>
            </tr>
          </thead>
          <tbody>
            {
              members.map((data) => (
                <tr key={data._id}>
                  <td>
                    <button className='btn btn-danger' onClick={() => deletedata(data._id)}>Delete</button>
                  </td>
                  <td>
                    {data.photo && <img src={data.photo} alt="Member" style={{ width: '100px', height: 'auto' }} />}
                  </td>
                  <td>{data.firstname}</td>
                  <td>{data.lastname}</td>
                  <td>{data.email}</td>
                  <td>{data.mobile}</td>
                  <td>{data.houseno}</td>
                  <td>{data.totalmembers}</td>
                </tr>
              )
              )
            }
          </tbody>
        </table>
      )
    }
  }


  useEffect(() => {
    getdata();
  }, [])


  return (

    <>

      <form className='w-50 mb-5 m-auto'>
        <label className="form-label">Society</label>
        <select className="form-control" name='society' onChange={handle} value={data} id="exampleInputCountry">
          <option value="" disabled>Select society</option>
          {first.map((society) => (
            <option key={society._id} value={society._id}>{society.name}</option>
          ))}
        </select>

        <button type="submit" className="btn btn-outline-primary mt-2 m-auto" onClick={view}>View</button>
      </form>


      {tables()}

    </>


  )
}

export default MemberReport