document.addEventListener("DOMContentLoaded", function () {
  const loading = document.getElementById("loading");

  // Hide loading on first load
  setTimeout(() => {
    loading.classList.add("fade-out");
  }, 200);

  // Sidebar navigation click
  document.querySelectorAll(".sidebar ul li").forEach(item => {
    item.addEventListener("click", () => {
      // Show loading
      loading.classList.remove("fade-out");

      // Simulate content load
      setTimeout(() => {
        loading.classList.add("fade-out");

        // Optional: change the "active" class for highlighting
        document.querySelectorAll(".sidebar ul li").forEach(li => li.classList.remove("active"));
        item.classList.add("active");

      }, 1000); // adjust delay for effect
    });
  });
});
