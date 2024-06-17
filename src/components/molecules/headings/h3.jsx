import PropTypes from "prop-types";

export default function H3({ label, textColor, additionalClass }) {
  return (
    <h3
      className={`lg:text-[32px] md:text-[20px] text-[18px] leading-[1.3] font-Ubuntu font-bold tracking-wide text-white  ${
        textColor || ""
      } ${additionalClass}`}
    >
      {label}
    </h3>
  );
}
H3.propTypes = {
  label: PropTypes.string,
  textColor: PropTypes.string,
  additionalClass: PropTypes.string,
};
