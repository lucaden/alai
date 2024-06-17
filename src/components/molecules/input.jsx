import PropTypes from "prop-types";

export default function Input({
  Label,
  additionalClass,
  type,
  placeholder,
  helpText,
  LabelClass,
  inputProps,
  errors,
  inputId,
  passwordEye,
  disabled,
}) {
  return (
    <div className="flex flex-col w-full">
      {Label && (
        <label
          htmlFor={inputId}
          className={`font-semibold text-[18px] leading-[26px] mb-[10px] text-bodyText capitalize ${
            LabelClass || ""
          }`}
        >
          {Label}
        </label>
      )}
      <div className="relative w-full">
        <input
          {...inputProps}
          id={inputId}
          disabled={disabled}
          type={type || "text"}
          autoComplete="new-password"
          className={`text-[15px] outline-none font-Ubuntu font-normal bg-[#202e4b96] text-bodyText border border-[#475467] min-h-[44px] rounded-[8px] w-full py-[8px] px-[14px]
          ${additionalClass} ${helpText ? "pr-[38px]" : ""}`}
          placeholder={placeholder || "Please Enter"}
        />
        {passwordEye || ''}
        {errors?.[inputProps.name] && (
          <div className="text-[#FF0000] px-2 text-sm font-[400] mt-[4px] error-div">
            {errors[inputProps.name].message}
          </div>
        )}
      </div>
    </div>
  );
}

// Adding props validation using PropTypes
Input.propTypes = {
  Label: PropTypes.string,
  additionalClass: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  helpText: PropTypes.node,
  LabelClass: PropTypes.string,
  inputProps: PropTypes.object,
  errors: PropTypes.object,
  inputId: PropTypes.string,
  passwordEye: PropTypes.node,
  disabled: PropTypes.bool,
};
