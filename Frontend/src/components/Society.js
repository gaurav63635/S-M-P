import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Society = () => {

  const [data, setdata] = useState({
    name: "", houses: "", address: "", city: "", pincode: ""
  })

  const [first, setfirst] = useState([]);

  const handlechange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  }

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://e-housing-helping.onrender.com/society/addsociety", data);

      if (response.status === 201) {
        window.alert(response.data.message);
        getdata();
      } else {
        window.alert(response.data.error);
      }
    } catch (error) {
      console.error('Error in:', error);
      window.alert("Error occurs");
    }
  }

  const getdata = async () => {
    try {
      const response = await axios.get("https://e-housing-helping.onrender.com/society/allsociety");

      if (response.status === 200) {
        setfirst(response.data.data);
        console.log(response.data.data);
      } else {
        window.alert(response.data.error);
      }
    } catch (error) {
      console.error('Error fetching society data in:', error);
      window.alert("Error occurs");
    }
  }

  const deletedata = async (id) => {

    try {
      const response = await axios.delete(`https://e-housing-helping.onrender.com/society/deletesociety/${id}`);

      if (response.status === 200) {
        window.alert(response.data.message);
        getdata();
      } else {
        window.alert(response.data.error);
      }
    } catch (error) {
      console.error('Error deleting society data in:', error);
      window.alert("Error occurs");
    }
  }

  useEffect(() => {
    getdata();
  }, [])


  return (

    <>

      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Society Name</label>
          <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='name' value={data.name} onChange={handlechange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">NO Of Houses</label>
          <input type="number" class="form-control" id="exampleInputPassword1" name='houses' value={data.houses} onChange={handlechange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
          <input type="text" class="form-control" id="exampleInputPassword1" name='address' value={data.address} onChange={handlechange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">City</label>
          <input type="text" class="form-control" id="exampleInputPassword1" name='city' value={data.city} onChange={handlechange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Pincode</label>
          <input type="number" class="form-control" id="exampleInputPassword1" name='pincode' value={data.pincode} onChange={handlechange} />
        </div>

        <button type="submit" className="btn btn-outline-success" onClick={submit}>Add Society</button>
      </form>

      <table className="table mt-4">
        <thead>
          <tr>
            <th scope="col">Action</th>
            <th scope="col">Image</th>
            <th scope="col">Society</th>
            <th scope="col">Address</th>
            <th scope="col">City</th>
            <th scope="col">Pincode</th>
            <th scope="col">House</th>
          </tr>
        </thead>
        <tbody>
          {
            first.map((data, index) => (
              <tr key={index}>
                <th>
                  <button className='btn btn-outline-danger' onClick={() => deletedata(data._id)}>Delete</button>
                </th>
                <td>{data.image}</td>
                <td>{data.name}</td>
                <td>{data.address}</td>
                <td>{data.city}</td>
                <td>{data.pincode}</td>
                <td>{data.houses}</td>
              </tr>
            )
            )
          }
        </tbody>
      </table>

    </>

  )
}

export default Society