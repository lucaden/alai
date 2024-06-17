import PropTypes from "prop-types";

export default function H4({ label, textColor, additionalClass }) {
  return (
    <h4
      className={`lg:text-[28px] text-[20px] leading-[1.3] font-Ubuntu font-semibold tracking-wide ${
        textColor || ""
      } ${additionalClass}`}
    >
      {label}
    </h4>
  );
}
H4.propTypes = {
  label: PropTypes.string,
  textColor: PropTypes.string,
  additionalClass: PropTypes.string,
};
