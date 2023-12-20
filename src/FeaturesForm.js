// FeaturesForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FeaturesForm.css'; // Import your stylesheet

const FeaturesForm = () => {
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const handleCheckboxChange = (feature) => {
    const isSelected = selectedFeatures.includes(feature);

    if (isSelected) {
      // Remove feature if already selected
      setSelectedFeatures(selectedFeatures.filter((item) => item !== feature));
    } else {
      // Add feature if not selected
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const features = [
    'Low or Free Tuition Fees',
    'Cost of Food and Rent in the Area',
    'Access to Sport Facilities and Sport Clubs',
    'Prestigious Brand',
    'High-Quality Teaching',
    'International Diversity',
    'High Graduate Employment Rate',
    'Family Members Have Gone to That University',
    'Size of the University',
    'Research or Internship Opportunities',
    'Party Environment or Extracurricular Activities',
  ];

  return (
    <div className="features-form-container">
      <h2>The Most Important Features in Your Future University</h2>
      <div className="feature-boxes">
        {features.map((feature, index) => (
          <div key={index} className="feature-box">
            <input
              type="checkbox"
              id={`feature-${index}`}
              checked={selectedFeatures.includes(feature)}
              onChange={() => handleCheckboxChange(feature)}
            />
            <label htmlFor={`feature-${index}`}>{feature}</label>
          </div>
        ))}
      </div>

      {/* Next button */}
      <Link to="/country-choice">
        <button>Next Page</button>
      </Link>
    </div>
  );
};

export default FeaturesForm;
