import PropTypes from "prop-types";

export default function H2({ label, textColor, additionalClass }) {
  return (
    <h2
      className={`lg:text-[40px] md:text-[30px] text-[24px] leading-[1.3] font-Ubuntu font-medium tracking-wide  ${
        textColor || ""
      } ${additionalClass}`}
    >
      {label}
    </h2>
  );
}
H2.propTypes = {
  label: PropTypes.string,
  textColor: PropTypes.string,
  additionalClass: PropTypes.string,
};
