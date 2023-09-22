document.getElementById('setPasswordButton').addEventListener('click', function() {
    const enteredPassword = document.getElementById('passwordInput').value;
    chrome.storage.local.set({ 'parentPassword': enteredPassword }, function() {
        alert("Password set!");
    });
});

document.getElementById('toggleFilterButton').addEventListener('click', function() {
    const enteredPassword = document.getElementById('togglePasswordInput').value;
    chrome.storage.local.get('parentPassword', function(data) {
        if (enteredPassword === data.parentPassword) {
            chrome.storage.local.get('filterEnabled', function(data) {
                const newStatus = !data.filterEnabled;
                chrome.storage.local.set({ 'filterEnabled': newStatus }, function() {
                    alert(`Filter is now ${newStatus ? "enabled" : "disabled"}`);
                });
            });
        } else {
            alert("Incorrect password!");
        }
    });
});
