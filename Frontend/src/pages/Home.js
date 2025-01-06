import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const Home = () => {

    const [images, setImages] = useState([]);


    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('https://api.unsplash.com/search/photos', {
                    params: {
                        query: 'universe',
                        client_id: 'kA-zydsmeLXPKoB_5jA78VpnAoHJT0Fc2r1m1AXbSUs',
                        per_page: 3
                    }
                });
                setImages(response.data.results);
            } catch (error) {
                console.error('Error fetching images', error);
            }
        };

        fetchImages();
    }, []);


    return (

        <div>
            {/* Carousel */}
            <div id="carouselExampleCaptions" className="carousel slide" style={{ height: '450px', overflow: 'hidden' }}>
                <div className="carousel-inner">
                    {images.map((image, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <img src={image.urls.regular} className="d-block w-100" alt={`Slide ${index + 1}`} style={{ height: '450px', objectFit: 'cover' }} />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Slide {index + 1}</h5>
                                <p>Description for slide {index + 1}.</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* Welcome Section */}
            <div className="container py-5">

                <div className="row align-items-center">
                    <div className="col-md-4 d-flex justify-content-center">
                        <img
                            src="./login.webp"
                            alt="Member"
                            className="img-fluid rounded-circle shadow-lg zoom-in"
                            style={{ width: '250px', height: '250px', objectFit: 'cover' }}
                        />
                    </div>
                    <div className="col-md-8 text-center">
                        <h5 className="mb-4 fade-in">Welcome To E-Housing Helping Society</h5>
                        <p className="lead fade-in">
                            We provide comprehensive solutions for housing needs, whether you’re looking to rent or sell your property. Explore our services and find the best fit for you.
                        </p>
                        <div>
                            <button className="btn btn-outline-success me-2 bounce-in" onClick={() => console.log('Rent Home')}>Rent Home</button>
                            <button className="btn btn-outline-success bounce-in" onClick={() => console.log('Sell Home')}>Sell Home</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="bg-light py-5 text-center">
                <div className="container">
                    <h2 className="mb-4 fade-in">Get Started with E-Housing</h2>
                    <p className="lead mb-4 fade-in">
                        Sign in now to access your dream home or list your home for sell or rent. Our platform offers a range of services tailored to your housing needs.
                    </p>
                    <a href="/signup" className="btn btn-outline-primary btn-lg pulse">Sign In Now</a>
                </div>
            </div>

        </div>

    );
};

export default Home;
