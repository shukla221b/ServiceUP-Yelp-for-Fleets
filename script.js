// Global state management
let currentUserType = 'fleet'; // 'fleet' or 'shop'
let currentPage = 'fleetLanding';
let selectedShop = null;
let selectedTimeSlot = null;
let currentRating = 0;
let selectedStatus = null;
let uploadedFiles = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set initial view
    showFleetLanding();
    
    // Add event listeners
    setupEventListeners();
}

function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('locationSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                showSearchResults();
            }
        });
    }
    
    // File upload functionality
    const photoUpload = document.getElementById('photoUpload');
    if (photoUpload) {
        photoUpload.addEventListener('change', handleFileUpload);
    }
    
    // Initialize request time and ID
    initializeRequestData();
}

// Navigation Functions
function toggleUserType() {
    currentUserType = currentUserType === 'fleet' ? 'shop' : 'fleet';
    
    // Update UI
    const userTypeToggle = document.getElementById('userTypeToggle');
    const currentUser = document.getElementById('currentUser');
    const fleetViews = document.getElementById('fleetViews');
    const shopViews = document.getElementById('shopViews');
    
    if (currentUserType === 'fleet') {
        userTypeToggle.textContent = 'Switch to Shop View';
        currentUser.textContent = 'Fleet Manager';
        fleetViews.classList.add('active');
        shopViews.classList.remove('active');
        showFleetLanding();
    } else {
        userTypeToggle.textContent = 'Switch to Fleet View';
        currentUser.textContent = 'Repair Shop';
        shopViews.classList.add('active');
        fleetViews.classList.remove('active');
        showShopDashboard();
    }
}

// Fleet Manager Navigation
function showFleetLanding() {
    hideAllPages();
    document.getElementById('fleetLanding').classList.add('active');
    currentPage = 'fleetLanding';
}

function showSearchResults() {
    hideAllPages();
    document.getElementById('searchResults').classList.add('active');
    currentPage = 'searchResults';
}

function showShopDetail(shopId = null) {
    hideAllPages();
    document.getElementById('shopDetail').classList.add('active');
    currentPage = 'shopDetail';
    
    if (shopId) {
        selectedShop = shopId;
        updateShopDetail(shopId);
    }
}

function showQuoteRequest() {
    hideAllPages();
    document.getElementById('quoteRequest').classList.add('active');
    currentPage = 'quoteRequest';
}

function showLeadManagement() {
    hideAllPages();
    document.getElementById('leadManagement').classList.add('active');
    currentPage = 'leadManagement';
}

// Shop Navigation
function showShopDashboard() {
    hideAllPages();
    document.getElementById('shopDashboard').classList.add('active');
    currentPage = 'shopDashboard';
}

function showNewLeads() {
    hideAllPages();
    document.getElementById('newLeads').classList.add('active');
    currentPage = 'newLeads';
}

function showLeadDetail(leadId) {
    hideAllPages();
    document.getElementById('leadDetail').classList.add('active');
    currentPage = 'leadDetail';
    updateLeadDetail(leadId);
}

function showPerformanceInsights() {
    hideAllPages();
    document.getElementById('performanceInsights').classList.add('active');
    currentPage = 'performanceInsights';
}

function showProfileManagement() {
    hideAllPages();
    document.getElementById('profileManagement').classList.add('active');
    currentPage = 'profileManagement';
}

function showAvailability() {
    // This would show availability management - placeholder for now
    alert('Availability management feature would be implemented here');
}

// Utility Functions
function hideAllPages() {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
}

function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => button.classList.remove('active'));
    
    // Show selected tab content
    document.getElementById(tabName + '-tab').classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

