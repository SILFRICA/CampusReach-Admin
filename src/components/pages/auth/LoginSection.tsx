import React, { FormEvent, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import Spinner from "@/components/Spinner";
import apiUrl from "@/data/axios";
import axios from "axios";
import Logo from "@/assets/campusreachlogo.svg";

const LoginSection: React.FC = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const handleLoginForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(!isLoading);

    if (email.trim() === "" || password.trim() === "") {
      setError("Please enter email and password");
      setIsLoading(!isLoading);
      return;
    }

    try {
      const API_URL = apiUrl("production");
      const response = await axios.post(`${API_URL}/api/cra/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        console.log(response);

        // Authenticate the user and set the user data in the authContext
        login(response.data.data);
        setIsLoading(!isLoading);

        // Redirect the user to the desired page after successful login
        navigate("/dashboard");
      } else {
        setError("Login failed. Please try again.");
        setIsLoading(!isLoading);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with a status other than 2xx
          setError("Invalid email or password. Please try again.");
        } else if (error.request) {
          // No response was received from the server
          setError(
            "Network error. Please check your connection and try again."
          );
        } else {
          // Something else happened while setting up the request
          setError("An unexpected error occurred. Please try again.");
        }
      } else {
        // Non-Axios error
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Login error:", error);
      setIsLoading(false);
    }
  };
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>
              <img src={Logo} alt="logo" />
            </a>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to CampusReach Admin 🧩
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Our platform simplifies the complex process of managing multiple
              information sources and staff involved in information
              dissemination, enabling efficient communication to reach its
              intended audience.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-teal-600 sm:size-20"
                href="#"
              >
                <span className="sr-only">Home</span>
                <img src={Logo} alt="logo" />
              </a>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to CampusReach Admin 🧩
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Our information management system is designed with top-notch
                security features that ensure that information is only
                accessible to authorized personnel.
              </p>
            </div>

            <form
              action="#"
              className="mt-8 grid grid-cols-6 gap-6"
              onSubmit={handleLoginForm}
            >
              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Email{" "}
                </label>

                <input
                  type="email"
                  id="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full p-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Password{" "}
                </label>

                <input
                  type="password"
                  id="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full  p-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              {error && (
                <div className="col-span-6 text-red-600 text-xs">{error}</div>
              )}

              <div className="col-span-6">
                <p className="text-sm text-gray-500">
                  By signing to an account, you agree to our
                  <a href="#" className="text-gray-700 underline">
                    {" "}
                    terms and conditions{" "}
                  </a>
                  and{" "}
                  <a href="#" className="text-gray-700 underline">
                    privacy policy
                  </a>
                  .
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button className="inline-block shrink-0 rounded-md border border-teal-600 bg-[#00caac] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-teal-600 focus:outline-none focus:ring active:text-teal-500">
                  {isLoading && <Spinner />}
                  Log In
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Forgot your password?
                  <a
                    href="mailto:support@silfrica.com"
                    className="text-gray-700 underline"
                  >
                    contact our support!
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default LoginSection;
