# Real Estate Website
This is a full-stack real estate website built with the MERN stack (MongoDB, Express.js, React.js, Node.js). The platform allows users to browse, search, and view real estate listings, providing a seamless experience for both buyers and sellers.

## Features
- **User Authentication**: Secure sign-up and sign-in using Google authentication and JWT for secure logins.
- **Password Security**: Passwords are hashed with bcrypt for enhanced security.
- **Data Storage**: Firebase is used for storing listing and profile images.
- **State Management**: Redux is utilized for managing application state.
- **Listing Management**: Create, update, and delete property listings.
- **Stylish UI**: The interface is designed with React and styled using Tailwind CSS, providing a responsive layout for various screen sizes and proper feedback for various interactions.
- **Advanced Search and Sorting**: Search functionality with sorting options based on price and creation date (ascending and descending).
- **Property Listings**: Each listing includes detailed information such as:

  - **Name**: Property name
  - **Address**: Location of the property
  - **Price**: Listing price
  - **Discount**: Any applicable discounts
  - **Number of Beds**: Total number of bedrooms
  - **Bathrooms**: Number of bathrooms
  - **Parking Spots**: Available parking spaces
  - **Furnishing**: Type of furnishing (e.g., furnished, semi-furnished, unfurnished)
  - **Landlord Details**: Information about the landlord

## Technologies Used
- **Frontend**: React.js, Redux, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Google Sign-In, JWT
- **Password Hashing**: bcrypt
- **Storage**: Firebase

## Setup

1. Clone the repository: `git clone https://github.com/ShriniwasMahajan/real_estate.git`
2. Install dependencies:
    - For backend: `npm install`
    - For frontend: `cd client && npm install`
3. Configure the JWT_SECRET, MONGO and VITE_FIREBASE_API_KEY environment variables.
4. Start the development servers:
    - Backend: `npm run dev` (in the backend directory)
    - Frontend: `npm run dev` (in the frontend directory)
