import ReactOtpInput from "react-otp-input";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

const OTPInputField = ({ field, errors, label }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full">
        {label && (
          <label
            htmlFor={field.name}
            className={`font-medium text-base text-center block mb-[6px] text-[#fff]`}
          >
            {label}
          </label>
        )}
        <ReactOtpInput
          value={field.value}
          onChange={field.onChange}
          numInputs={4}
          inputType="tel"
          renderInput={(props) => (
            <input
              {...props}
              className={`text-[44px] leading-[48px] h-[68px] bg-[#202E4B] !w-full outline-none font-Ubuntu font-normal border-[#475467] ${
                !errors
                  ? "border-[#F04438] text-[#F04438]"
                  : "border-[#475467] text-bodyText"
              } border rounded-[8px] flex items-center justify-center`}
            />
          )}
          containerStyle={{ justifyContent: "center", gap: 12 }}
        />
      </div>
    </div>
  );
};

const OTPInput = ({ control, name, label, rules, errors }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={(field) => (
        <OTPInputField {...field} label={label} errors={errors} />
      )}
      rules={rules}
    />
  );
};

OTPInputField.propTypes = {
  field: PropTypes.object, // field object from react-hook-form
  errors: PropTypes.object, // errors object from react-hook-form
  label: PropTypes.string, // label for the input field
};

OTPInput.propTypes = {
  control: PropTypes.object, // control object from react-hook-form
  name: PropTypes.string, // name of the input field
  label: PropTypes.string, // label for the input field
  rules: PropTypes.object, // rules object for validation
  errors: PropTypes.object, // errors object from react-hook-form
};
export default OTPInput;
