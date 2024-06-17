import PropTypes from "prop-types";

export default function BodyText({ text, textColor, additionalClass }) {
  return (
    <p
      className={`font-Ubuntu font-light tracking-wide	leading-[1.5]  ${
        textColor || "text-bodyText"
      } ${additionalClass}`}
    >
      {text}
    </p>
  );
}
BodyText.propTypes = {
  text: PropTypes.string,
  textColor: PropTypes.string,
  additionalClass: PropTypes.string,
};
