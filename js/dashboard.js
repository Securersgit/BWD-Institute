// Dashboard dynamic data loader
document.addEventListener('DOMContentLoaded', function() {
    // Get logged in user from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    
    if (loggedInUser) {
        // Load user data dynamically
        loadUserData(loggedInUser);
    } else {
        // If no user is logged in, redirect to login page
        window.location.href = "pages/login.html";
    }
    
    // Handle sign out
    const signOutBtn = document.querySelector('.sign-out');
    if (signOutBtn) {
        signOutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem("loggedInUser");
            window.location.href = "pages/login.html";
        });
    }
});

function loadUserData(user) {
    // Update profile information
    if (user.role === "student") {
        // Update student-specific data
        document.getElementById("profileName").textContent = user.name;
        document.getElementById("studentId").textContent = user.id;
        document.getElementById("gpa").textContent = user.gpa;
        document.getElementById("classRank").textContent = user.classRank;
        document.getElementById("attendanceRank").textContent = user.attendanceRank;
        
        // Update profile image
        const profileImage = document.getElementById("profileImage");
        if (user.image) {
            profileImage.src = `img/${user.image}`;
        }
        
        // Update welcome message
        const welcomeElement = document.querySelector('.welcome h3:nth-child(2)');
        if (welcomeElement) {
            welcomeElement.innerHTML = `<span class="highlight">${user.name}</span> your current studentship status for (2024/2025) Session is ACTIVE`;
        }
    } else if (user.role === "parent") {
        // For parents, show simplified dashboard or redirect
        // You can customize this based on your needs
        document.getElementById("profileName").textContent = user.name;
        document.getElementById("studentId").textContent = user.id;
        
        // Hide academic data for parents
        const gpaSection = document.querySelector('.gpa');
        if (gpaSection) {
            gpaSection.style.display = 'none';
        }
        
        // Update profile image
        const profileImage = document.getElementById("profileImage");
        if (user.image) {
            profileImage.src = `images/${user.image}`;
        }
    }
}

// Check if user is logged in before accessing dashboard
function checkAuth() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
        window.location.href = "pages/login.html";
    }
    return loggedInUser;
}

// Initialize dashboard
checkAuth();
