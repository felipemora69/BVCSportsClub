console.log('Script loaded and running.');

// Display confirmation details on page load
//document.addEventListener('DOMContentLoaded', () => {
//    console.log('DOM content loaded.');
//});

// Function to extract query parameter from URL
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

document.addEventListener('DOMContentLoaded', () => {
    // Display confirmation details on page load if URL parameters are present
    const id = getQueryParam('id');
    const fullName = getQueryParam('fullName');
    const address = getQueryParam('address');
    const status = getQueryParam('status');
    const fee = getQueryParam('fee');

    if (id && fullName && address && status && fee) {
        document.getElementById('confirmId').textContent = id;
        document.getElementById('confirmFullName').textContent = fullName;
        document.getElementById('confirmAddress').textContent = address;
        document.getElementById('confirmStatus').textContent = status;
        document.getElementById('confirmFee').textContent = fee;

        document.getElementById('confirmationContainer').style.display = 'block';
    }
});

// Form submission
document.getElementById('registrationForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('Form submitted.');

    const formData = new FormData(event.target);
    const registrationData = Object.fromEntries(formData);

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)
        });

        if (response.ok) {
            // Get the confirmation URL from the response
            const confirmationUrl = await response.text();
            console.log('Received confirmation URL:', confirmationUrl);

            window.location.href = confirmationUrl; // Redirect to the confirmation page
        } else {
            throw new Error('Registration failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Registration failed. Please try again.');
    }
});