import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Detail = () => {

    const { id } = useParams();

    const [member, setmember] = useState({});
    const [society, setsociety] = useState({});
    const [message, setmessage] = useState({
        name: "", subject: "", message: ""
    });

    const handlechange = (e) => {
        setmessage({ ...message, [e.target.name]: e.target.value });
    }

    const submit = async (e) => {
        e.preventDefault();

        const data = {
            memberid: id,
            name: message.name,
            subject: message.subject,
            message: message.message
        }

        try {
            const response = await axios.post('http://localhost:7000/message/message', data);

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
                setmessage({
                    name: "", subject: "", message: ""
                });
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

    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:7000/member/member/${id}`);

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
            window.alert("Error Fetching Member Data");
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


    useEffect(() => {
        getData();
    }, [id]);


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


            <div className='container my-5'>
                <h4 className='display-6 text-center mb-5'>Member & House Details</h4>

                <div className='row text-center'>
                    <div className='col-md-6'>
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="card-title mb-4">House Details</h5>
                                <p className="card-text"><strong>House No:</strong> {member.houseno}</p>
                                <p className="card-text"><strong>Society:</strong> {society.name}</p>
                                <p className="card-text"><strong>Address:</strong> {society.address}</p>
                                <p className="card-text"><strong>City:</strong> {society.city}</p>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="card-title mb-4">House Owner Details</h5>
                                <div className='row'>
                                    <div className='col-md-6 mb-4'>
                                        {member.photo ? (
                                            <img
                                                src={`http://localhost:7000/${member.photo}`}
                                                alt={`Photo of ${member.firstname} ${member.lastname}`}
                                                className="img-fluid rounded-circle shadow-sm"
                                                style={{ maxHeight: '300px', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <div className="bg-light rounded-circle shadow-sm d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
                                                <p className="text-muted">No Photo Available</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className='col-md-6 text-start'>
                                        <p><strong>Firstname:</strong> {member.firstname}</p>
                                        <p><strong>Lastname:</strong> {member.lastname}</p>
                                        <p><strong>Email:</strong> {member.email}</p>
                                        <p><strong>Mobile:</strong> {member.mobile}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-5">
                    <button className='btn btn-outline-success btn-lg' data-bs-toggle="modal" data-bs-target="#formModal">
                        Send Message
                    </button>
                </div>

                <div className="modal fade" id="formModal" tabIndex="-1" aria-labelledby="formModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="formModalLabel">Send message to owner</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className='w-75 m-auto mt-4'>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" className="form-control" name='name' id="name" onChange={handlechange} value={message.name} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="subject" className="form-label">Subject</label>
                                        <input type="text" className="form-control" name='subject' id="subject" onChange={handlechange} value={message.subject} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message" className="form-label">Message</label>
                                        <textarea className="form-control" name='message' id="message" rows="3" onChange={handlechange} value={message.message}></textarea>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-primary" onClick={submit}>Submit</button>
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>

    );

}

export default Detail