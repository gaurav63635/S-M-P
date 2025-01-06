import React, { useState } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Contact = () => {

    const [member, setmember] = useState({
        name: "", email: "", phone: "", desc: ""
    });

    const handlechange = (e) => {
        setmember({ ...member, [e.target.name]: e.target.value });
    }

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:7000/contact/contact", member);

            if (response.data.success) {
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

                setmember({ name: "", email: "", phone: "", desc: "" })
            }
        } catch (error) {
            alert("Server error occurs");
            console.error("error", error);
        }

    }


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


            <div className="container">
                <h2 className="text-center mt-5 display-6">Contact Us</h2>
                <hr className="w-25 mx-auto" />

                <form className="w-50 mx-auto py-4" onSubmit={submit} style={{ maxWidth: '600px' }}>
                    <div className="mb-3">
                        <label htmlFor="nameInput" className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control shadow-sm"
                            id="nameInput"
                            aria-describedby="nameHelp"
                            onChange={handlechange}
                            value={member.name}
                            required
                            style={{ borderRadius: '10px', padding: '10px' }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="emailInput" className="form-label">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control shadow-sm"
                            id="emailInput"
                            aria-describedby="emailHelp"
                            onChange={handlechange}
                            value={member.email}
                            required
                            style={{ borderRadius: '10px', padding: '10px' }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phoneInput" className="form-label">Phone</label>
                        <input
                            type="number"
                            name="phone"
                            className="form-control shadow-sm"
                            id="phoneInput"
                            onChange={handlechange}
                            value={member.phone}
                            required
                            style={{ borderRadius: '10px', padding: '10px' }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="messageInput" className="form-label">Message</label>
                        <textarea
                            name="desc"
                            className="form-control shadow-sm"
                            id="messageInput"
                            rows="4"
                            onChange={handlechange}
                            value={member.desc}
                            required
                            style={{ borderRadius: '10px', padding: '10px' }}
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-success btn-lg px-4 py-2" style={{ borderRadius: '10px' }}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>


        </>


    )
}

export default Contact