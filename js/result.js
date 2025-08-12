document.querySelectorAll(".sidebar ul li").forEach((item, index) => {
    item.addEventListener("click", () => {
        document.querySelector("#dashboard-page").style.display = (index === 0) ? "block" : "none";
        document.querySelector("#results-page").style.display = (index === 1) ? "block" : "none";
        
        // update active class
        document.querySelectorAll(".sidebar ul li").forEach(li => li.classList.remove("active"));
        item.classList.add("active");
    });
});
