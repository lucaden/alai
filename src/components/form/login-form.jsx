import Button from "@/components/molecules/button";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

export default function LoginForm({ onSubmit, isSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const validatePhoneNumber = (value) => {
    if (!value.trim()) {
      return "Phone number cannot be empty or contain only spaces";
    } else if (value.length < 3 || value.length > 15) {
      return "Phone number cannot be more than 15 characters.";
    } else if (value.trim() !== value) {
      return "Phone number cannot start or end with spaces";
    } else if (/\s/.test(value)) {
      return "Phone number cannot contain spaces";
    }
  
    const phoneRegex = /^\d{3,15}$/;
    if (!phoneRegex.test(value)) {
      return "Phone number must contain only digits";
    }
  
    return null;  // Indicates valid phone number
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full gap-6"
    >
      <div className="flex flex-col w-full gap-5">
        <div className="relative w-full">
          <label
            htmlFor="Contact"
            className="font-semibold text-[18px] leading-[26px] mb-[10px] text-bodyText capitalize"
          >
            Contact Number
          </label>
          <div className="flex items-center bg-[#202e4b96] border border-[#475467] min-h-[44px] rounded-[8px] w-full py-[8px] px-[14px] mt-[10px]">
            <label className="!text-[15px] font-Ubuntu font-normal" htmlFor="CountryCode">+41</label>
            <input
              type="phone"
              className={`text-[15px] outline-none font-Ubuntu font-normal w-full h-full bg-[transparent] text-bodyText border-0 px-2`}
              placeholder="0998282183"
              {...register("phoneNumber", {
                required: "Please Enter Number!",
                validate: validatePhoneNumber,
              })}
            />
          </div>
          {errors?.phoneNumber && (
            <div className="text-[#FF0000] px-2 text-sm font-[400] mt-[4px] error-div">
              {errors.phoneNumber.message}
            </div>
          )}
        </div>
      </div>

      <Button
        disabled={!isValid || isSubmit}
        isSubmitting={isSubmit}
        type="submit"
        additionalClass="font-semibold py-[9px]"
        label="Request OTP"
      />
    </form>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmit: PropTypes.bool.isRequired,
};
