import { FiLoader } from "react-icons/fi";
import PropTypes from "prop-types";

export default function Button({
  disabled = false,
  iconBtn,
  additionalClass,
  isSubmitting,
  label,
  textClass,
  onClick,
  iconPosition,
  type,
}) {
  return (
    <button
      disabled={disabled}
      type={type || "button"}
      className={`border py-2 px-6 rounded-[25px] items-center justify-center disabled:border-primary disabled:bg-primary disabled:opacity-500 hover:opacity-[0.8] ${
        iconBtn ? "flex items-center" : ""
      } ${
        isSubmitting
          ? "bg-primary border-[#98a8b7] min-h-[44px]"
          : "bg-primary border-primary"
      } ${additionalClass}  ${
        iconPosition == "left" ? "gap-x-1" : " gap-x-1 flex-row-reverse"
      }`}
      onClick={onClick}
    >
      {iconBtn && <span> {iconBtn}</span>}
      <span
        className={`text-white font-Ubuntu text-center text-base font-medium  ${textClass} ${
          isSubmitting && "flex items-center justify-center"
        }`}
      >
        {isSubmitting ? (
          <FiLoader size={17} color="#fff" className="spin_animation" />
        ) : (
          label
        )}
      </span>
    </button>
  );
}

Button.propTypes = {
  disabled: PropTypes.bool, // Indicates whether the button is disabled
  iconBtn: PropTypes.node, // Icon element for the button
  additionalClass: PropTypes.string, // Additional CSS class for styling
  isSubmitting: PropTypes.bool, // Indicates whether the button is in a submitting state
  label: PropTypes.string, // Label text for the button
  textClass: PropTypes.string, // CSS class for styling the label text
  onClick: PropTypes.func, // onClick event handler for the button
  iconPosition: PropTypes.oneOf(["left", "right"]), // Position of the icon relative to the label text
  type: PropTypes.oneOf(["button", "submit", "reset"]), // Type of button (e.g., button, submit, reset)
};
