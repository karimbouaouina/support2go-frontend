import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt, faHeadset, faUsers, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';

library.add(fas);

function HomePage() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
  
    const handleTicketSubmitClick = () => {
        if (token) {
            navigate('/submit-ticket'); 
        } else {
            navigate('/login');
        }
    };
    const handleDashboardClick = () => {
        if (token) {
            navigate('/user-dashboard'); 
        } else {
            navigate('/login');
        }
    };
    const handleSignUpClick = () => {
        if (token) {
            navigate('/user-dashboard'); 
        } else {
            navigate('/register');
        }
    };
    const handleRedirect = () => {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const decoded = jwtDecode(token);
            if (decoded.user.isAdmin) {
              navigate('/admin-dashboard', { replace: true });
            } else {
              navigate('/user-dashboard', { replace: true });
            }
          } catch (e) {
            console.error('Error decoding token', e);
            navigate('/login', { replace: true });
          }
        } else {
          navigate('/login', { replace: true });
        }
        window.scrollTo(0, 0);
      };

    return (
        <div className="bg-blue-50 min-h-screen">
            <nav className="bg-white text-black py-4 shadow-md">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between">
                        <div className="flex space-x-4">
                            <Link to="/" className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                                <FontAwesomeIcon icon={faTicketAlt} className="text-blue-500 mr-2" />
                                <span className="font-bold">Support2Go</span>
                            </Link>
                            <div className="hidden md:flex items-center space-x-1">
                                <a href="#" className="py-5 px-3 text-gray-700 hover:text-gray-900">Home</a>
                                <ScrollLink to="about" smooth={true} duration={500} className="py-5 px-3 text-gray-700 hover:text-gray-900 cursor-pointer">About Us</ScrollLink>
                                <ScrollLink to="feedback" smooth={true} duration={500} className="py-5 px-3 text-gray-700 hover:text-gray-900 cursor-pointer">Feedback</ScrollLink>
                                <a href="/faq" className="py-5 px-3 text-gray-700 hover:text-gray-900">FAQ</a>
                                <a href="#" onClick={handleRedirect} className="py-5 px-3 text-gray-700 hover:text-gray-900">Dashboard</a>
                            </div>
                        </div>
                        {!token && (
                            <div className="hidden md:flex items-center space-x-1">
                                <Link to="/login" className="py-3 px-6 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300">Login</Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <header className="bg-blue-600 text-white">
                <div className="max-w-6xl mx-auto px-4 py-16 md:py-32 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to Our Support Ticket System</h1>
                    <p className="text-xl md:text-2xl mb-8">Get the help you need, whenever and for whatever you need.</p>
                    <button onClick={handleTicketSubmitClick} className="bg-white text-blue-600 font-bold py-3 px-6 rounded-full hover:bg-blue-100 transition-colors duration-300">Submit a Ticket</button>
                </div>
            </header>

            <section id="about" className="max-w-6xl mx-auto px-4 py-16">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-semibold text-gray-800">About Us</h2>
                        <p className="text-gray-500">Dedicated to providing exceptional support.</p>
                    </div>
                    <div className="flex flex-col md:flex-row md:space-x-6">
                        <div className="md:w-1/2 text-gray-600 mb-6 md:mb-0">
                            <p>At Support2Go, we understand that your time is valuable. That's why we've crafted a user-centric platform that prioritizes efficiency and ease-of-use. Our dedicated team is always on standby, ready to provide the answers you need with minimal delay.</p>
                            <p className="mt-4">We believe in the power of community and collaboration, and our platform serves as a conduit for shared knowledge and support. Join the thousands of satisfied users who have made Support2Go their go-to solution for all their support needs.</p>
                        </div>
                        <div className="md:w-1/2">
                            <img src="https://codemotion.us/wp-content/uploads/2023/08/cdmninja_07945_two_men_in_casual_clothes_sitting_on_fluffy_phys_99a9be9a-49be-4a60-beab-d9fde2a558f2-1.jpg" alt="Image showcasing the Support2Go platform" className="rounded-lg shadow-lg"/>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-semibold text-gray-800">Why Choose Us?</h2>
                    <p className="text-gray-500">Our commitment to providing exceptional support is unmatched.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <FontAwesomeIcon icon={faHeadset} className="text-blue-500 text-4xl mb-3" />
                        <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                        <p className="text-gray-600">Our team is available around the clock to assist you with any issues.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <FontAwesomeIcon icon={faUsers} className="text-blue-500 text-4xl mb-3" />
                        <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
                        <p className="text-gray-600">We listen to our users and continuously improve based on your feedback.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <FontAwesomeIcon icon={faShieldAlt} className="text-blue-500 text-4xl mb-3" />
                        <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
                        <p className="text-gray-600">We prioritize your privacy and the security of your data.</p>
                    </div>
                </div>
            </section>

            <section id="feedback" className="max-w-6xl mx-auto px-4 py-16">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-semibold text-gray-800">What Our Clients Say</h2>
                        <p className="text-gray-500">Join the Support2Go Family</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <p className="text-gray-600 mb-4">"My computer wouldn't boot up no matter what I tried. Support2Go's tech team was incredibly patient and walked me through several steps over the phone. In the end, it was a simple fix, but they never made me feel silly for missing it. Truly top-notch service!"</p>
                            <div className="flex items-center">
                                <img src="https://scontent.ftun16-1.fna.fbcdn.net/v/t39.30808-1/417491257_3733063413589652_8141491037205687074_n.jpg?stp=dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ET8jDk8cpbAAb4uDfTN&_nc_oc=Adhc_jvKa4_Ja2aOVCuZ6xl-fLk4IwxuY5NSMSWUxq_9IERmPUdjzvpDeVEKYxlpqEE&_nc_ht=scontent.ftun16-1.fna&oh=00_AfBkmYo2FId4o72t1wYyUXtI7bRdE6ODAktUEJ5J7bm2mQ&oe=661D2C2B" alt="Profile picture of John Doe" className="rounded-full mr-4 h-14 w-14"/>
                                <div>
                                    <p className="font-bold text-blue-700">Oussema Dhraief</p>
                                    <p className="text-sm text-gray-600">Tunisia</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <p className="text-gray-600 mb-4">"I encountered a glitch while setting up my online store, which was quite frustrating. The Support2Go team was knowledgeable about e-commerce platforms and helped me solve the problem quickly. Their support has been invaluable in getting my business online."</p>
                            <div className="flex items-center">
                                <img src="https://scontent.ftun16-1.fna.fbcdn.net/v/t39.30808-1/347398497_1403767053744062_499841040857976201_n.jpg?stp=c0.0.200.200a_cp6_dst-jpg_p200x200&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ew6bAk0lSrkAb4kqwuL&_nc_ht=scontent.ftun16-1.fna&oh=00_AfBdoCSocJ9LWVtAylS7KNh0USYUTOh2CFQaH0swNJMw1A&oe=661D148B" alt="Profile picture of Jane Smith" className="rounded-full mr-4 h-14 w-14"/>
                                <div>
                                    <p className="font-bold text-blue-700">Youssef Raies</p>
                                    <p className="text-sm text-gray-600">France</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-6 text-center mb-12">
                    <h2 className="text-3xl font-semibold text-gray-800">Ready to Get Started?</h2>
                    <p className="text-gray-500 mb-5">Join the thousands of satisfied customers using our platform.</p>
                    <button onClick={handleRedirect} className="py-3 px-6 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300">Sign Up Today</button>
                </div>
            </section>

            <footer className="bg-blue-600 text-white py-8">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex justify-center mb-4 space-x-4">
                        <a href="/register/tos" className="hover:underline text-sm">Terms of Service</a>
                        <span className="text-sm">|</span>
                        <a href="#" className="hover:underline text-sm">Privacy Policy</a>
                        <span className="text-sm">|</span>
                        <a href="#" className="hover:underline text-sm">Cookie Policy</a>
                        <span className="text-sm">|</span>
                        <a href="#" className="hover:underline text-sm">Help Center</a>
                    </div>
                    <p className="text-sm">&copy; 2024 Support2Go. All rights reserved.</p>
                    <p className="text-sm">Designed by Karim Bouaouina</p>
                </div>
            </footer>
        </div>
    );
}

export default HomePage;
