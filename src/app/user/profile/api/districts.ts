type District = {
    key: string;
    label: string;
    division: string; // Indicates which division the district belongs to
};
export const districts: District[] = [
    // Dhaka Division 13
    { key: 'Dhaka', label: 'Dhaka', division: 'Dhaka' },
    { key: 'Gazipur', label: 'Gazipur', division: 'Dhaka' },
    { key: 'Kishoreganj', label: 'Kishoreganj', division: 'Dhaka' },
    { key: 'Manikganj', label: 'Manikganj', division: 'Dhaka' },
    { key: 'Munshiganj', label: 'Munshiganj', division: 'Dhaka' },
    { key: 'Narayanganj', label: 'Narayanganj', division: 'Dhaka' },
    { key: 'Narsingdi', label: 'Narsingdi', division: 'Dhaka' },
    { key: 'Tangail', label: 'Tangail', division: 'Dhaka' },
    { key: 'Faridpur', label: 'Faridpur', division: 'Dhaka' },
    { key: 'Gopalganj', label: 'Gopalganj', division: 'Dhaka' },
    { key: 'Madaripur', label: 'Madaripur', division: 'Dhaka' },
    { key: 'Rajbari', label: 'Rajbari', division: 'Dhaka' },
    { key: 'Shariatpur', label: 'Shariatpur', division: 'Dhaka' },

    // chattogram 11
    { key: 'Chattogram', label: 'Chattogram', division: 'Chattogram' },
    { key: 'CoxsBazar', label: 'Cox’s Bazar', division: 'Chattogram' },
    { key: 'Bandarban', label: 'Bandarban', division: 'Chattogram' },
    { key: 'Khagrachari', label: 'Khagrachari', division: 'Chattogram' },
    { key: 'Rangamati', label: 'Rangamati', division: 'Chattogram' },
    { key: 'Noakhali', label: 'Noakhali', division: 'Chattogram' },
    { key: 'Feni', label: 'Feni', division: 'Chattogram' },
    { key: 'Lakshmipur', label: 'Lakshmipur', division: 'Chattogram' },
    { key: 'Cumilla', label: 'Cumilla', division: 'Chattogram' },
    { key: 'Brahmanbaria', label: 'Brahmanbaria', division: 'Chattogram' },
    { key: 'Chandpur', label: 'Chandpur', division: 'Chattogram' },

    // Khulna 9
    { key: 'Khulna', label: 'Khulna', division: 'Khulna' },
    { key: 'Bagerhat', label: 'Bagerhat', division: 'Khulna' },
    { key: 'Satkhira', label: 'Satkhira', division: 'Khulna' },
    { key: 'Jessore', label: 'Jessore', division: 'Khulna' },
    { key: 'Narail', label: 'Narail', division: 'Khulna' },
    { key: 'Jhenaidah', label: 'Jhenaidah', division: 'Khulna' },
    { key: 'Kushtia', label: 'Kushtia', division: 'Khulna' },
    { key: 'Chuadanga', label: 'Chuadanga', division: 'Khulna' },
    { key: 'Meherpur', label: 'Meherpur', division: 'Khulna' },

    // Rajshahi 8
    { key: 'Rajshahi', label: 'Rajshahi', division: 'Rajshahi' },
    { key: 'Natore', label: 'Natore', division: 'Rajshahi' },
    { key: 'Naogaon', label: 'Naogaon', division: 'Rajshahi' },
    { key: 'Chapainawabganj', label: 'Chapainawabganj', division: 'Rajshahi' },
    { key: 'Pabna', label: 'Pabna', division: 'Rajshahi' },
    { key: 'Sirajganj', label: 'Sirajganj', division: 'Rajshahi' },
    { key: 'Bogura', label: 'Bogura', division: 'Rajshahi' },
    { key: 'Joypurhat', label: 'Joypurhat', division: 'Rajshahi' },

    // Barishal 6
    { key: 'Barishal', label: 'Barishal', division: 'Barishal' },
    { key: 'Pirojpur', label: 'Pirojpur', division: 'Barishal' },
    { key: 'Jhalokati', label: 'Jhalokati', division: 'Barishal' },
    { key: 'Patuakhali', label: 'Patuakhali', division: 'Barishal' },
    { key: 'Bhola', label: 'Bhola', division: 'Barishal' },
    { key: 'Barguna', label: 'Barguna', division: 'Barishal' },

    // sylhet 4
    { key: 'Sylhet', label: 'Sylhet', division: 'Sylhet' },
    { key: 'Moulvibazar', label: 'Moulvibazar', division: 'Sylhet' },
    { key: 'Habiganj', label: 'Habiganj', division: 'Sylhet' },
    { key: 'Sunamganj', label: 'Sunamganj', division: 'Sylhet' },
    // Rangpur 8
    { key: 'Rangpur', label: 'Rangpur', division: 'Rangpur' },
    { key: 'Dinajpur', label: 'Dinajpur', division: 'Rangpur' },
    { key: 'Gaibandha', label: 'Gaibandha', division: 'Rangpur' },
    { key: 'Kurigram', label: 'Kurigram', division: 'Rangpur' },
    { key: 'Lalmonirhat', label: 'Lalmonirhat', division: 'Rangpur' },
    { key: 'Nilphamari', label: 'Nilphamari', division: 'Rangpur' },
    { key: 'Panchagarh', label: 'Panchagarh', division: 'Rangpur' },
    { key: 'Thakurgaon', label: 'Thakurgaon', division: 'Rangpur' },
    // mymensingh 4
    { key: 'Mymensingh', label: 'Mymensingh', division: 'Mymensingh' },
    { key: 'Jamalpur', label: 'Jamalpur', division: 'Mymensingh' },
    { key: 'Netrokona', label: 'Netrokona', division: 'Mymensingh' },
    { key: 'Kishoreganj', label: 'Kishoreganj', division: 'Mymensingh' }
];