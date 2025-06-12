import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* About */}
                <div>
                    <h2 className="text-lg font-bold mb-4">About Us</h2>
                    <p className="text-sm">
                        We are your one-stop shop for the best deals on amazing products.
                        Quality guaranteed.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-bold mb-4">Join Our Newsletter</h2>
                    <p className="text-sm mb-2">Get updates about new arrivals and special offers.</p>
                    <form className="flex">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="px-2 py-1 rounded-l bg-white text-black"
                        />
                        <button
                            type="submit"
                            className="px-3 py-1 bg-blue-600 text-white rounded-r hover:bg-blue-700"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>


                {/* Contact */}
                <div>
                    <h2 className="text-lg font-bold mb-4">Contact Us</h2>
                    <p className="text-sm">Email: saty665566@gmail.com</p>
                    <p className="text-sm">Phone: +1 (555) 123-4567</p>
                    <p className="text-sm">123 New Delhi-110076</p>
                </div>

                {/* Socials */}
                <div>
                    <h2 className="text-lg font-bold mb-4">Follow Us</h2>
                    <div className="flex space-x-4">
                        <Link to="https://facebook.com" target="_blank" rel="noreferrer">
                            <FaFacebook className="text-xl hover:text-blue-500" />
                        </Link>
                        <Link to="https://instagram.com" target="_blank" rel="noreferrer">
                            <FaInstagram className="text-xl hover:text-pink-500" />
                        </Link>
                        <Link to="https://twitter.com" target="_blank" rel="noreferrer">
                            <FaTwitter className="text-xl hover:text-blue-400" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Your Shop. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
