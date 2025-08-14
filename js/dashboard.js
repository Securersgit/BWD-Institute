document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    
    if (loggedInUser) {
        loadUserData(loggedInUser);
    } else {
        window.location.href = "pages/login.html";
    }
    
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
    if (user.role === "student") {
        document.getElementById("profileName").textContent = user.name;
        document.getElementById("studentId").textContent = user.id;
        document.getElementById("gpa").textContent = user.gpa;
        document.getElementById("classRank").textContent = user.classRank;
        document.getElementById("attendanceRank").textContent = user.attendanceRank;

        // Update stat cards
        const gpaEl = document.getElementById("resultGpa");
        const classRankEl = document.getElementById("resultClassRank");
        const attendanceRankEl = document.getElementById("resultAttendanceRank");

        if (gpaEl) gpaEl.innerHTML = `${user.gpa} <span>+0.12</span>`;
        if (classRankEl) classRankEl.innerHTML = `${user.classRank} <span>of 98</span>`;
        if (attendanceRankEl) attendanceRankEl.innerHTML = `${user.attendanceRank} <span>+2%</span>`;

        const profileImage = document.getElementById("profileImage");
        if (user.image) {
            profileImage.src = `img/${user.image}`;
        }
        
        const welcomeElement = document.querySelector('.welcome h3:nth-child(2)');
        if (welcomeElement) {
            welcomeElement.innerHTML = `<span class="highlight">${user.name}</span> your current studentship status for (2024/2025) Session is ACTIVE`;
        }
    } else if (user.role === "parent") {
        document.getElementById("profileName").textContent = user.name;
        document.getElementById("studentId").textContent = user.id;

        const gpaSection = document.querySelector('.gpa');
        if (gpaSection) {
            gpaSection.style.display = 'none';
        }

        const statsCards = document.querySelector(".stats-cards");
        if (statsCards) statsCards.style.display = "none";

        const profileImage = document.getElementById("profileImage");
        if (user.image) {
            profileImage.src = `images/${user.image}`;
        }
    }
}
