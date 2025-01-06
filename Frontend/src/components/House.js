import React, { useState } from 'react'
import axios from 'axios';

const House = () => {

    const [data, setdata] = useState({
        society: "", block: "", house: "", detail: ""
    })

    const handlechange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    }

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://e-housing-helping.onrender.com/house", data);

            if (response.status === 201) {
                window.alert(response.data.message);
            } else {
                window.alert(response.data.error);
            }
        } catch (error) {
            console.error('Error in:', error);
            window.alert("Error occurs");
        }

    }


    return (

        <form>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Society</label>
                <input type="email" name='society' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handlechange} />
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Block NO</label>
                <input type="password" name='block' class="form-control" id="exampleInputPassword1" onChange={handlechange} />
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">House Type</label>
                <input type="password" name='house' class="form-control" id="exampleInputPassword1" onChange={handlechange} />
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Detail</label>
                <input type="password" name='detail' class="form-control" id="exampleInputPassword1" onChange={handlechange} />
            </div>

            <button type="submit" class="btn btn-primary" onClick={submit}>Add House</button>
        </form>

    )
}

export default House