function showStatusTab(tabName) {
    // Hide all status contents
    const statusContents = document.querySelectorAll('.status-content');
    statusContents.forEach(content => content.classList.remove('active'));
    
    // Remove active class from all status tab buttons
    const statusTabs = document.querySelectorAll('.status-tab');
    statusTabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected status content
    document.getElementById(tabName + '-requests').classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Shop Detail Functions
function updateShopDetail(shopId) {
    const shopData = getShopData(shopId);
    const title = document.getElementById('shopDetailTitle');
    if (title) {
        title.textContent = shopData.name;
    }
}

function getShopData(shopId) {
    const shops = {
        'metro-auto': {
            name: 'Metro Auto Repair',
            rating: 4.7,
            reviews: 127,
            turnaround: '2.5 days',
            onTime: '98%',
            distance: '2.4 mi',
            verified: true,
            certified: 'ASE'
        },
        'premier-fleet': {
            name: 'Premier Fleet Services',
            rating: 4.9,
            reviews: 89,
            turnaround: '1.8 days',
            onTime: '99%',
            distance: '5.1 mi',
            verified: true,
            certified: 'OEM'
        },
        'eco-fleet': {
            name: 'Eco Fleet Solutions',
            rating: 4.3,
            reviews: 156,
            turnaround: '3.2 days',
            onTime: '95%',
            distance: '3.7 mi',
            verified: true,
            certified: 'EV'
        }
    };
    
    return shops[shopId] || shops['metro-auto'];
}

// Time Slot Selection
function selectTimeSlot(slotId) {
    // Remove previous selection
    const previousSelected = document.querySelector('.time-slot.selected');
    if (previousSelected) {
        previousSelected.classList.remove('selected');
    }
    
    // Add selection to clicked slot
    event.target.closest('.time-slot').classList.add('selected');
    selectedTimeSlot = slotId;
    
    // Enable booking buttons
    const bookingButtons = document.querySelectorAll('.booking-actions button');
    bookingButtons.forEach(button => {
        button.disabled = false;
        button.style.opacity = '1';
    });
}

// Quote Request Functions
function submitQuoteRequest(event) {
    event.preventDefault();
    
    // Simulate form submission
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Show confirmation modal
    showConfirmationModal();
    
    // Reset form
    event.target.reset();
}

function showConfirmationModal() {
    // Create and show a simple confirmation
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Request Submitted</h3>
                <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <p>We've notified 3 nearby shops. You'll hear back within 30 minutes.</p>
                <div class="modal-actions">
                    <button class="btn-primary" onclick="this.closest('.modal').remove(); showLeadManagement();">View Status</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Lead Management Functions
function showRatingModal() {
    const modal = document.getElementById('ratingModal');
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('ratingModal');
    modal.classList.remove('active');
}

function setRating(rating) {
    currentRating = rating;
    const stars = document.querySelectorAll('.star-rating .star');
    
    stars.forEach((star, index) => {
        if (index < rating) {
            star.style.color = '#ffc107';
        } else {
            star.style.color = '#e9ecef';
        }
    });
}

function submitRating() {
    if (currentRating === 0) {
        alert('Please select a rating');
        return;
    }
    
    // Simulate rating submission
    alert(`Thank you for your ${currentRating}-star rating!`);
    closeModal();
    
    // Reset rating
    currentRating = 0;
    const stars = document.querySelectorAll('.star-rating .star');
    stars.forEach(star => {
        star.style.color = '#e9ecef';
    });
}

// Shop Functions
function updateLeadDetail(leadId) {
    const leadData = getLeadData(leadId);
    // Update lead detail content based on leadId
    console.log('Updating lead detail for:', leadId);
}

function getLeadData(leadId) {
    const leads = {
        'abc-logistics': {
            company: 'ABC Logistics',
            vehicle: 'Commercial Truck #FL-001',
            issue: 'Brake system making grinding noise, reduced stopping power',
            timeframe: 'Within 48 hours',
            distance: '2.4 miles'
        },
        'metro-delivery': {
            company: 'Metro Delivery',
            vehicle: 'Delivery Van #MD-005',
            issue: 'Engine diagnostic required',
            timeframe: 'Within a week',
            distance: '5.1 miles'
        },
        'green-fleet': {
            company: 'Green Fleet Co.',
            vehicle: 'Electric Truck #GF-012',
            issue: 'Battery system maintenance',
            timeframe: 'ASAP (Emergency)',
            distance: '3.7 miles'
        }
    };
    
    return leads[leadId] || leads['abc-logistics'];
}

function submitQuote(event) {
    event.preventDefault();
    
    // Simulate quote submission
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Show success message
    alert('Quote submitted successfully! The fleet manager will be notified.');
    
    // Go back to leads
    showNewLeads();
}

// Filter Functions
function applyFilters() {
    const selectedFilters = [];
    const checkboxes = document.querySelectorAll('.filter-option input[type="checkbox"]:checked');
    
    checkboxes.forEach(checkbox => {
        selectedFilters.push(checkbox.value);
    });
    
    console.log('Applied filters:', selectedFilters);
    
    // For demo purposes, just show search results
    showSearchResults();
    
    // Show filter count
    if (selectedFilters.length > 0) {
        alert(`Applied ${selectedFilters.length} filters. Showing filtered results.`);
    }
}

function clearFilters() {
    const checkboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}

// VIN Lookup Function
function lookupVIN() {
    const vinInput = document.getElementById('vinInput');
    const vin = vinInput.value.trim();
    
    if (vin.length < 17) {
        alert('Please enter a valid 17-character VIN');
        return;
    }
    
    // Simulate VIN lookup
    alert('VIN lookup successful! Vehicle details would be auto-populated here.');
    
    // In a real implementation, this would populate vehicle fields
    console.log('VIN lookup for:', vin);
}

// File Upload Functions
function handleFileUpload(event) {
    const files = Array.from(event.target.files);
    
    files.forEach(file => {
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            alert(`File ${file.name} is too large. Maximum size is 10MB.`);
            return;
        }
        
        uploadedFiles.push(file);
        displayUploadedFile(file);
    });
}

function displayUploadedFile(file) {
    const uploadedFilesDiv = document.getElementById('uploadedFiles');
    const fileDiv = document.createElement('div');
    fileDiv.className = 'uploaded-file';
    fileDiv.innerHTML = `
        <div>
            <i class="fas fa-file"></i>
            <span>${file.name}</span>
            <small>(${(file.size / 1024 / 1024).toFixed(2)} MB)</small>
        </div>
        <button onclick="removeFile('${file.name}')" class="btn-secondary small">Remove</button>
    `;
    uploadedFilesDiv.appendChild(fileDiv);
}

function removeFile(fileName) {
    uploadedFiles = uploadedFiles.filter(file => file.name !== fileName);
    
    // Remove from display
    const fileElements = document.querySelectorAll('.uploaded-file');
    fileElements.forEach(element => {
        if (element.textContent.includes(fileName)) {
            element.remove();
        }
    });
}

// Request Data Functions
function initializeRequestData() {
    const now = new Date();
    const requestTime = document.getElementById('requestTime');
    const requestId = document.getElementById('requestId');
    
    if (requestTime) {
        requestTime.textContent = now.toLocaleString();
    }
    
    if (requestId) {
        requestId.textContent = 'REQ-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }
}

// Status Update Functions
function sendStatusUpdate() {
    const modal = document.getElementById('statusUpdateModal');
    modal.classList.add('active');
}

function closeStatusModal() {
    const modal = document.getElementById('statusUpdateModal');
    modal.classList.remove('active');
    selectedStatus = null;
    
    // Reset status options
    const statusOptions = document.querySelectorAll('.status-option');
    statusOptions.forEach(option => option.classList.remove('selected'));
}

function selectStatus(status) {
    selectedStatus = status;
    
    // Update UI
    const statusOptions = document.querySelectorAll('.status-option');
    statusOptions.forEach(option => option.classList.remove('selected'));
    event.target.closest('.status-option').classList.add('selected');
}

function sendStatusUpdate() {
    if (!selectedStatus) {
        alert('Please select a status update');
        return;
    }
    
    const jobSelect = document.getElementById('jobSelect');
    const selectedJob = jobSelect.value;
    
    if (!selectedJob) {
        alert('Please select a job to update');
        return;
    }
    
    // Simulate sending update
    alert(`Status update sent for ${selectedJob}: ${selectedStatus}`);
    closeStatusModal();
}

function requestUpdate() {
    alert('Update request sent to the shop. You will be notified when they respond.');
}

// Demo Data and Mock Functions
function loadDemoData() {
    // This function would load demo data for the prototype
    console.log('Loading demo data...');
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // ESC key to close modals
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
        }
    }
    
    // Arrow keys for navigation (if needed)
    if (e.key === 'ArrowLeft' && currentPage !== 'fleetLanding' && currentPage !== 'shopDashboard') {
        // Go back to previous page
        if (currentUserType === 'fleet') {
            if (currentPage === 'searchResults') {
                showFleetLanding();
            } else if (currentPage === 'shopDetail') {
                showSearchResults();
            } else if (currentPage === 'quoteRequest') {
                showShopDetail();
            } else if (currentPage === 'leadManagement') {
                showFleetLanding();
            }
        } else {
            if (currentPage === 'newLeads') {
                showShopDashboard();
            } else if (currentPage === 'leadDetail') {
                showNewLeads();
            } else if (currentPage === 'performanceInsights') {
                showShopDashboard();
            } else if (currentPage === 'profileManagement') {
                showShopDashboard();
            }
        }
    }
});

