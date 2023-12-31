import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faGithub,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

const Hero = () => {
    return (
        <div className="bg-hero bg-cover bg-center h-screen items-center mx-3">
            <h1 className="text-blue-500 text-3xl sm:text-6xl lg:text-9xl font-bold mb-4">
                Hi, my name is
            </h1>
            <h2 className="text-red-600 name text-4xl sm:text-6xl lg:text-9xl font-bold mb-5">
                Suraj.
            </h2>
            <p className="text-white sm:text-lg lg:text-2xl mt-8">
                Hello friends I’m a new Developer from India. Please support me
                specializing in building (and occasionally designing)
                exceptional digital experiences. Currently, I’m focused on
                Node.js.
            </p>
            <div className="flex mt-4">
                <a
                    href="#"
                    className="mr-4 text-gray-400 hover:text-green-500"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faGithub} size="lg" />
                </a>
                <a
                    href="#"
                    className="mr-4 text-gray-400 hover:text-green-500"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faFacebook} size="lg" />
                </a>
                <a
                    href="#"
                    className="mr-4 text-gray-400 hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faTwitter} size="lg" />
                </a>
                <a
                    href="#"
                    className="text-gray-400 hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faInstagram} size="lg" />
                </a>
            </div>
        </div>
    );
};

export default Hero;
