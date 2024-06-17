import PropTypes from "prop-types";
export default function TextArea({
  Label,
  additionalClass,
  placeholder,
  LabelClass,
  inputProps,
  errors,
}) {
  return (
    <div className="flex flex-col w-full">
      {Label && (
        <label
          className={`font-medium text-[16px] leading-[24px] mb-[6px] text-bodyText ${
            LabelClass || ""
          }`}
        >
          {Label}
        </label>
      )}
      <div className="relative w-full">
        <textarea
          {...inputProps}
          rows={5}
          className={`text-[15px] outline-none resize-none font-Ubuntu font-normal text-bodyText border border-[#D2F0E9] rounded-[8px] w-full pt-[8px] px-[14px]
        ${additionalClass}`}
          placeholder={placeholder || "Please Enter"}
        />
        {errors?.[inputProps.name] && (
          <div className="text-[#FF0000] px-2 text-sm font-[400]">
            {errors[inputProps.name].message}
          </div>
        )}
      </div>
    </div>
  );
}

TextArea.propTypes = {
  Label: PropTypes.string, // Label for the text area
  additionalClass: PropTypes.string, // Additional CSS class for styling
  placeholder: PropTypes.string, // Placeholder text for the text area
  LabelClass: PropTypes.string, // CSS class for styling the label
  inputProps: PropTypes.object, // Props for the text area input
  errors: PropTypes.object, // Errors object from React Hook Form for validation
};
