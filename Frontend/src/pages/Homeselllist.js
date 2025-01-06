import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';


const Homeselllist = () => {

    const [selllist, setselllist] = useState([]);


    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:7000/selllist/selllist`);

            if (response.status === 200) {
                const sellData = response.data.data;
                const memberData = await Promise.all(
                    sellData.map(async (item) => {
                        const memberResponse = await axios.get(`http://localhost:7000/member/member/${item.memberid}`);
                        const member = memberResponse.data.member;

                        let societyName = "N/A";
                        if (member.society) {
                            const societyResponse = await axios.get(`http://localhost:7000/society/getsociety/${member.society}`);
                            societyName = societyResponse.data.data.name;
                        }

                        return {
                            ...item,
                            member,
                            societyName
                        };
                    })
                );
                setselllist(memberData);
            } else {
                window.alert(response.data.error);
            }
        } catch (error) {
            console.error('Error fetching sell data:', error.response ? error.response.data : error.message);
            window.alert("Error occurs");
        }

    }


    useEffect(() => {
        getData();
    }, [])


    return (

        <div className="container my-5">
            <h2 className="text-center mb-5 display-6">Sell Listings</h2>
            <div className="table-responsive">

                <table className="table table-striped table-bordered table-hover text-center shadow-sm">
                    <thead className="table-success">
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Society Name</th>
                            <th scope="col">House No</th>
                            <th scope="col">Sell Price</th>
                            <th scope="col">View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selllist.map((data, index) => (
                            <tr key={index}>
                                <td>
                                    {data.member?.photo ? (
                                        <img
                                            src={`http://localhost:7000/${data.member.photo}`}
                                            alt="Member"
                                            className="img-fluid"
                                            style={{ maxWidth: '100px', height: 'auto' }}
                                        />
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                                <td>{data.societyName}</td>
                                <td>{data.member?.houseno || "N/A"}</td>
                                <td>{data.Sellprice}</td>
                                <td>
                                    <Link className='btn btn-outline-success' to={`/viewdetail/${data.member._id}`}>View</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>

    )
}

export default Homeselllist