import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FeaturesForm.css';

const FeaturesForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState('');

    // Initialize all feature responses to false (unchecked)
    const [responses, setResponses] = useState({
        '3.1': false,
        '3.11': false,
        '3.12': false,
        '3.2': false,
        '3.3': false,
        '3.4': false,
        '3.5': false,
        '3.6': false,
        '3.7': false,
        '3.8': false,
        '3.9': false,
        
        // Add as many features as you have
    });

    // UseEffect to set userEmail and userId from location.state
    useEffect(() => {
        if (location.state) {
            setUserEmail(location.state.userEmail);
            setUserId(location.state.userId);
        }
    }, [location.state]);

    const handleCheckboxChange = (featureKey) => {
        setResponses(prevResponses => ({
            ...prevResponses,
            [featureKey]: !prevResponses[featureKey]
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const selectedFeatures = Object.entries(responses)
            .filter(([_, value]) => value)
            .map(([key]) => ({
                meta_key: key,
                meta_value: features[key], // Use the feature description as meta_value
            }));

        try {
            await axios.post('http://localhost:3000/user/submitFeaturesForm', {
                email: userEmail,
                user_id: userId,
                responses: selectedFeatures
            });
            navigate('/country-choice', { state: { userId, userEmail , selectedFeatures  } }); // Navigate to the next page
        } catch (error) {
            console.error('Error submitting features form:', error);
        }
    };

    const features = {
        '3.1': 'Low or Free Tuition Fees',
        '3.11': 'Cost of Food and Rent in the Area',
        '3.12': 'Access to Sport Facilities and Sport Clubs',
        '3.2': 'Prestigious Brand',
        '3.3': 'High-Quality Teaching',
        '3.4': 'International Diversity',
        '3.5': 'High Graduate Employment Rate',
        '3.6': 'Family Members Have Gone to That University',
        '3.7': 'Size of the University',
        '3.8': 'Research or Internship Opportunities',
        '3.9': 'Party Environment or Extracurricular Activities',
        'Variety of Courses': 'Variety of Courses',
        // Add as many features as you have
    };

    return (
        <div className="features-form-page"> {/* This is the new page wrapper with the background */}
            <div className="features-form-container">
                <h2>Check in The Most Important Features in Your Future University</h2>
                <form onSubmit={handleSubmit}>
                    <div className="feature-boxes">
                        {Object.entries(features).map(([key, description]) => (
                            <div key={key} className="feature-box">
                                <input
                                    type="checkbox"
                                    id={`feature-${key}`}
                                    checked={responses[key]}
                                    onChange={() => handleCheckboxChange(key)}
                                />
                                <label htmlFor={`feature-${key}`}>{description}</label>
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="btn btn-success mt-3">Next Page</button>
                </form>
            </div>
        </div>
    );
    
};

export default FeaturesForm;
