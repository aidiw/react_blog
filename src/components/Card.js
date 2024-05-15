import PropTypes from 'prop-types';

const Card = ({ title = '', onClick = () => {}, children = null }) => {
  // title을 props에서 직접 추출
  return (
    <div className="card mb-3 cusor-pointer" onClick={onClick}>
      <div className="card-body py-2 d-flex align-items-center">
          <div className="flex-grow-1">{title}</div>
          {children && <div>{children}</div>}
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element,
  onClick: PropTypes.func,
};

export default Card;
