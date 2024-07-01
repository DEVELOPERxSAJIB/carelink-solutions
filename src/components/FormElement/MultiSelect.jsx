
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const animatedComponents = makeAnimated();

export default function MultiSelect() {
    const colourOptions=[
        { value: 'United Arab', label: 'United Arab' },
        { value: 'United State', label: 'United State' },
        { value: 'United kingdom', label: 'United kingdom' }]
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={[colourOptions[4], colourOptions[5]]}
      isMulti
      options={colourOptions}
    />
  );
}