import { useState } from "react";
import toast from "react-hot-toast";

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const rules = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[@$!%*?&]/.test(password),
  };

  const isValidPassword =
    rules.length &&
    rules.upper &&
    rules.lower &&
    rules.number &&
    rules.special;

  const handleSubmit = () => {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    if (isSignup && !isValidPassword) {
      toast.error("Password does not meet requirements");
      return;
    }

    toast.success(isSignup ? "Account created " : "Login successful ");

    localStorage.setItem("auth", "true");

    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1000);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl w-96 shadow-xl">

        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-3 rounded bg-white/20"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 rounded bg-white/20 pr-12"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-sm"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {isSignup && (
          <div className="text-sm mt-3">
            <p className={rules.length ? "text-green-400" : "text-red-400"}>
              • Min 8 characters
            </p>
            <p className={rules.upper ? "text-green-400" : "text-red-400"}>
              • Uppercase
            </p>
            <p className={rules.number ? "text-green-400" : "text-red-400"}>
              • Number
            </p>
            <p className={rules.special ? "text-green-400" : "text-red-400"}>
              • Special char
            </p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full mt-5 p-3 rounded bg-gradient-to-r from-blue-500 to-purple-600"
        >
          {isSignup ? "SIGN UP" : "LOGIN"}
        </button>

        <p className="text-center mt-4 text-sm">
          {isSignup ? "Already have an account?" : "New here?"}
          <span
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-400 ml-1 cursor-pointer"
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;