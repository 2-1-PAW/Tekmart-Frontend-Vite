import coffeeImage from "../../assets/landingpage.png";
import Input from "./Input";

import { useState } from "react";

// eslint-disable-next-line react/prop-types
const RegisterLogin = ({ type = "" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    if (name === "email") {
      setEmail(trimmedValue);
    } else if (name === "password") {
      setPassword(trimmedValue);
    }
  };

  // handle register
  const handleRegister = async () => {
    if (!email || !password) {
      alert("Email and password are required!");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        setEmail("");
        setPassword("");
        alert("Registration successful! Please login.");
        // redirect to login page
        window.location.href = "/login";
      } else {
        const data = await response.json();
        alert(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed: Server error");
    }
  };

  // handle login
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and password are required!");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include", // send token cookie to server
      });

      if (response.ok) {
        setEmail("");
        setPassword("");
        alert("Login successful!");
        // Redirect to order page
        window.location.href = "/products";
      } else {
        const data = await response.json();
        alert(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed: Server error");
    }
  };

  return (
    <section
      className="relative flex flex-col justify-center items-center text-center h-screen w-full bg-cover bg-center "
      style={{
        backgroundImage: `url(${coffeeImage})`,
      }}
    >
      {/* dark background */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 max-w-[45.8vw] w-fit mx-auto text-white">
        <h1 className="text-[4.5vw] leading-none font-bold mb-[2.29vw] font-poppins">
          One Step Closer to <span className="text-yellow">Not Queueing!</span>
        </h1>
        <div className="flex flex-col gap-[1.458vw] items-center w-full">
          <Input type="email" value={email} onChange={handleInputChange} />
          <Input
            type="password"
            value={password}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-row gap-[0.958vw] w-fit placeholder-black text-[1.4vw] focus:outline-none mx-auto mt-[1.458vw]">
          {type === "login" && (
            <button
              className="bg-white font-poppins font-bold text-black px-[1.5625vw] py-[0.833vw] rounded-full hover:bg-yellow active:bg-yellow active:text-white shadow-xl"
              onClick={handleLogin}
            >
              Login
            </button>
          )}
          <button
            className="bg-black font-poppins font-bold text-white px-[1.5625vw] py-[0.833vw] rounded-full hover:bg-yellow hover:text-black active:bg-yellow active:text-white"
            onClick={type === "register" && handleRegister}
          >
            {type === "login" ? "Sign Up First" : "Register Now!"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default RegisterLogin;
