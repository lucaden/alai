import PropTypes from "prop-types";
export default function H6({
  label = "",
  textColor = "",
  additionalClass = "",
}) {
  return (
    <h6
      className={`md:text-[22px] text-base leading-[1.3] font-Ubuntu font-bold tracking-wide ${
        textColor || ""
      } ${additionalClass}`}
    >
      {label}
    </h6>
  );
}

H6.propTypes = {
  label: PropTypes.string,
  textColor: PropTypes.string,
  additionalClass: PropTypes.string,
};
