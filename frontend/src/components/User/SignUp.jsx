import { useState, useEffect } from "react"; // Added useEffect
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux"; // Fixed import
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, setSignupData } from "../../slices/authSlice"; // Combined imports
import { Switch } from "@headlessui/react";


function SignUp() {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const { loading, successotp, error,success } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName:"",
    lastName:"",
    email: "",
    phoneNumber:"",
    password: "",
    confirmPassword: "",
  })
  const [darkMode, setDarkMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, email,phoneNumber, password, confirmPassword } = formData

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = {
      ...formData,
      
    }

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData))
    // Send OTP to user for verification
    console.log(signupData.email)
    dispatch(sendOtp({email,phoneNumber}))

   

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber:""
    })
  
  }

  useEffect(() => {
    if (successotp) {
      navigate('/verify-email'); // Redirect on success
    }
    if(success){
      navigate('/home');
    }
  }, [successotp, navigate]);
 

  return (
    <div
    className={`flex min-h-screen  items-center justify-center p-6 transition-all duration-500 ${
      darkMode
        ? "bg-gradient-to-br from-cyan-900 via-cyan-600 to-cyan-800"
        : "bg-gradient-to-br from-gray-100 via-white to-gray-200"
    }`}
  >
    {/* Toggle Button */}
    <div className="absolute top-5 right-5">
      <Switch
        checked={darkMode}
        onChange={setDarkMode}
        className={`${darkMode ? "bg-gray-700" : "bg-gray-300"} 
          relative inline-flex h-6 w-11 items-center rounded-full transition`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
            darkMode ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </Switch>
    </div>

    <div
      className={`w-full max-w-md rounded-xl p-8 shadow-lg backdrop-blur-md transition-all duration-500 ${
        darkMode ? "bg-black/35" : "bg-white/70"
      }`}
    >
      <h2
        className={`mb-6 text-center text-2xl font-bold transition-all duration-500 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Create an Account
      </h2>

      <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
        {/* Name Fields */}
        <div className="flex gap-4">
          {["firstName", "lastName"].map((field) => (
            <label key={field} className="w-1/2">
              <p
                className={`mb-1 text-sm font-medium transition-all duration-500 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {field === "firstName" ? "First Name" : "Last Name"} <sup className="text-red-500">*</sup>
              </p>
              <input
                required
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleOnChange}
                placeholder={`Enter ${field}`}
                className={`w-full rounded-lg border p-2 placeholder-gray-400 transition-all duration-500 focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "border-gray-600 bg-gray-800 text-white focus:ring-gray-500"
                    : "border-gray-300 bg-gray-100 text-black focus:ring-gray-400"
                }`}
              />
            </label>
          ))}
        </div>

        {/* Email & Phone Number */}
        {["email", "phoneNumber"].map((field) => (
          <label key={field}>
            <p
              className={`mb-1 text-sm font-medium transition-all duration-500 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {field === "email" ? "Email Address" : "Phone Number"} <sup className="text-red-500">*</sup>
            </p>
            <input
              required
              type={field === "email" ? "email" : "tel"}
              name={field}
              value={formData[field]}
              onChange={handleOnChange}
              placeholder={`Enter ${field}`}
              className={`w-full rounded-lg border p-2 placeholder-gray-400 transition-all duration-500 focus:outline-none focus:ring-2 ${
                darkMode
                  ? "border-gray-600 bg-gray-800 text-white focus:ring-gray-500"
                  : "border-gray-300 bg-gray-100 text-black focus:ring-gray-400"
              }`}
            />
          </label>
        ))}

        {/* Password Fields */}
        <div className="flex gap-4">
          {["password", "confirmPassword"].map((field, index) => (
            <label key={field} className="relative w-1/2">
              <p
                className={`mb-1 text-sm font-medium transition-all duration-500 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {index === 0 ? "Create Password" : "Confirm Password"} <sup className="text-red-500">*</sup>
              </p>
              <input
                required
                type={(index === 0 ? showPassword : showConfirmPassword) ? "text" : "password"}
                name={field}
                value={formData[field]}
                onChange={handleOnChange}
                placeholder={`Enter ${field}`}
                className={`w-full rounded-lg border p-2 pr-10 placeholder-gray-400 transition-all duration-500 focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "border-gray-600 bg-gray-800 text-white focus:ring-gray-500"
                    : "border-gray-300 bg-gray-100 text-black focus:ring-gray-400"
                }`}
              />
              <span
                onClick={() =>
                  index === 0 ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-9 cursor-pointer text-gray-400"
              >
                {index === 0
                  ? showPassword
                    ? <AiOutlineEyeInvisible fontSize={20} />
                    : <AiOutlineEye fontSize={20} />
                  : showConfirmPassword
                  ? <AiOutlineEyeInvisible fontSize={20} />
                  : <AiOutlineEye fontSize={20} />}
              </span>
            </label>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-gray-800 py-3 text-lg font-semibold text-white transition hover:bg-gray-700"
        >
          Create Account
        </button>
       
      </form>
      <Link className="flex justify-end mt-2 text-cyan-500 hover:text-cyan-700" to="/login">Already have an account ?</Link>
    </div>
  </div>
  )
}

export default SignUp