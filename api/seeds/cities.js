// tier-1, 2, 3, 4
// 1x 0.75x 0.5x 0.375x
// tier-1, 30L base + 25L/bedroom + 10L/bathroom
// tier-1 furniture, 10L/bedroom
// tier-1 parking, 5L
// tier-1 rent, (sale price) / 250
const cities = [
  {
    city: "Delhi",
    tier: 1,
    state: "Delhi",
  },
  {
    city: "Mumbai",
    tier: 1,
    state: "Maharashtra",
  },
  {
    city: "Bangalore",
    tier: 1,
    state: "Karnataka",
  },
  {
    city: "Chennai",
    tier: 1,
    state: "Tamil Nadu",
  },
  {
    city: "Kolkata",
    tier: 1,
    state: "West Bengal",
  },
  {
    city: "Hyderabad",
    tier: 1,
    state: "Telangana",
  },
  {
    city: "Pune",
    tier: 1,
    state: "Maharashtra",
  },
  {
    city: "Ahmedabad",
    tier: 1,
    state: "Gujrat",
  },
  {
    city: "Amritsar",
    tier: 2,
    state: "Punjab",
  },
  {
    city: "Bhopal",
    tier: 2,
    state: "Madhya Pradesh",
  },
  {
    city: "Bhubaneswar",
    tier: 2,
    state: "Odisha",
  },
  {
    city: "Chandigarh",
    tier: 2,
    state: "Chandigarh",
  },
  {
    city: "Faridabad",
    tier: 2,
    state: "Haryana",
  },
  {
    city: "Ghaziabad",
    tier: 2,
    state: "Uttar Pradesh",
  },
  {
    city: "Jamshedpur",
    tier: 2,
    state: "Jharkhand",
  },
  {
    city: "Jaipur",
    tier: 2,
    state: "Rajasthan",
  },
  {
    city: "Kochi",
    tier: 2,
    state: "Kerala",
  },
  {
    city: "Lucknow",
    tier: 2,
    state: "Uttar Pradesh",
  },
  {
    city: "Kanpur",
    tier: 2,
    state: "Uttar Pradesh",
  },
  {
    city: "Patna",
    tier: 2,
    state: "Bihar",
  },
  {
    city: "Raipur",
    tier: 2,
    state: "Chhattisgarh",
  },
  {
    city: "Surat",
    tier: 2,
    state: "Gujrat",
  },
  {
    city: "Visakhapatnam",
    tier: 2,
    state: "Andhra Pradesh",
  },
  {
    city: "Agra",
    tier: 2,
    state: "Uttar Pradesh",
  },
  {
    city: "Ajmer",
    tier: 2,
    state: "Rajasthan",
  },
  {
    city: "Mysore",
    tier: 2,
    state: "Karnataka",
  },
  {
    city: "Srinagar",
    tier: 2,
    state: "Jammu and Kashmir",
  },
  {
    city: "Etawah",
    tier: 3,
    state: "Uttar Pradesh",
  },
  {
    city: "Roorkee",
    tier: 3,
    state: "Uttarakhand",
  },
  {
    city: "Bhatinda",
    tier: 3,
    state: "Punjab",
  },
  {
    city: "Hajipur",
    tier: 3,
    state: "Bihar",
  },
  {
    city: "Rajahmundry",
    tier: 3,
    state: "Andhra Pradesh",
  },
  {
    city: "Rohtak",
    tier: 3,
    state: "Haryana",
  },
  {
    city: "Hosur",
    tier: 3,
    state: "Tamil Nadu",
  },
  {
    city: "Gandhinagar",
    tier: 3,
    state: "Gujrat",
  },
  {
    city: "Junagadh",
    tier: 3,
    state: "Gujrat",
  },
  {
    city: "Udaipur",
    tier: 3,
    state: "Rajasthan",
  },
  {
    city: "Salem",
    tier: 3,
    state: "Tamil Nadu",
  },
  {
    city: "Jhansi",
    tier: 3,
    state: "Uttar Pradesh",
  },
  {
    city: "Madurai",
    tier: 3,
    state: "Tamil Nadu",
  },
  {
    city: "Vijayawada",
    tier: 3,
    state: "Andhra Pradesh",
  },
  {
    city: "Meerut",
    tier: 3,
    state: "Uttar Pradesh",
  },
  {
    city: "Mathura",
    tier: 3,
    state: "Uttar Pradesh",
  },
  {
    city: "Bikaner",
    tier: 3,
    state: "Udaipur",
  },
  {
    city: "Cuttack",
    tier: 3,
    state: "Odisha",
  },
  {
    city: "Nashik",
    tier: 3,
    state: "Maharashtra",
  },
  {
    city: "Banswara",
    tier: 4,
    state: "Rajasthan",
  },
  {
    city: "Bhadreswar",
    tier: 4,
    state: "West Bengal",
  },
  {
    city: "Chilakaluripet",
    tier: 4,
    state: "Andhra Pradesh",
  },
  {
    city: "Datia",
    tier: 4,
    state: "Madhya Pradesh",
  },
  {
    city: "Gangtok",
    tier: 4,
    state: "Sikkim",
  },
  {
    city: "Kalyani",
    tier: 4,
    state: "West Bengal",
  },
  {
    city: "Nagda",
    tier: 4,
    state: "Madhya Pradesh",
  },
  {
    city: "Kapurthala",
    tier: 4,
    state: "Punjab",
  },
  {
    city: "Kasganj",
    tier: 4,
    state: "Uttar Pradesh",
  },
  {
    city: "Sujangarh",
    tier: 4,
    state: "Rajasthan",
  },
];

export default cities;
