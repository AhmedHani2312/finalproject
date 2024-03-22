import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Personalityform.css';
import axios from 'axios';

const PersonalityForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state?.userId;
    const userEmail = location.state?.userEmail;

    const [responses, setResponses] = useState({
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: userEmail,
    });

    const handleRadioChange = (question, value) => {
        setResponses({ ...responses, [question]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const dataToSend = {
                email: userEmail,
                user_id: userId,
                responses: responses
            };
            await axios.post('http://localhost:3000/user/submitPersonalityForm', dataToSend);
            navigate('/features-form', { state: { userId: userId, userEmail: userEmail } });
        } catch (error) {
            console.error('Error submitting form:', error.response ? error.response.data : error.message);
        }
    };

    const questions = [
        "I see myself as open to experience, (Imaginative)",
        "I see myself as dependable, (Organized)",
        "I see myself as extroverted, (Enthusiastic)",
        "I see myself as agreeable, (Kind)",
        "I see myself as emotionally stable, (Calm)",
    ];

    return (
        <div className="personality-page">
            <div className="personality-content"></div>
            <div className="personality-form-container">
                <h2>Please let us know a bit more about Yourself!</h2>
                <form onSubmit={handleSubmit}>
                    {questions.map((question, index) => (
                        <div key={index} className="question">
                            <p><strong>{index + 1}. {question}</strong></p>
                            <div className="radio-buttons">
                                {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option) => (
                                    <label key={option}>
                                        <input
                                            type="radio"
                                            name={`${index + 1}`}
                                            value={option}
                                            checked={responses[`${index + 1}`] === option}
                                            onChange={() => handleRadioChange(`${index + 1}`, option)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button type="submit">Next Page</button>
                </form>
            </div>
        </div>
    );
};

export default PersonalityForm;