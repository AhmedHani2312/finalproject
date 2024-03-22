import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { countries as countriesList } from 'countries-list';
import './Recommendation.css';

const countriesOptions = Object.entries(countriesList).map(([code, { name }]) => ({
    value: name,
    label: name // using name for both value and label for simplicity
}));

const Recommendation = () => {
    const [features, setFeatures] = useState('');
    const [country, setCountry] = useState(null); // Change to accommodate react-select
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchRecommendations = async () => {
        if (!features.trim() || !country) { // Check if country is null
            setError('Please fill in both features and country fields.');
            return;
        }

        try {
            setLoading(true);
            setError('');
            const response = await axios.post('http://localhost:3000/api/recommendations', {
                features: features.split(',').map(feature => feature.trim()),
                country: country.label // use the label as country name
            });
            const formattedRecommendations = response.data.recommendations instanceof Array 
              ? response.data.recommendations 
              : response.data.recommendations.split('\n\n').map(section => section.replace(/(^|\n)([^-\n]+)/g, '<div class="university-name">$2</div>'));
            setRecommendations(formattedRecommendations);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            setError('Failed to fetch recommendations. Please try again.');
            setRecommendations([]);
            setLoading(false);
        }
    };

    return (
        <div className="recommendation-page"> {/* Use this class for styling the background */}
            <div className="recommendation-form">
                <h2>Get University Recommendations</h2>
                {error && <div className="error-message">{error}</div>}
                <div>
                    <input
                        type="text"
                        value={features}
                        onChange={e => setFeatures(e.target.value)}
                        placeholder="Enter features separated by commas"
                    />
                    <Select 
                        value={country}
                        onChange={setCountry}
                        options={countriesOptions}
                        className="country-dropdown"
                        placeholder="Select a country"
                    />
                    <button onClick={fetchRecommendations} disabled={loading}>
                        {loading ? 'Loading...' : 'Get Recommendations'}
                    </button>
                </div>
                {loading ? (
                    <div className="loading-spinner"></div>
                ) : (
                    recommendations.length > 0 && (
                        <div className="recommendations-section">
                            <h3>Recommendations:</h3>
                            {recommendations.map((rec, index) => (
                                <div key={index} className="university" dangerouslySetInnerHTML={{ __html: rec }} />
                            ))}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Recommendation;