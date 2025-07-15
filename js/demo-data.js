// Demo data for Aaradhya Trust Admin Panel
// This file contains sample data for development and testing purposes

const demoData = {
    donations: [
        {
            id: 1,
            donor_name: "Rajesh Kumar",
            email: "rajesh.kumar@email.com",
            phone: "9876543210",
            pan: "ABCDE1234F",
            aadhar: "1234567890123456",
            amount: 5000,
            message: "For the noble cause of SPB memorial",
            razorpay_payment_id: "pay_123456789",
            payment_status: "captured",
            created_at: "2025-07-15T10:30:00Z"
        },
        {
            id: 2,
            donor_name: "Priya Sharma",
            email: "priya.sharma@email.com",
            phone: "9988776655",
            pan: "FGHIJ5678K",
            aadhar: "6789012345678901",
            amount: 2000,
            message: "Best wishes for SPB memorial",
            razorpay_payment_id: "pay_987654321",
            payment_status: "pending",
            created_at: "2025-07-14T15:45:00Z"
        },
        {
            id: 3,
            donor_name: "Amit Patel",
            email: "amit.patel@email.com",
            phone: "9123456789",
            pan: "KLMNO9012P",
            aadhar: "2345678901234567",
            amount: 10000,
            message: "In memory of SPB sir",
            razorpay_payment_id: "pay_456789123",
            payment_status: "captured",
            created_at: "2025-07-13T09:15:00Z"
        },
        {
            id: 4,
            donor_name: "Sunita Reddy",
            email: "sunita.reddy@email.com",
            phone: "9876512345",
            pan: "QRSTU3456V",
            aadhar: "8901234567890123",
            amount: 1500,
            message: "Great initiative for our beloved SPB",
            razorpay_payment_id: "pay_789123456",
            payment_status: "failed",
            created_at: "2025-07-12T14:20:00Z"
        },
        {
            id: 5,
            donor_name: "Venkatesh Iyer",
            email: "venkatesh.iyer@email.com",
            phone: "9567890123",
            pan: "WXYZ7890A",
            aadhar: "4567890123456789",
            amount: 25000,
            message: "Proud to contribute to SPB memorial",
            razorpay_payment_id: "pay_234567890",
            payment_status: "captured",
            created_at: "2025-07-11T11:30:00Z"
        },
        {
            id: 6,
            donor_name: "Lakshmi Devi",
            email: "lakshmi.devi@email.com",
            phone: "9345678901",
            pan: "BCDEF2345G",
            aadhar: "7890123456789012",
            amount: 3000,
            message: "For the music legend",
            razorpay_payment_id: "pay_345678901",
            payment_status: "captured",
            created_at: "2025-07-10T16:45:00Z"
        },
        {
            id: 7,
            donor_name: "Ravi Shankar",
            email: "ravi.shankar@email.com",
            phone: "9234567890",
            pan: "GHIJK3456H",
            aadhar: "0123456789012345",
            amount: 7500,
            message: "May SPB sir's legacy live forever",
            razorpay_payment_id: "pay_456789012",
            payment_status: "captured",
            created_at: "2025-07-09T13:20:00Z"
        },
        {
            id: 8,
            donor_name: "Meera Nair",
            email: "meera.nair@email.com",
            phone: "9098765432",
            pan: "LMNOP4567I",
            aadhar: "3456789012345678",
            amount: 2500,
            message: "Honoring the voice of generations",
            razorpay_payment_id: "pay_567890123",
            payment_status: "pending",
            created_at: "2025-07-08T12:10:00Z"
        },
        {
            id: 9,
            donor_name: "Arjun Reddy",
            email: "arjun.reddy@email.com",
            phone: "9876543219",
            pan: "QRSTU5678J",
            aadhar: "6789012345678901",
            amount: 15000,
            message: "SPB sir inspired millions",
            razorpay_payment_id: "pay_678901234",
            payment_status: "captured",
            created_at: "2025-07-07T10:30:00Z"
        },
        {
            id: 10,
            donor_name: "Kavitha Menon",
            email: "kavitha.menon@email.com",
            phone: "9765432108",
            pan: "VWXYZ6789K",
            aadhar: "9012345678901234",
            amount: 4000,
            message: "For the eternal voice",
            razorpay_payment_id: "pay_789012345",
            payment_status: "captured",
            created_at: "2025-07-06T14:15:00Z"
        }
    ],

    contacts: [
        {
            id: 1,
            name: "Venkatesh Iyer",
            email: "venkatesh.iyer@email.com",
            phone: "9876543210",
            message: "When will the memorial be completed? I am very excited to visit once it's ready.",
            created_at: "2025-07-15T11:00:00Z",
            status: "unread"
        },
        {
            id: 2,
            name: "Lakshmi Devi",
            email: "lakshmi.devi@email.com",
            phone: "9988776655",
            message: "I would like to contribute to the cause. Please provide bank details for direct transfer.",
            created_at: "2025-07-14T16:30:00Z",
            status: "read"
        },
        {
            id: 3,
            name: "Ravi Shankar",
            email: "ravi.shankar@email.com",
            phone: "9123456789",
            message: "Can I get a personal visit to the memorial site? I am a huge fan of SPB sir.",
            created_at: "2025-07-13T10:45:00Z",
            status: "unread"
        },
        {
            id: 4,
            name: "Priya Subramanian",
            email: "priya.subramanian@email.com",
            phone: "9567890123",
            message: "I represent a music academy. We would like to organize a tribute event at the memorial.",
            created_at: "2025-07-12T09:30:00Z",
            status: "read"
        },
        {
            id: 5,
            name: "Karthik Raj",
            email: "karthik.raj@email.com",
            phone: "9345678901",
            message: "Are there any volunteer opportunities available for the memorial project?",
            created_at: "2025-07-11T15:20:00Z",
            status: "unread"
        },
        {
            id: 6,
            name: "Sujatha Mohan",
            email: "sujatha.mohan@email.com",
            phone: "9234567890",
            message: "I am a music journalist. Can I get an interview about the memorial project?",
            created_at: "2025-07-10T12:15:00Z",
            status: "read"
        },
        {
            id: 7,
            name: "Ramesh Naidu",
            email: "ramesh.naidu@email.com",
            phone: "9876512345",
            message: "My organization wants to sponsor a section of the memorial. Please contact us.",
            created_at: "2025-07-09T17:45:00Z",
            status: "unread"
        },
        {
            id: 8,
            name: "Deepa Venkat",
            email: "deepa.venkat@email.com",
            phone: "9098765432",
            message: "I have some rare photographs of SPB sir. Would you like them for the memorial?",
            created_at: "2025-07-08T14:30:00Z",
            status: "read"
        }
    ],

    stats: {
        totalDonations: 75000,
        totalDonors: 120,
        totalEnquiries: 25,
        monthlyDonations: 45000,
        averageDonation: 5200,
        topDonation: 25000
    },

    chartData: {
        dailyDonations: [
            { date: '2025-07-01', amount: 2500 },
            { date: '2025-07-02', amount: 1800 },
            { date: '2025-07-03', amount: 3200 },
            { date: '2025-07-04', amount: 2900 },
            { date: '2025-07-05', amount: 4100 },
            { date: '2025-07-06', amount: 3800 },
            { date: '2025-07-07', amount: 5200 },
            { date: '2025-07-08', amount: 3600 },
            { date: '2025-07-09', amount: 4800 },
            { date: '2025-07-10', amount: 3400 },
            { date: '2025-07-11', amount: 6200 },
            { date: '2025-07-12', amount: 2100 },
            { date: '2025-07-13', amount: 4500 },
            { date: '2025-07-14', amount: 3900 },
            { date: '2025-07-15', amount: 5800 }
        ],
        
        monthlyDonations: [
            { month: 'Jan', amount: 15000 },
            { month: 'Feb', amount: 22000 },
            { month: 'Mar', amount: 18000 },
            { month: 'Apr', amount: 25000 },
            { month: 'May', amount: 32000 },
            { month: 'Jun', amount: 28000 },
            { month: 'Jul', amount: 45000 }
        ],
        
        donationsByAmount: [
            { range: '₹0-1000', count: 45 },
            { range: '₹1000-5000', count: 38 },
            { range: '₹5000-10000', count: 22 },
            { range: '₹10000-25000', count: 12 },
            { range: '₹25000+', count: 3 }
        ]
    },

    recentActivity: [
        {
            type: 'donation',
            user: 'Rajesh Kumar',
            action: 'donated ₹5,000',
            time: '2 hours ago',
            icon: 'fas fa-hand-holding-usd',
            color: 'green'
        },
        {
            type: 'contact',
            user: 'Priya Sharma',
            action: 'sent an enquiry',
            time: '4 hours ago',
            icon: 'fas fa-envelope',
            color: 'blue'
        },
        {
            type: 'donation',
            user: 'Amit Patel',
            action: 'donated ₹10,000',
            time: '1 day ago',
            icon: 'fas fa-hand-holding-usd',
            color: 'green'
        },
        {
            type: 'contact',
            user: 'Venkatesh Iyer',
            action: 'asked about memorial completion',
            time: '2 days ago',
            icon: 'fas fa-question-circle',
            color: 'purple'
        },
        {
            type: 'donation',
            user: 'Lakshmi Devi',
            action: 'donated ₹3,000',
            time: '3 days ago',
            icon: 'fas fa-hand-holding-usd',
            color: 'green'
        }
    ],

    notifications: [
        {
            id: 1,
            title: 'New Donation Received',
            message: 'Rajesh Kumar donated ₹5,000',
            type: 'success',
            time: '2 hours ago',
            read: false
        },
        {
            id: 2,
            title: 'Payment Status Updated',
            message: '3 pending payments have been captured',
            type: 'info',
            time: '4 hours ago',
            read: false
        },
        {
            id: 3,
            title: 'New Contact Enquiry',
            message: 'Priya Sharma sent an enquiry about memorial visit',
            type: 'info',
            time: '6 hours ago',
            read: true
        }
    ]
};


export { demoData };
