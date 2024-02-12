import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import './Signup.css';
import axios from 'axios';
import { countries as countriesList } from 'countries-list';
import universities from './universities.json';

const Signup = () => {
    const navigate = useNavigate();
    const [selectedUniversity, setSelectedUniversity] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        ageRange: '',
        country: '',
        email: '',
        university: '',
    });

    // Handle changes in text inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle university selection
    const handleUniversityChange = (selectedOption) => {
        setSelectedUniversity(selectedOption);
        setFormData({ ...formData, university: selectedOption ? selectedOption.value : '' });
    };

    // Handle country selection
    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
        setFormData({ ...formData, country: selectedOption ? selectedOption.value : '' });
    };

    // Handle form submission
    const handleSignup = async (e) => {
        e.preventDefault();
        const dataToSend = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            gender: formData.gender,
            age_range: formData.ageRange,
            country: selectedCountry ? selectedCountry.value : formData.country,
            email: formData.email,
            university_name: selectedUniversity ? selectedUniversity.value : formData.university,
        };

        try {
            const response = await axios.post('http://localhost:3000/user/signup', dataToSend);
            navigate('/personality-form', { state: { userId: response.data.user.insertId, userEmail: formData.email } });
        } catch (error) {
            console.error('Signup failed', error.response ? error.response.data : error.message);
        }
    };

    // Prepare options for the select components
    const universityOptions = universities.map(uni => ({
        value: uni.University,
        label: uni.University,
    }));

    const countryOptions = Object.entries(countriesList).map(([_, country]) => ({
        value: country.name,
        label: country.name,
    }));

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form className="signup-form" onSubmit={handleSignup}>
                <div className="form-group">
                    <label>First Name:</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Gender:</label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange} required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Age Range:</label>
                    <select name="ageRange" value={formData.ageRange} onChange={handleInputChange} required>
                        <option value="">Select Age Range</option>
                        <option value="below18">Below 18</option>
                        <option value="18-24">18-24</option>
                        <option value="25-34">25-34</option>
                        <option value="44-54">44-54</option>
                        <option value="over55">Over 55</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Country:</label>
                    <Select
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        options={countryOptions}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select a country..."
                        isClearable
                        isSearchable
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>University:</label>
                    <Select
                        value={selectedUniversity}
                        onChange={handleUniversityChange}
                        options={universityOptions}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select a university..."
                        isClearable
                        isSearchable
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
