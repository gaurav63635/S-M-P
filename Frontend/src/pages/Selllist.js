import React, { useState, useEffect } from 'react'
import axios from 'axios';


const Selllist = () => {

    const [selllist, setselllist] = useState([]);


    const getData = async () => {
        try {
            const response = await axios.get(`https://e-housing-helping.onrender.com/selllist/selllist`);

            if (response.status === 200) {
                const sellData = response.data.data;
                const memberData = await Promise.all(
                    sellData.map(async (item) => {
                        const memberResponse = await axios.get(`https://e-housing-helping.onrender.com/member/member/${item.memberid}`);
                        const member = memberResponse.data.member;

                        let societyName = "N/A";
                        if (member.society) {
                            const societyResponse = await axios.get(`https://e-housing-helping.onrender.com/society/getsociety/${member.society}`);
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
            <h2 className="text-center mb-5">Sell Listings</h2>
            <div className="table-responsive">

                <table className="table table-striped table-bordered table-hover shadow-sm">
                    <thead className="table-success">
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Society Name</th>
                            <th scope="col">House No</th>
                            <th scope="col">Sell Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selllist.map((data, index) => (
                            <tr key={index}>
                                <td>{data.member?.firstname || "N/A"}</td>
                                <td>{data.member?.mobile || "N/A"}</td>
                                <td>{data.societyName}</td>
                                <td>{data.member?.houseno || "N/A"}</td>
                                <td>{data.Sellprice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>

    )
}

export default Selllist