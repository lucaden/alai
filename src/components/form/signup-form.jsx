import Button from "@/components/molecules/button";
import Input from "@/components/molecules/input";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { validateFullName } from "@/utils/commonFunction";

export default function SignUpForm({ onSubmit, isSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full gap-6"
    >
      <div className="flex flex-col w-full gap-5">
        <Input
          Label={<span>First Name <sup className="text-rose-600">*</sup></span>}
          type="text"
          placeholder="Enter your first name"
          inputProps={register("first_name", {
            required: {
              value: true,
              message: "Please enter your first name!",
            },
            validate: (value) => {
              const validation = validateFullName(value);
              return validation.isValid || validation.message;
            },
          })}
          errors={errors}
        />
        <Input
          Label={<span>Last Name <sup className="text-rose-600">*</sup></span>}
          type="text"
          placeholder="Enter your Last name"
          inputProps={register("last_name", {
            required: {
              value: true,
              message: "Please enter your last name!",
            },
            validate: (value) => {
              const validation = validateFullName(value);
              return validation.isValid || validation.message;
            },
          })}
          errors={errors}
        />
      </div>

      <Button
        disabled={!isValid || isSubmit}
        isSubmitting={isSubmit}
        type="submit"
        additionalClass="font-semibold py-[9px]"
        label="Submit"
      />
    </form>
  );
}

SignUpForm.propTypes = {
  onSubmit: PropTypes.func,
  isSubmit: PropTypes.bool,
};
