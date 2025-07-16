// Aaradhya Trust Admin Panel JavaScript

// Authentication check
function checkAuthentication() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    const username = sessionStorage.getItem('adminUsername');
    
    if (!isLoggedIn || isLoggedIn !== 'true') {
        window.location.href = 'login.html';
        return false;
    }
    
    // Check session timeout (24 hours)
    const loginTime = sessionStorage.getItem('loginTime');
    if (loginTime) {
        const now = new Date().getTime();
        const login = new Date(loginTime).getTime();
        const hoursPassed = (now - login) / (1000 * 60 * 60);
        
        if (hoursPassed > 24) {
            sessionStorage.clear();
            window.location.href = 'login.html';
            return false;
        }
    }
    
    return true;
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.clear();
        window.location.href = 'login.html';
    }
}

class AdminPanel {
    setupCharts() {
        // Only setup the chart if on dashboard view and canvas exists
        const chartCanvas = document.getElementById('donation-trends-chart');
        if (!chartCanvas) return;

        // Destroy previous chart if exists
        if (this.charts.donationsChart) {
            this.charts.donationsChart.destroy();
        }

        // Example static data (replace with real aggregation if needed)
        const donationLabels = [
            'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
        ];
        const donationData = [
            1200, 900, 1500, 800, 2000, 1700, 2200
        ];

        const ctx = chartCanvas.getContext('2d');
        this.charts.donationsChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: donationLabels,
                datasets: [{
                    label: 'Donations (₹)',
                    data: donationData,
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37,99,235,0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#2563eb',
                    pointBorderColor: '#fff',
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Day'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Amount (₹)'
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    }
    constructor() {
        // Check authentication first
        if (!checkAuthentication()) {
            return;
        }
        
        this.currentView = 'dashboard';
        this.donations = [];
        this.contacts = [];
        this.charts = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSampleData();
        this.updateDashboardStats();
        this.setupCharts();
        this.animateCounters();
        this.displayUserInfo();
    }

    displayUserInfo() {
        const username = sessionStorage.getItem('adminUsername');
        if (username) {
            // You can add user info display here if needed
            console.log('Logged in as:', username);
        }
    }

    setupEventListeners() {
        // Sidebar toggle for mobile
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebar-overlay');

        sidebarToggle?.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            sidebarOverlay.classList.toggle('hidden');
        });

        sidebarOverlay?.addEventListener('click', () => {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.add('hidden');
        });

        // Navigation links
        document.getElementById('dashboard-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchView('dashboard');
        });

