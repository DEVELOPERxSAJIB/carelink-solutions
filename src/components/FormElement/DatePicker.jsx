import { useState } from "react";
import DatePicker from "react-datepicker";

const PickDate = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      <DatePicker
        className="w-100 form-control"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </div>
  );
};

export default PickDate;
