
export const getValidationRules = () => ({
  firstName: {
    required: "First name is required",
    minLength: {
      value: 2,
      message: "First name must be at least 2 characters",
    },
  },
  lastName: {
    // required: "Last name is required",
    minLength: {
      value: 2,
      message: "Last name must be at least 2 characters",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email address",
    },
  },
  phone: {
    required: "Phone number is required",
    pattern: {
      value: /^[0-9]{10}$/,
      message: "Phone must be 10 digits",
    },
  },
});