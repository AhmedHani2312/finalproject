// import React, { useState } from 'react';
// import axios from 'axios';
// import Select from 'react-select';
// import { useNavigate } from 'react-router-dom'; // Add this line
// import { countries as countriesList } from 'countries-list';
// import './Recommendation.css';

// const countriesOptions = Object.entries(countriesList).map(([code, { name }]) => ({
//     value: name,
//     label: name
// }));

// const Recommendation = () => {
//     const [features, setFeatures] = useState('');
//     const [country, setCountry] = useState(null);
//     const [recommendations, setRecommendations] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     const navigate = useNavigate(); // Add this line

//     const fetchRecommendations = async () => {
//         if (!features.trim() || !country) {
//             setError('Please fill in both features and country fields.');
//             return;
//         }

//         setLoading(true);
//         setError('');

//         try {
//             const response = await axios.post('http://localhost:3000/api/recommendations', {
//                 features: features.split(',').map(feature => feature.trim()),
//                 country: country.value
//             });
//             setRecommendations(formatRecommendations(response.data.recommendations));
//         } catch (error) {
//             console.error('Error fetching recommendations:', error);
//             setError('Failed to fetch recommendations. Please try again.');
//             setRecommendations([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const formatRecommendations = (recs) => {
//         return recs.split('\n\n').map((rec, index) => ({
//             __html: rec
//                 .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Make text between asterisks bold
//                 .replace(/\[(.*?)\]\((https?:\/\/[^\s]+)\)/g, '<a href="$2" target="_blank">$1</a>') // Convert Markdown links into clickable links
//         }));
//     };

//     return (
//         <div className="recommendation-page">
//             <div className="recommendation-form">
//                 <h2>Get University Recommendations</h2>
//                 {error && <div className="error-message">{error}</div>}
//                 <div>
//                     <input
//                         type="text"
//                         value={features}
//                         onChange={e => setFeatures(e.target.value)}
//                         placeholder="Enter features separated by commas"
//                     />
//                     <Select
//                         value={country}
//                         onChange={setCountry}
//                         options={countriesOptions}
//                         className="country-dropdown"
//                         placeholder="Select a country"
//                     />
//                     <button onClick={fetchRecommendations} disabled={loading}>
//                         {loading ? (
//                             <>
//                                 <div className="loading-text">Generating Recommendations, This Process will take a Few Seconds.....</div>
//                                 <div className="loading-spinner"></div>
//                             </>
//                         ) : 'Get Recommendations'}
//                     </button>
//                 </div>
//                 {!loading && recommendations.length > 0 && (
//                     <div className="recommendations-section">
//                         <h3>Recommendations:</h3>
//                         {recommendations.map((rec, index) => (
//                             <div key={index} className="university" dangerouslySetInnerHTML={rec} />
//                         ))}
//                         <button className="survey-button" onClick={() => navigate('/usability-survey-form')}>Take Usability Survey</button> {/* Add this line */}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Recommendation;




import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate, useLocation } from 'react-router-dom';
import { countries as countriesList } from 'countries-list';
import './Recommendation.css';

const countriesOptions = Object.entries(countriesList).map(([code, { name }]) => ({
    value: name,
    label: name
}));

const Recommendation = () => {
    const [features, setFeatures] = useState('');
    const [country, setCountry] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Extract userId and userEmail from location state
    const { userId, userEmail } = location.state || {};

    const fetchRecommendations = async () => {
        if (!features.trim() || !country) {
            setError('Please fill in both features and country fields.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:3000/api/recommendations', {
                features: features.split(',').map(feature => feature.trim()),
                country: country.value
            });
            setRecommendations(formatRecommendations(response.data.recommendations));
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            setError('Failed to fetch recommendations. Please try again.');
            setRecommendations([]);
        } finally {
            setLoading(false);
        }
    };

    const formatRecommendations = (recs) => {
        return recs.split('\n\n').map((rec, index) => ({
            __html: rec
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\[(.*?)\]\((https?:\/\/[^\s]+)\)/g, '<a href="$2" target="_blank">$1</a>')
        }));
    };

    return (
        <div className="recommendation-page">
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
                        {loading ? (
                            <>
                                <div className="loading-text">Generating Recommendations, This Process will take a Few Seconds.....</div>
                                <div className="loading-spinner"></div>
                            </>
                        ) : 'Get Recommendations'}
                    </button>
                </div>
                {!loading && recommendations.length > 0 && (
                    <div className="recommendations-section">
                        <h3>Recommendations:</h3>
                        {recommendations.map((rec, index) => (
                            <div key={index} className="university" dangerouslySetInnerHTML={rec} />
                        ))}
                        {/* Navigate with userId and userEmail passed through state */}
                        <button className="survey-button" onClick={() => navigate('/usability-survey-form', { state: { userId, userEmail } })}>
                            Take Usability Survey
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Recommendation;
