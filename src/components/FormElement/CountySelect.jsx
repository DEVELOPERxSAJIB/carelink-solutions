// CountySelect.js

import  { useEffect, useState } from "react";
import Select from "react-select";
 const countiesData = {
  AL: ["Autauga County", "Baldwin County", "Calhoun County", "Dallas County"],
  AK: [
    "Anchorage Borough",
    "Fairbanks North Star Borough",
    "Matanuska-Susitna Borough",
  ],
  AZ: ["Maricopa County", "Pima County", "Pinal County", "Yuma County"],
  AR: [
    "Benton County",
    "Pulaski County",
    "Washington County",
    "Sebastian County",
  ],
  CA: [
    "Los Angeles County",
    "San Diego County",
    "Orange County",
    "Riverside County",
  ],
  CO: [
    "Denver County",
    "El Paso County",
    "Arapahoe County",
    "Jefferson County",
  ],
  CT: [
    "Fairfield County",
    "Hartford County",
    "New Haven County",
    "New London County",
  ],
  DE: ["New Castle County", "Kent County", "Sussex County"],
  FL: [
    "Miami-Dade County",
    "Broward County",
    "Palm Beach County",
    "Orange County",
  ],
  GA: ["Fulton County", "Gwinnett County", "Cobb County", "DeKalb County"],
  HI: ["Honolulu County", "Maui County", "Hawaii County", "Kauai County"],
  ID: ["Ada County", "Canyon County", "Kootenai County", "Bannock County"],
  IL: ["Cook County", "DuPage County", "Lake County", "Will County"],
  IN: ["Marion County", "Lake County", "Allen County", "Hamilton County"],
  IA: ["Polk County", "Linn County", "Scott County", "Johnson County"],
  KS: [
    "Johnson County",
    "Sedgwick County",
    "Shawnee County",
    "Wyandotte County",
  ],
  KY: ["Jefferson County", "Fayette County", "Kentucky County", "Boone County"],
  LA: [
    "Orleans Parish",
    "Jefferson Parish",
    "East Baton Rouge Parish",
    "Caddo Parish",
  ],
  ME: [
    "Cumberland County",
    "York County",
    "Kennebec County",
    "Penobscot County",
  ],
  MD: [
    "Montgomery County",
    "Prince George",
    "s County",
    "Baltimore County",
    "Anne Arundel County",
  ],
  MA: [
    "Middlesex County",
    "Worcester County",
    "Essex County",
    "Suffolk County",
  ],
  MI: ["Wayne County", "Oakland County", "Macomb County", "Kent County"],
  MN: ["Hennepin County", "Ramsey County", "Dakota County", "Anoka County"],
  MS: ["Hinds County", "Harrison County", "DeSoto County", "Rankin County"],
  MO: [
    "St. Louis County",
    "Jackson County",
    "St. Charles County",
    "Greene County",
  ],
  MT: [
    "Yellowstone County",
    "Missoula County",
    "Gallatin County",
    "Flathead County",
  ],
  NE: ["Douglas County", "Lancaster County", "Sarpy County", "Hall County"],
  NV: ["Clark County", "Washoe County", "Carson City", "Douglas County"],
  NH: [
    "Hillsborough County",
    "Rockingham County",
    "Merrimack County",
    "Strafford County",
  ],
  NJ: ["Bergen County", "Middlesex County", "Essex County", "Hudson County"],
  NM: [
    "Bernalillo County",
    "Dona Ana County",
    "Santa Fe County",
    "Sandoval County",
  ],
  NY: ["Kings County", "Queens County", "New York County", "Bronx County"],
  NC: [
    "Mecklenburg County",
    "Wake County",
    "Guilford County",
    "Forsyth County",
  ],
  ND: ["Cass County", "Burleigh County", "Grand Forks County", "Ward County"],
  OH: [
    "Franklin County",
    "Cuyahoga County",
    "Hamilton County",
    "Montgomery County",
  ],
  OK: [
    "Oklahoma County",
    "Tulsa County",
    "Cleveland County",
    "Canadian County",
  ],
  OR: [
    "Multnomah County",
    "Washington County",
    "Clackamas County",
    "Lane County",
  ],
  PA: [
    "Philadelphia County",
    "Allegheny County",
    "Montgomery County",
    "Bucks County",
  ],
  RI: [
    "Providence County",
    "Kent County",
    "Washington County",
    "Newport County",
  ],
  SC: [
    "Greenville County",
    "Richland County",
    "Charleston County",
    "Horry County",
  ],
  SD: [
    "Minnehaha County",
    "Pennington County",
    "Lincoln County",
    "Brown County",
  ],
  TN: ["Shelby County", "Davidson County", "Knox County", "Hamilton County"],
  TX: ["Harris County", "Dallas County", "Tarrant County", "Bexar County"],
  UT: ["Salt Lake County", "Utah County", "Davis County", "Weber County"],
  VT: [
    "Chittenden County",
    "Rutland County",
    "Washington County",
    "Windsor County",
  ],
  VA: [
    "Fairfax County",
    "Prince William County",
    "Virginia Beach City",
    "Loudoun County",
  ],
  WA: ["King County", "Pierce County", "Snohomish County", "Spokane County"],
  WV: [
    "Kanawha County",
    "Berkeley County",
    "Cabell County",
    "Monongalia County",
  ],
  WI: ["Milwaukee County", "Dane County", "Waukesha County", "Brown County"],
  WY: [
    "Laramie County",
    "Natrona County",
    "Campbell County",
    "Sweetwater County",
  ],
};

const CountySelect = ({ selectedState, selectedCounty, setSelectedCounty }) => {
  const [countyOptions, setCountyOptions] = useState([]);

  useEffect(() => {
    const counties = countiesData[selectedState] || [];
    const options = counties.map((county) => ({
      value: county,
      label: county,
    }));
    setCountyOptions(options);
  }, [selectedState]);

  const handleChange = (selectedOption) => {
    setSelectedCounty(selectedOption ? selectedOption.value : "");
  };

  return (
  
      <Select
        id="county"
        value={countyOptions.find((option) => option.value === selectedCounty)}
        onChange={handleChange}
        options={countyOptions}
        placeholder="Select..."
        isClearable={true}
        required={false}
        isDisabled={countyOptions.length === 0} // Disable if no counties available
      />
   
  );
};

export default CountySelect;