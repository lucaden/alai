import PropTypes from "prop-types";

export default function H1({ label, textColor, additionalClass }) {
  return (
    <h1
      className={`${
        textColor || ""
      } lg:text-[56px] md:text-[32px] text-[26px] leading-[1.3] font-Ubuntu font-bold tracking-wide ${additionalClass}`}
    >
      {label}
    </h1>
  );
}

H1.propTypes = {
  label: PropTypes.string,
  textColor: PropTypes.string,
  additionalClass: PropTypes.string,
};
