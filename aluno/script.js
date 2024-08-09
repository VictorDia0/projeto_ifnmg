const openModal = (requestId) => {
    // Fetch meal request details from the API
    fetch(`https://example.com/api/mealrequests/${requestId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('mealName').value = data.meal ? data.meal.name : "Desconhecida";
            document.getElementById('requestDate').value = data.request_date;
            document.getElementById('modal').style.display = 'block';
        })
        .catch(error => {
            console.error('Failed to fetch meal request:', error);
            document.getElementById('error').textContent = 'Failed to fetch meal request';
        });
};

const closeModal = () => {
    document.getElementById('modal').style.display = 'none';
};

const handleConfirm = () => {
    const requestId = getRequestIdFromModal(); // Retrieve requestId from modal context
    fetch(`https://example.com/api/mealrequests/confirm/${requestId}`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            closeModal();
            console.log('Meal request confirmed:', data);
        })
        .catch(error => {
            console.error('Failed to confirm meal request:', error);
            document.getElementById('error').textContent = 'Failed to confirm meal request';
        });
};

const handleReject = () => {
    const requestId = getRequestIdFromModal(); // Retrieve requestId from modal context
    fetch(`https://example.com/api/mealrequests/reject/${requestId}`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            closeModal();
            console.log('Meal request rejected:', data);
        })
        .catch(error => {
            console.error('Failed to reject meal request:', error);
            document.getElementById('error').textContent = 'Failed to reject meal request';
        });
};

const getRequestIdFromModal = () => {
    // You need to implement a way to retrieve the requestId, 
    // this could be done by storing it in a global variable or context
    return 1; // Example placeholder
};
