// Sample attendance data
const ctx = document.getElementById('attendanceChart').getContext('2d');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Mon', 'Tue'],
    datasets: [{
      label: 'Attendance',
      data: [1, 1, 0, 1, 0.5, 1, 1], // 1=Present, 0=Absent, 0.5=Late
      backgroundColor: ['#4caf50', '#4caf50', '#f44336', '#4caf50', '#ff9800', '#4caf50', '#4caf50']
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 1
      }
    }
  }
});



