import React from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, UserPen } from "lucide-react";
import { Button } from "./ui/button";
import { getValidationRules } from "@/lib/validation";
import { Input } from "./ui/input";
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface Props {
  onSubmit: (data: FormData) => void;
}
interface Props {
  onSubmit: (data: FormData) => void;
  selectedDate: string | null;
  startTime: string | null;
  endTime: string | null;
}

const UserDetailsForm: React.FC<Props> = ({
  onSubmit,
  selectedDate,
  startTime,
  endTime,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({ mode: "onTouched", criteriaMode: "all" });

  const validation = getValidationRules();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <User className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-bold text-gray-900">Details</h2>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)(e);
        }}
        className="space-y-6"
        noValidate
      >
        <div className="grid md:grid-cols-2 gap-2">
          <div className="relative">
            <UserPen className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              id="firstName"
              type="text"
              placeholder="First Name"
              className="w-full max-w-md pl-11 pr-4 py-3 border border-gray-200 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-transparents h-12"
              {...register("firstName", validation.firstName)}
            />
            {errors.firstName && (
              <span className="text-sm text-red-500 absolute top-full left-0">
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div className="relative">
            <UserPen className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              id="lastName"
              type="text"
              placeholder="Last Name"
              className="w-full max-w-md pl-11 pr-4 py-3 border border-gray-200 rounded-b-sm focus:ring-2 focus:ring-blue-500 focus:border-transparents h-12"
              {...register("lastName", validation.lastName)}
            />
            {errors.lastName && (
              <span className="text-sm text-red-500 absolute top-full left-0">
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full max-w-md pl-11 pr-4 py-3 border border-gray-200 rounded-b-sm focus:ring-2 focus:ring-blue-500 focus:border-transparents h-12"
              {...register("email", validation.email)}
            />
            {errors.email && (
              <span className="text-sm text-red-500 absolute top-full left-0">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              id="phone"
              type="tel"
              placeholder="Phone"
              className="w-full max-w-md pl-11 pr-4 py-3 border border-gray-200 rounded-b-sm focus:ring-2 focus:ring-blue-500 focus:border-transparents h-12"
              {...register("phone", validation.phone)}
            />
            {errors.phone && (
              <span className="text-sm text-red-500 absolute top-full left-0">
                {errors.phone.message}
              </span>
            )}
          </div>
        </div>

        <Button
          type="submit"
          disabled={
            !isValid || isSubmitting || !selectedDate || !startTime || !endTime
          }
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-b-sm transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-200 shadow-lg cursor-pointer"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default UserDetailsForm;
