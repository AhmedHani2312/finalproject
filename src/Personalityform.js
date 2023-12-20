import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Personalityform.css'; // Import your stylesheet

const Personalityform = () => {
  const [responses, setResponses] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
  });

  const handleRadioChange = (question, value) => {
    setResponses({ ...responses, [question]: value });
  };

  const questions = [
    "I see myself as open to experience, (Imaginative)",
    "I see myself as dependable, (Organized)",
    "I see myself as extroverted, (Enthusiastic)",
    "I see myself as agreeable, (Kind)",
    "I see myself as emotionally stable, (Calm)",
  ];

  return (
    <div className="personality-form-container">
      <h2>Please let us know a bit more about Yourself!</h2>
      <form>
        {questions.map((question, index) => (
          <div key={index} className="question">
            <p><strong>{index + 1}. {question}</strong></p>
            <div className="radio-buttons">
              {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name={`q${index + 1}`}
                    value={option}
                    checked={responses[`q${index + 1}`] === option}
                    onChange={() => handleRadioChange(`q${index + 1}`, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Next button */}
        <Link to="/features-form">
          <button>Next Page</button>
        </Link>
      </form>
    </div>
  );
};

export default Personalityform;
