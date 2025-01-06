import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const Memberworks = () => {

    const [member, setmember] = useState(null);
    const [society, setsociety] = useState(null);
    const [userId, setUserId] = useState(null);
    const [rentedit, setrentedit] = useState(false);
    const [selledit, setselledit] = useState(false);
    const [rent, setrent] = useState({
        Rentprice: ""
    });
    const [sell, setsell] = useState({
        Sellprice: ""
    });


    const handlechange = (e) => {
        setrent({ ...rent, [e.target.name]: e.target.value });
    }

    const handlechangesell = (e) => {
        setsell({ ...sell, [e.target.name]: e.target.value });
    }

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
            const response = await axios.get(`http://localhost:7000/member/member/${userId}`);

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
            const response = await axios.get(`http://localhost:7000/society/getsociety/${societyId}`);

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

    const Addrent = async (e) => {
        e.preventDefault();

        const data = {
            memberid: userId,
            Rentprice: rent.Rentprice
        };

        try {
            const response = await axios.post('http://localhost:7000/rentlist/memberrent', data);

            if (response.status === 201) {
                alert(response.data.message);
                setrentedit(false);
            } else {
                alert(response.data.error);
            }
        } catch (error) {
            alert("Error occurs");
        }
    }

    const Addsell = async (e) => {
        e.preventDefault();

        const data = {
            memberid: userId,
            Sellprice: sell.Sellprice
        };

        try {
            const response = await axios.post('http://localhost:7000/selllist/membersell', data);

            if (response.status === 201) {
                alert(response.data.message);
                setselledit(false);
            } else {
                alert(response.data.error);
            }
        } catch (error) {
            alert("Error occurs");
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


    const rentforms = () => {
        if (rentedit) {
            return (
                <form>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Rent Price</label>
                        <input type="number" className="form-control" name='Rentprice' id="exampleInputPassword1" onChange={handlechange} value={rent.Rentprice} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={Addrent}>Submit</button>
                </form>
            )
        }
    }

    const sellforms = () => {
        if (selledit) {
            return (
                <form>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Sell Price</label>
                        <input type="number" className="form-control" name='Sellprice' id="exampleInputPassword1" onChange={handlechangesell} value={sell.Sellprice} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={Addsell}>Submit</button>
                </form>
            )
        }
    }


    return (

        <div className="container py-5">
            <h4 className="text-center mb-5 display-6">Welcome to E-Housing Helping Society</h4>

            {member && society ? (
                <div className="row mt-5">
                    <div className="col-md-4 text-center mb-4">
                        {member.photo ? (
                            <img
                                src={`http://localhost:7000/${member.photo}`}
                                alt={`Photo of ${society.name}`}
                                className="img-fluid rounded shadow-sm"
                                style={{ maxHeight: '300px', objectFit: 'cover' }}
                            />
                        ) : (
                            <div className="bg-light rounded shadow-sm d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
                                <p className="text-muted">No Photo Available</p>
                            </div>
                        )}
                    </div>


                    <div className="col-md-8">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title text-secondary mb-4">Society Name: <span className="text-dark">{society.name}</span></h5>
                                <h6 className="card-subtitle mb-5 text-muted">House Number: <span className="text-dark">{member.houseno}</span></h6>

                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="rent-tab" data-bs-toggle="tab" data-bs-target="#rent" type="button" role="tab" onClick={() => setrentedit(true)}>Rent Home</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="sell-tab" data-bs-toggle="tab" data-bs-target="#sell" type="button" role="tab" onClick={() => setselledit(true)}>Sell Home</button>
                                    </li>
                                </ul>

                                <div className="tab-content mt-4" id="myTabContent">
                                    <div className="tab-pane fade show active" id="rent" role="tabpanel">
                                        {rentforms()}
                                    </div>
                                    <div className="tab-pane fade" id="sell" role="tabpanel">
                                        {sellforms()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center text-muted py-5">Loading member or society data...</p>
            )}
        </div>

    )
}

export default Memberworks