        document.getElementById('donations-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchView('donations');
        });

        document.getElementById('contact-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchView('contact');
        });

        // Profile dropdown
        const profileBtn = document.getElementById('profile-btn');
        const profileDropdown = document.getElementById('profile-dropdown');

        profileBtn?.addEventListener('click', () => {
            profileDropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!profileBtn?.contains(e.target) && !profileDropdown?.contains(e.target)) {
                profileDropdown?.classList.add('hidden');
            }
        });

        // Donations page events
        document.getElementById('search-donations')?.addEventListener('input', (e) => {
            this.filterDonations(e.target.value);
        });

        document.getElementById('status-filter')?.addEventListener('change', (e) => {
            this.filterDonationsByStatus(e.target.value);
        });

        document.getElementById('refresh-status-btn')?.addEventListener('click', () => {
            this.refreshPaymentStatus();
        });

        document.getElementById('export-excel-btn')?.addEventListener('click', () => {
            this.exportToExcel();
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 0) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Add logout event listener
        document.addEventListener('click', (e) => {
            if (e.target.textContent === 'Logout' || e.target.closest('a')?.textContent === 'Logout') {
                e.preventDefault();
                logout();
            }
        });
    }

    switchView(viewName) {
        // Hide all views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });

        // Show selected view
        document.getElementById(`${viewName}-view`)?.classList.add('active');

        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.getElementById(`${viewName}-link`)?.classList.add('active');

        this.currentView = viewName;

        // Load view-specific data
        if (viewName === 'dashboard') {
            this.updateDashboardStats();
            this.setupCharts();
        } else if (viewName === 'donations') {
            this.renderDonationsTable();
        } else if (viewName === 'contact') {
            this.renderContactTable();
        }

        // Close mobile sidebar
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebar-overlay');
        sidebar?.classList.remove('open');
        sidebarOverlay?.classList.add('hidden');
    }

    loadSampleData() {
        // Load data from demo-data.js if available, otherwise use inline data
        if (typeof window.demoData !== 'undefined') {
            this.donations = window.demoData.donations;
            this.contacts = window.demoData.contacts;
        } else {
            // Fallback inline data
            this.donations = [
                {
                    id: 1,
                    donor_name: "Rajesh Kumar",
                    email: "rajesh.kumar@email.com",
                    phone: "9876543210",
                    pan: "ABCDE1234F",
                    aadhar: "1234567890123456",
                    amount: 5000,
                    message: "For the noble cause",
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
                    message: "Great initiative",
                    razorpay_payment_id: "pay_789123456",
                    payment_status: "failed",
                    created_at: "2025-07-12T14:20:00Z"
                }
            ];

            this.contacts = [
                {
                    id: 1,
                    name: "Venkatesh Iyer",
                    email: "venkatesh.iyer@email.com",
                    phone: "9876543210",
                    message: "When will the memorial be completed?",
                    created_at: "2025-07-15T11:00:00Z",
                    status: "unread"
                },
                {
                    id: 2,
                    name: "Lakshmi Devi",
                    email: "lakshmi.devi@email.com",
                    phone: "9988776655",
                    message: "I would like to contribute to the cause. Please provide bank details.",
                    created_at: "2025-07-14T16:30:00Z",
                    status: "read"
                },
                {
                    id: 3,
                    name: "Ravi Shankar",
                    email: "ravi.shankar@email.com",
                    phone: "9123456789",
                    message: "Can I get a visit to the memorial site?",
                    created_at: "2025-07-13T10:45:00Z",
                    status: "unread"
                }
            ];
        }
    }

    updateDashboardStats() {
        const totalDonations = this.donations
            .filter(d => d.payment_status === 'captured')
            .reduce((sum, d) => sum + d.amount, 0);

        const totalDonors = new Set(this.donations.map(d => d.email)).size;
        const totalEnquiries = this.contacts.length;

        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const monthDonations = this.donations
            .filter(d => {
                const date = new Date(d.created_at);
                return date.getMonth() === currentMonth && 
                       date.getFullYear() === currentYear &&
                       d.payment_status === 'captured';
            })
            .reduce((sum, d) => sum + d.amount, 0);

        // Update stats with animation
        this.animateCounter('total-donations', totalDonations);
        this.animateCounter('total-donors', totalDonors);
        this.animateCounter('total-enquiries', totalEnquiries);
        this.animateCounter('month-donations', monthDonations);

        // Update recent activity
        this.updateRecentActivity();
    }

    animateCounter(elementId, targetValue) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const startValue = 0;
        const duration = 2000; // 2 seconds
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
            
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }

    animateCounters() {
        // Animate stat cards when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Ensure cards are visible first
                    entry.target.style.opacity = '1';
                    
                    // Check if GSAP is available
                    if (typeof gsap !== 'undefined') {
                        gsap.from(entry.target, {
                            duration: 0.8,
                            y: 50,
                            opacity: 0,
                            ease: "power2.out",
                            delay: 0.2
                        });
                    }
                    // Unobserve to prevent re-animation
                    observer.unobserve(entry.target);
                }
            });
        });

        document.querySelectorAll('.stat-card').forEach(card => {
            // Set initial opacity to ensure cards are visible
            card.style.opacity = '1';
            observer.observe(card);
        });
    }

    updateRecentActivity() {
        const recentActivityContainer = document.getElementById('recent-activity');
        if (!recentActivityContainer) return;

        // Get recent donations and contacts
        const recentDonations = this.donations
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 3);

        const recentContacts = this.contacts
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 2);

        let activityHTML = '';

        recentDonations.forEach(donation => {
            const date = new Date(donation.created_at).toLocaleDateString();
            const statusColor = this.getStatusColor(donation.payment_status);
            
            activityHTML += `
                <div class="activity-item">
                    <div class="activity-icon bg-green-100 text-green-600">
                        <i class="fas fa-hand-holding-usd"></i>
                    </div>
                    <div class="flex-1">
                        <p class="text-sm font-medium">${donation.donor_name} donated ₹${donation.amount.toLocaleString()}</p>
                        <p class="text-xs text-gray-500">${date} • <span class="text-${statusColor}-600">${donation.payment_status}</span></p>
                    </div>
                </div>
            `;
        });

        recentContacts.forEach(contact => {
            const date = new Date(contact.created_at).toLocaleDateString();
            
            activityHTML += `
                <div class="activity-item">
                    <div class="activity-icon bg-blue-100 text-blue-600">
                        <i class="fas fa-envelope"></i>
                    </div>
                    <div class="flex-1">
                        <p class="text-sm font-medium">${contact.name} sent an enquiry</p>
                        <p class="text-xs text-gray-500">${date} • ${contact.status}</p>
                    </div>
                </div>
            `;
        });

        recentActivityContainer.innerHTML = activityHTML;
    }

    // setupCharts removed: Donations Over Time graph is no longer shown

    updateChart() {
        if (this.charts.donationsChart) {
            this.charts.donationsChart.update();
        }
    }

    renderDonationsTable() {
        const tableBody = document.getElementById('donations-table-body');
        if (!tableBody) return;

        let html = '';
        this.donations.forEach(donation => {
            const date = new Date(donation.created_at).toLocaleDateString();
            const time = new Date(donation.created_at).toLocaleTimeString();
            const maskedPAN = this.maskPAN(donation.pan);
            const maskedAadhar = this.maskAadhar(donation.aadhar);
            const statusBadge = this.getStatusBadge(donation.payment_status);

            html += `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${donation.donor_name}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${donation.email}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${donation.phone}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${maskedPAN}</td>
                   <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${maskedAadhar}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹${donation.amount.toLocaleString()}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${statusBadge}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${date}<br><span class="text-xs">${time}</span></td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button onclick="adminPanel.viewDonation(${donation.id})" class="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                    </td>
                </tr>
            `;
        });

        tableBody.innerHTML = html;
    }

    renderContactTable() {
        const tableBody = document.getElementById('contact-table-body');
        if (!tableBody) return;

        let html = '';
        this.contacts.forEach(contact => {
            const date = new Date(contact.created_at).toLocaleDateString();
            const truncatedMessage = contact.message.length > 50 
                ? contact.message.substring(0, 50) + '...' 
                : contact.message;

            html += `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${contact.name}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${contact.email}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${contact.phone}</td>
                    <td class="px-6 py-4 text-sm text-gray-500">${truncatedMessage}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${date}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button onclick="adminPanel.viewContact(${contact.id})" class="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                        <button onclick="adminPanel.markAsRead(${contact.id})" class="text-green-600 hover:text-green-900">Mark Read</button>
                    </td>
                </tr>
            `;
        });

        tableBody.innerHTML = html;
    }

    filterDonations(searchTerm) {
        const filtered = this.donations.filter(donation => 
            donation.donor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donation.pan.toLowerCase().includes(searchTerm.toLowerCase())
        );

        this.renderFilteredDonations(filtered);
    }

    filterDonationsByStatus(status) {
        const filtered = status 
            ? this.donations.filter(donation => donation.payment_status === status)
            : this.donations;

        this.renderFilteredDonations(filtered);
    }

    renderFilteredDonations(donations) {
        const tableBody = document.getElementById('donations-table-body');
        if (!tableBody) return;

        let html = '';
        donations.forEach(donation => {
            const date = new Date(donation.created_at).toLocaleDateString();
            const time = new Date(donation.created_at).toLocaleTimeString();
            const maskedPAN = this.maskPAN(donation.pan);
            const maskedAadhar = this.maskAadhar(donation.aadhar);
            const statusBadge = this.getStatusBadge(donation.payment_status);

            html += `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${donation.donor_name}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${donation.email}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${donation.phone}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${maskedPAN}</td>
                   <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${maskedAadhar}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹${donation.amount.toLocaleString()}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${statusBadge}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${date}<br><span class="text-xs">${time}</span></td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button onclick="adminPanel.viewDonation(${donation.id})" class="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                    </td>
                </tr>
            `;
        });

        tableBody.innerHTML = html;
    }

    refreshPaymentStatus() {
        // Simulate API call
        setTimeout(() => {
            // In real implementation, this would call Razorpay API
            this.donations.forEach(donation => {
                if (donation.payment_status === 'pending') {
                    // Randomly update some pending payments
                    if (Math.random() > 0.5) {
                        donation.payment_status = 'captured';
                    }
                }
            });

            this.renderDonationsTable();
            this.updateDashboardStats();
        }, 2000);
    }

    exportToExcel() {
        const exportData = this.donations.map(donation => ({
            'Full Name': donation.donor_name,
            'Email': donation.email,
            'Phone': donation.phone,
            'PAN': donation.pan,
            'Aadhar': donation.aadhar,
            'Amount (₹)': donation.amount,
            'Message': donation.message,
            'Payment ID': donation.razorpay_payment_id,
            'Status': donation.payment_status,
            'Date': new Date(donation.created_at).toLocaleDateString(),
            'Time': new Date(donation.created_at).toLocaleTimeString()
        }));

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Donations');

        const fileName = `Aaradhya_Trust_Donations_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(wb, fileName);
    }

    // Helper methods
    maskPAN(pan) {
        return pan.substring(0, 5) + '***' + pan.substring(8);
    }

    maskAadhar(aadhar) {
        return 'XXXX-XXXX-' + aadhar.substring(12);
    }

    getStatusBadge(status) {
        const badges = {
            'captured': '<span class="status-badge status-captured">✅ Captured</span>',
            'pending': '<span class="status-badge status-pending">⏳ Pending</span>',
            'failed': '<span class="status-badge status-failed">❌ Failed</span>'
        };
        return badges[status] || badges['pending'];
    }

    getStatusColor(status) {
        const colors = {
            'captured': 'green',
            'pending': 'yellow',
            'failed': 'red'
        };
        return colors[status] || 'gray';
    }

    // Action methods
    viewDonation(id) {
        const donation = this.donations.find(d => d.id === id);
        if (donation) {
            alert(`Donation Details:\n\nName: ${donation.donor_name}\nEmail: ${donation.email}\nAmount: ₹${donation.amount}\nMessage: ${donation.message}\nStatus: ${donation.payment_status}`);
        }
    }

    deleteDonation(id) {
        if (confirm('Are you sure you want to delete this donation record?')) {
            this.donations = this.donations.filter(d => d.id !== id);
            this.renderDonationsTable();
            this.updateDashboardStats();
        }
    }

    viewContact(id) {
        const contact = this.contacts.find(c => c.id === id);
        if (contact) {
            alert(`Contact Details:\n\nName: ${contact.name}\nEmail: ${contact.email}\nPhone: ${contact.phone}\nMessage: ${contact.message}`);
        }
    }

    markAsRead(id) {
        const contact = this.contacts.find(c => c.id === id);
        if (contact) {
            contact.status = 'read';
            this.renderContactTable();
        }
    }
}


    // Initialize the admin panel when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        window.adminPanel = new AdminPanel();
    });

// Additional utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN');
}

function formatTime(dateString) {
    return new Date(dateString).toLocaleTimeString('en-IN');
}

// Export functions for global access
window.formatCurrency = formatCurrency;
window.formatDate = formatDate;
window.formatTime = formatTime;
