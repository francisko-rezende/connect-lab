import React from "react";
import PropTypes from "prop-types";

export const StatusIcon = ({ isOn }) => {
  const fill = isOn ? "#66BB6A" : "#D7DBDD";

  return (
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 36">
      <circle cx="17.5" cy="18.454" r="17.5" fill={fill} />
      <path
        stroke="#fff"
        d="M17.5 14.454v4M14 15.954h2M19 15.954h2M14.5 15.454v6M20.5 15.454v6M14 21.454h7"
      />
    </svg>
  );
};

StatusIcon.propTypes = {
  isOn: PropTypes.bool,
};
