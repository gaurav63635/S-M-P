import React, { useState, useEffect } from 'react'
import axios from 'axios';

const AllocateHouse = () => {

  const [data, setdata] = useState({
    firstname: "", lastname: "", email: "", mobile: "", DOB: "", totalmembers: "", society: "", houseno: "", username: "", password: ""
  });

  const [first, setfirst] = useState([]);

  const [photo, setPhoto] = useState(null);


  const handlechange = (e) => {
    if (e.target.name === 'photo') {
      setPhoto(e.target.files[0]); // Handle file input
    } else {
      setdata({ ...data, [e.target.name]: e.target.value });
    }
  };


  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const response = await axios.post("https://e-housing-helping.onrender.com/member/addmember", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        window.alert(response.data.message);
      } else {
        window.alert(response.data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      window.alert("Error occurs");
    }
  };


  const getdata = async () => {
    try {
      const response = await axios.get("http://localhost:7000/society/allsociety");

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

  useEffect(() => {
    getdata();
  }, [])


  return (

    <form onSubmit={submit}>

      <div className="mb-3">
        <label className="form-label">Firstname</label>
        <input type="text" name="firstname" className="form-control" onChange={handlechange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Lastname</label>
        <input type="text" name="lastname" className="form-control" onChange={handlechange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" name="email" className="form-control" onChange={handlechange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Mobile</label>
        <input type="number" name="mobile" className="form-control" onChange={handlechange} />
      </div>
      <div className="mb-3">
        <label className="form-label">DOB</label>
        <input type="date" name="DOB" className="form-control" onChange={handlechange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Total Members</label>
        <input type="number" name="totalmembers" className="form-control" onChange={handlechange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Society</label>
        <select className="form-control" id="exampleInputCountry" onChange={handlechange} name='society'>
          <option value="" disabled>Select society</option>
          {first.map((society) => (
            <option key={society.id} value={society.name}>{society.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">House No</label>
        <input type="number" name="houseno" className="form-control" onChange={handlechange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Photo</label>
        <input type="file" name="photo" className="form-control" onChange={handlechange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input type="text" name="username" className="form-control" onChange={handlechange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input type="password" name="password" className="form-control" onChange={handlechange} />
      </div>

      <button type="submit" className="btn btn-primary">Add House</button>

    </form>

  );
};

export default AllocateHouse