// Form Validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            field.style.borderColor = '#e9ecef';
        }
    });
    
    return isValid;
}

// Utility function to show loading states
function showLoading(element) {
    element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    element.disabled = true;
}

function hideLoading(element, originalText) {
    element.innerHTML = originalText;
    element.disabled = false;
}

// Initialize demo data when page loads
window.addEventListener('load', function() {
    loadDemoData();
    
    // Add some demo interactions
    console.log('Yelp for Fleets Prototype Loaded');
    console.log('Use the toggle button to switch between Fleet Manager and Shop views');
    console.log('Click through the different pages to explore the user flows');
});

// Export functions for global access
window.toggleUserType = toggleUserType;
window.showFleetLanding = showFleetLanding;
window.showSearchResults = showSearchResults;
window.showShopDetail = showShopDetail;
window.showQuoteRequest = showQuoteRequest;
window.showLeadManagement = showLeadManagement;
window.showShopDashboard = showShopDashboard;
window.showNewLeads = showNewLeads;
window.showLeadDetail = showLeadDetail;
window.showPerformanceInsights = showPerformanceInsights;
window.showProfileManagement = showProfileManagement;
window.showAvailability = showAvailability;
window.showTab = showTab;
window.showStatusTab = showStatusTab;
window.selectTimeSlot = selectTimeSlot;
window.submitQuoteRequest = submitQuoteRequest;
window.showRatingModal = showRatingModal;
window.closeModal = closeModal;
window.setRating = setRating;
window.submitRating = submitRating;
window.submitQuote = submitQuote;
window.applyFilters = applyFilters;
window.clearFilters = clearFilters;
window.lookupVIN = lookupVIN;
window.handleFileUpload = handleFileUpload;
window.removeFile = removeFile;
window.sendStatusUpdate = sendStatusUpdate;
window.closeStatusModal = closeStatusModal;
window.selectStatus = selectStatus;
window.requestUpdate = requestUpdate;
