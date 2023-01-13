var today = dayjs();
console.log(today.format('MMM D, YYYY'));



document.getElementById('newEmployee').addEventListener('click', function() {
    localStorage.setItem('info',
    JSON.stringify({ name: "name", status: "FT/PT", daysAvailable: "Su, M, T, W, Th, F, Sa"})
    );
    updateUI();
})
