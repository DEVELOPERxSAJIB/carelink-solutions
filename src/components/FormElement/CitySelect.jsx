// CitySelect.js

import React, { useEffect, useState } from 'react';
import Select from 'react-select';

export const citiesData = {
  'AL': ['Birmingham', 'Montgomery', 'Mobile', 'Huntsville'],
  'AK': ['Anchorage', 'Fairbanks', 'Juneau', 'Sitka'],
  'AZ': ['Phoenix', 'Tucson', 'Mesa', 'Chandler'],
  'AR': ['Little Rock', 'Fort Smith', 'Fayetteville', 'Springdale'],
  'CA': ['Los Angeles', 'San Francisco', 'San Diego', 'San Jose'],
  'CO': ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins'],
  'CT': ['Bridgeport', 'New Haven', 'Hartford', 'Stamford'],
  'DE': ['Wilmington', 'Dover', 'Newark', 'Middletown'],
  'FL': ['Miami', 'Orlando', 'Tampa', 'Jacksonville'],
  'GA': ['Atlanta', 'Augusta', 'Savannah', 'Columbus'],
  'HI': ['Honolulu', 'Hilo', 'Kailua', 'Kaneohe'],
  'ID': ['Boise', 'Nampa', 'Meridian', 'Idaho Falls'],
  'IL': ['Chicago', 'Aurora', 'Rockford', 'Joliet'],
  'IN': ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend'],
  'IA': ['Des Moines', 'Cedar Rapids', 'Davenport', 'Sioux City'],
  'KS': ['Wichita', 'Overland Park', 'Kansas City', 'Topeka'],
  'KY': ['Louisville', 'Lexington', 'Bowling Green', 'Owensboro'],
  'LA': ['New Orleans', 'Baton Rouge', 'Shreveport', 'Lafayette'],
  'ME': ['Portland', 'Lewiston', 'Bangor', 'South Portland'],
  'MD': ['Baltimore', 'Columbia', 'Annapolis', 'Silver Spring'],
  'MA': ['Boston', 'Worcester', 'Springfield', 'Lowell'],
  'MI': ['Detroit', 'Grand Rapids', 'Warren', 'Ann Arbor'],
  'MN': ['Minneapolis', 'St. Paul', 'Rochester', 'Duluth'],
  'MS': ['Jackson', 'Gulfport', 'Hattiesburg', 'Biloxi'],
  'MO': ['Kansas City', 'St. Louis', 'Springfield', 'Columbia'],
  'MT': ['Billings', 'Missoula', 'Great Falls', 'Bozeman'],
  'NE': ['Omaha', 'Lincoln', 'Bellevue', 'Grand Island'],
  'NV': ['Las Vegas', 'Henderson', 'Reno', 'North Las Vegas'],
  'NH': ['Manchester', 'Nashua', 'Concord', 'Derry'],
  'NJ': ['Newark', 'Jersey City', 'Paterson', 'Elizabeth'],
  'NM': ['Albuquerque', 'Las Cruces', 'Rio Rancho', 'Santa Fe'],
  'NY': ['New York City', 'Buffalo', 'Rochester', 'Yonkers'],
  'NC': ['Charlotte', 'Raleigh', 'Greensboro', 'Durham'],
  'ND': ['Fargo', 'Bismarck', 'Grand Forks', 'Minot'],
  'OH': ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo'],
  'OK': ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow'],
  'OR': ['Portland', 'Salem', 'Eugene', 'Gresham'],
  'PA': ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie'],
  'RI': ['Providence', 'Warwick', 'Cranston', 'Pawtucket'],
  'SC': ['Charleston', 'Columbia', 'North Charleston', 'Mount Pleasant'],
  'SD': ['Sioux Falls', 'Rapid City', 'Aberdeen', 'Brookings'],
  'TN': ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga'],
  'TX': ['Houston', 'San Antonio', 'Dallas', 'Austin'],
  'UT': ['Salt Lake City', 'West Valley City', 'Provo', 'West Jordan'],
  'VT': ['Burlington', 'South Burlington', 'Rutland', 'Essex'],
  'VA': ['Virginia Beach', 'Norfolk', 'Chesapeake', 'Richmond'],
  'WA': ['Seattle', 'Spokane', 'Tacoma', 'Vancouver'],
  'WV': ['Charleston', 'Huntington', 'Morgantown', 'Parkersburg'],
  'WI': ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha'],
  'WY': ['Cheyenne', 'Casper', 'Laramie', 'Gillette']
  // Add more cities as needed
};

const CitySelect = ({ stateCode, selectedCity, setSelectedCity }) => {
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    // Update city options when stateCode changes
    const cities = citiesData[stateCode] || [];
    const options = cities.map(city => ({
      value: city,
      label: city
    }));
    setCityOptions(options);
  }, [stateCode]);

  const handleChange = (selectedOption) => {
    setSelectedCity(selectedOption ? selectedOption.value : '');
  };

  return (


      <Select
        id="city"
        value={cityOptions.find(option => option.value === selectedCity)}
        onChange={handleChange}
        options={cityOptions}
        placeholder="Select..."
        isClearable={true}
        required={false}
        isDisabled={cityOptions.length === 0} // Disable if no cities available
      />
  
  );
};

export default CitySelect;
