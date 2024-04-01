//usabilitysurveyform.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './UsabilitySurveyForm.css';

const UsabilitySurveyForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State to hold user data and survey responses
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [responses, setResponses] = useState({});

  // Fetch userId and userEmail from location state on component mount
  useEffect(() => {
    if (location.state) {
      setUserEmail(location.state.userEmail);
      setUserId(location.state.userId);
    }
  }, [location.state]);

  const questions = [
    "The website's navigation is clear and easy to navigate.",
    "The website's content is relevant and valuable.",
    "The website's design is aesthetically pleasing.",
    // Add more questions according to your survey's needs
  ];

  // Handle changes to survey responses
  const handleRadioChange = (questionId, value) => {
    setResponses({ ...responses, [questionId]: value });
  };

  // Submit survey responses
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/submitHowDidItGoForm', {
        email: userEmail,
        user_id: userId,
        responses
      });
      console.log('Survey submission response:', response.data);
      navigate('/next-page'); // Navigate to the next page in your application
    } catch (error) {
      console.error('Error submitting usability survey form:', error);
    }
  };

  return (
    <div className="survey-wrapper">
      <div className="survey-content">
        <h2>Usability Survey</h2>
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div key={index} className="question-block">
              <p className="question-text">{`${index + 1}. ${question}`}</p>
              <div className="likert">
                {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option) => (
                  <label key={option} className={`likert-option ${option.toLowerCase().replace(/\s+/g, '-')}`}>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      onChange={(e) => handleRadioChange(index + 1, e.target.value)}
                    />
                    <span className="likert-circle"></span>
                    <span className="likert-label">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button type="submit" className="survey-submit">Submit Survey</button>
        </form>
      </div>
    </div>
  );
};

export default UsabilitySurveyForm;
