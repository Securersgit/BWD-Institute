// Dataset
const users = [
  { role: "student", id: "SDT001", name: "DUDU Emmanuel", password: "30DCwinners", gpa: 4.98, classRank: "1st", attendanceRank: "96%", image: "dudu.png" },
  { role: "student", id: "SDT010", name: "Odette Dekou", password: "30DC2025", gpa: 3.86, classRank: "3rd", attendanceRank: "87%", image: "odette.png" },
  { role: "parent", id: "#PARENT001", name: "MAMA Dudu", password: "mypikin" }
];

let selectedRole = "student"; // Default tab

// Tab switching
document.getElementById("studentTab").addEventListener("click", function () {
  selectedRole = "student";
  this.classList.add("active");
  document.getElementById("guardianTab").classList.remove("active");
  document.getElementById("idLabel").textContent = "Student ID";
  document.getElementById("idInput").placeholder = "Enter your Student ID";
});

document.getElementById("guardianTab").addEventListener("click", function () {
  selectedRole = "parent";
  this.classList.add("active");
  document.getElementById("studentTab").classList.remove("active");
  document.getElementById("idLabel").textContent = "Parent ID";
  document.getElementById("idInput").placeholder = "Enter your Parent ID";
});

// Handle form submit
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const inputID = document.getElementById("idInput").value.trim();
  const inputPassword = document.getElementById("password").value.trim();

  const user = users.find(
    u => u.role === selectedRole && u.id === inputID && u.password === inputPassword
  );

  if (user) {
    // Store user details in localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    
    alert(`Welcome ${user.name}! Redirecting to your portal...`);
    if (selectedRole === "student") {
      window.location.href = "../index.html";
    } else {
      window.location.href = "parents.html";
    }
  } else {
    alert("Invalid ID or password. Please try again.");
  }
});
