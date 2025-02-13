"use client";

import { InputBox } from "../../../components/common/InputBox";
import Link from "next/link";

/**
 * A form component for user sign up.
 *
 * This component renders a sign up form with fields for name, email address, and password.
 * It includes a submit button for signing up and social login buttons for alternative
 * sign up options. Additionally, it provides a link to the sign in page for users who
 * already have an account.
 *
 * The form is styled to be responsive and visually appealing, with a gradient background
 * on the heading and hover effects on buttons.
 *
 * @returns A JSX element containing the sign up form.
 */
const SignUpForm = () => {
  return (
    <div className="bg-white rounded-3xl w-full lg:w-[500px] mx-auto p-6 relative">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text">
          Sign up to get personalized recommendations
        </h1>
        <p className="text-gray-600 text-base">
          Discover products that work for you - no more guessing!
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5">
        <InputBox type="text" placeholder="Your name" id="name" />
        <InputBox type="email" placeholder="Enter email address" id="email" />
        <InputBox type="password" placeholder="Enter password" id="password" />

        <div className="flex items-center gap-4">
          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-[#8599FE] hover:bg-blue-500 text-white rounded-xl py-3 text-lg font-medium transition-colors"
          >
            Sign up
          </button>

          {/* Social Login */}
          <div className="flex gap-4 justify-center ">
            <button className="p-3 rounded-xl bg-[#8599FE66] hover:bg-[#8F80E8] transition-colors group">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  className="fill-current text-[#8F80E8] group-hover:fill-white group-hover:text-white"
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
            </button>
            <button className="p-3 rounded-xl bg-[#EDAFDF4D] hover:bg-[#E77CCF] transition-colors group">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  className="fill-current text-[#E77CCF]  group-hover:fill-white group-hover:text-white"
                  fill="currentColor"
                  d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"
                />
              </svg>
            </button>
            <button className="p-3 rounded-xl bg-[#80E8DE4D] hover:bg-[#80E8DE] transition-colors group">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  className="fill-current text-[#80E8DE] group-hover:fill-white group-hover:text-white"
                  d="M21.5389 20.2619C21.1439 21.1703 20.6764 22.0064 20.1347 22.7752C19.3963 23.8231 18.7917 24.5486 18.3258 24.9514C17.6035 25.6126 16.8297 25.9512 16.001 25.9705C15.4061 25.9705 14.6887 25.802 13.8536 25.4601C13.0157 25.1199 12.2457 24.9514 11.5417 24.9514C10.8033 24.9514 10.0114 25.1199 9.16436 25.4601C8.31602 25.802 7.63261 25.9801 7.1101 25.9978C6.31545 26.0315 5.52338 25.6832 4.73276 24.9514C4.22814 24.5132 3.59697 23.7622 2.84085 22.6981C2.02959 21.5619 1.36263 20.2442 0.840114 18.7421C0.280522 17.1195 0 15.5483 0 14.0272C0 12.2848 0.378221 10.782 1.13579 9.52262C1.73117 8.51105 2.52325 7.7131 3.51458 7.12732C4.50592 6.54153 5.57706 6.24302 6.73059 6.22393C7.36176 6.22393 8.18946 6.41828 9.21804 6.80024C10.2437 7.18349 10.9023 7.37784 11.191 7.37784C11.4069 7.37784 12.1385 7.15059 13.3788 6.69753C14.5517 6.27737 15.5416 6.1034 16.3525 6.17193C18.5499 6.34847 20.2008 7.21077 21.2987 8.76431C19.3334 9.94968 18.3613 11.6099 18.3806 13.7398C18.3984 15.3988 19.0029 16.7793 20.1911 17.8754C20.7296 18.3842 21.3309 18.7774 22 19.0566C21.8549 19.4755 21.7017 19.8767 21.5389 20.2619ZM16.4992 0.520148C16.4992 1.82044 16.022 3.03453 15.0708 4.15827C13.9229 5.49418 12.5345 6.26613 11.0289 6.14432C11.0097 5.98833 10.9985 5.82415 10.9985 5.65162C10.9985 4.40334 11.5444 3.06743 12.5139 1.97514C12.9978 1.4221 13.6134 0.962247 14.3598 0.595417C15.1046 0.23406 15.8092 0.0342214 16.4718 0C16.4911 0.173829 16.4992 0.34767 16.4992 0.520131V0.520148Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Sign In Link */}
        <p className="text-center text-lg">
          <span className="text-blue-400">Already have an account? </span>
          <Link
            href="/sign-in"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
