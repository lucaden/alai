const validateFullName = (value) => {
  if (!value.trim()) {
    return {
      isValid: false,
      message: "Value cannot be empty or contain only spaces",
    };
  } else if (/[^a-zA-Z ']/.test(value)) {
    return {
      isValid: false,
      message: "Value cannot contain special characters or numbers",
    };
  } else if ((value.match(/'/g) || []).length > 1) {
    return {
      isValid: false,
      message: "Value can contain only one ' character",
    };
  } else if (value.length > 30) {
    return {
      isValid: false,
      message: "Value cannot be less than 30 characters.",
    };
  } else if (value.trim() !== value) {
    return {
      isValid: false,
      message: "Value cannot start or end with spaces",
    };
  }

  return {
    isValid: true,
    message: "Name is valid",
  };
};

export { validateFullName };
