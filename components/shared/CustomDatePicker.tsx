// Imports
import moment from 'moment';
import 'moment/locale/en-gb';
import './CustomDatePickerStyles.css';
import DatePicker from 'react-datepicker2';





// Main function
const MyDatePicker = ({selectedDate, setSelectedDate}) => {

  // Setting moment local to english
  moment.locale('en-gb');

  return (
      <DatePicker
        value={selectedDate}
        onChange={(date:any) => setSelectedDate(date)}
        timePicker={false}
        // @ts-ignore
        dateFormat='D/MM/YYYY'
        inputFormat='DD/MM/YYYY'
      />
  );
};





export default MyDatePicker;
