import React from "react";

const HelpPage = () => {
  return (
    <div>
      <div className="py-2">
        <div className="help-container max-w-xl mx-auto p-8 bg-gray-100 border border-gray-300 rounded-lg shadow-lg dark:bg-boxdark">
          <h1 className="help-title text-2xl font-bold text-gray-800">
            Need Help?
          </h1>
          <p className="help-description text-gray-700">
            Welcome to the help page! We here to assist you with any issues or
            questions you may have.
          </p>
          <ul className="help-list list-disc list-inside pl-4 text-gray-700">
            <li>Step 1: Logout </li>
            <li>Step 2: Login As Admin</li>
            <li>Step 3: Go to User List </li>
            <li>Step 4: Edit Your Account Status Or Role </li>
            <li>Step 5: Login With Your Account </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
