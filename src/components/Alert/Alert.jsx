
import PropTypes from 'prop-types';

const Alert = ({ message, type }) => {
  if (!message) return null;

  const alertClass = `alert-${type} alert`;

  return (
    <div className={`text-center mt-5 ${alertClass}`}>
      {message}
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
};

Alert.defaultProps = {
  type: 'info',
};

export default Alert;
