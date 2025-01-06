import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Society from '../components/Society';
import House from '../components/House';
import HouseReport from '../components/HouseReport';
import AllocateHouse from '../components/AllocateHouse';
import MemberReport from '../components/MemberReport';
import ComplainList from '../components/ComplainList';
import Selllist from './Selllist';
import Rentlist from './Rentlist';

const Adminworks = () => {

    const navigate = useNavigate();

    const [data, setdata] = useState("")

    const components = (data) => {
        setdata(data);
    }

    useEffect(() => {
        components("addsociety");
    }, [])

    const logout = () => {
        localStorage.removeItem("Admin");
        alert("Admin logout successfully");
        navigate("/");
    }

    const renderComponent = () => {
        switch (data) {
            case "addsociety":
                return <Society />;
            case "addhouse":
                return <House />;
            case "housereport":
                return <HouseReport />;
            case "allocatehouse":
                return <AllocateHouse />;
            case "memberreport":
                return <MemberReport />;
            case "complain":
                return <ComplainList />;
            case "sellhouse":
                return <Selllist />;
            case "renthouse":
                return <Rentlist />;
            case "logout":
                return logout();
            default:
                return null;
        }
    }


    return (

        <div className='container'>
            <div className='row mt-5'>

                <div className='col-3'>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <button className="btn btn-outline-primary text-center mb-2">
                            <Link className="nav-link active py-2" onClick={() => components("addsociety")}>Add Society</Link>
                        </button>
                        <button className="btn btn-outline-primary text-center mb-2">
                            <Link className="nav-link active py-2" onClick={() => components("addhouse")}>Add House</Link>
                        </button>
                        <button className="btn btn-outline-primary text-center mb-2">
                            <Link className="nav-link active py-2" onClick={() => components("housereport")}>House Report</Link>
                        </button>
                        <button className="btn btn-outline-primary text-center mb-2">
                            <Link className="nav-link active py-2" onClick={() => components("allocatehouse")}>Allocate House</Link>
                        </button>
                        <button className="btn btn-outline-primary text-center mb-2">
                            <Link className="nav-link active py-2" onClick={() => components("memberreport")}>Member Report</Link>
                        </button>
                        <button className="btn btn-outline-primary text-center mb-2">
                            <Link className="nav-link active py-2" onClick={() => components("complain")}>Complain</Link>
                        </button>
                        <button className="btn btn-outline-primary text-center mb-2">
                            <Link className="nav-link active py-2" onClick={() => components("sellhouse")}>Sell House Report</Link>
                        </button>
                        <button className="btn btn-outline-primary text-center mb-2">
                            <Link className="nav-link active py-2" onClick={() => components("renthouse")}>Rent House Report</Link>
                        </button>
                        <button className="btn btn-outline-primary text-center mb-2">
                            <Link className="nav-link active py-2" onClick={() => components("logout")}>Logout</Link>
                        </button>
                    </ul>
                </div>

                <div className='col-9'>
                    {renderComponent()}
                </div>

            </div>
        </div>

    )
}

export default Adminworks