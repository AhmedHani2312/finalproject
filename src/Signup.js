import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this is at the top
import axios from 'axios';
import { countries as countriesList } from 'countries-list';
import universities from './universities.json';
import './Signup.css'; // Ensure your custom CSS does not conflict with Bootstrap

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        ageRange: '',
        country: '',
        email: '',
        university: '',
    });

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedUniversity, setSelectedUniversity] = useState(null);
    const [filteredUniversities, setFilteredUniversities] = useState([]);

    useEffect(() => {
        setFilteredUniversities(universities.slice(0, 100).map(uni => ({
            value: uni.University,
            label: uni.University
        })));
    }, []);

    const filterUniversities = inputValue => {
        return universities
            .filter(uni => uni.University.toLowerCase().includes(inputValue.toLowerCase()))
            .map(filteredUni => ({ value: filteredUni.University, label: filteredUni.University }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUniversityChange = (selectedOption) => {
        setSelectedUniversity(selectedOption);
        setFormData({ ...formData, university: selectedOption ? selectedOption.value : '' });
    };

    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
        setFormData({ ...formData, country: selectedOption ? selectedOption.value : '' });
    };

    const handleUniversityInputChange = (value) => {
        if (value.length > 2) {
            setFilteredUniversities(filterUniversities(value));
        } else {
            setFilteredUniversities(universities.slice(0, 100).map(uni => ({
                value: uni.University,
                label: uni.University
            })));
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const dataToSend = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            gender: formData.gender,
            age_range: formData.ageRange,
            country: selectedCountry ? selectedCountry.value : '',
            email: formData.email,
            university_name: selectedUniversity ? selectedUniversity.value : '',
        };

        try {
            const response = await axios.post('http://localhost:3000/user/signup', dataToSend);
            navigate('/personality-form', { state: { userId: response.data.user.insertId, userEmail: formData.email } });
        } catch (error) {
            console.error('Signup failed', error.response ? error.response.data : error.message);
        }
    };

    const countryOptions = Object.entries(countriesList).map(([_, country]) => ({
        value: country.name,
        label: country.name,
    }));

    return (
        <div className="signup-page">
        <div className="signup-content"> </div>
        <div className="signup-form-container">
            <div className="form-text-content">
                <h1>Your Future University</h1>
                <p>Explore and connect with universities worldwide.</p>
            </div>
            <form className="signup-form" onSubmit={handleSignup}>
                <h2 className="form-title">Sign Up</h2>
                <div className="form-group">
                    <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                    <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>

                <div className="form-group university-select">
    <Select
        name="university"
        value={selectedUniversity}
        onChange={handleUniversityChange}
        onInputChange={handleUniversityInputChange}
        options={filteredUniversities}
        classNamePrefix="select"
        placeholder="Select a university..."
        isClearable
        isSearchable
    />
</div>

<div className="form-group country-select">
    <Select
        name="country"
        value={selectedCountry}
        onChange={handleCountryChange}
        options={countryOptions}
        classNamePrefix="select"
        placeholder="Select a country..."
        isClearable
        isSearchable
    />
</div>

                


                <div className="form-group">
                    <select name="gender" value={formData.gender} onChange={handleInputChange} required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                
                <div className="form-group">
                    <select name="ageRange" value={formData.ageRange} onChange={handleInputChange} required>
                        <option value="">Select Age Range</option>
                        <option value="below18">Below 18</option>
                        <option value="18-24">18-24</option>
                        <option value="25-34">25-34</option>
                        <option value="44-54">44-54</option>
                        <option value="over55">Over 55</option>
                    </select>
                </div>
                
                
                <button type="submit">Sign Up</button>
            </form>
        </div>
    </div>
);
};

export default Signup;
