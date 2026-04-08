document.addEventListener('DOMContentLoaded', () => {
    // --- Contact Form Logic ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                const result = await response.json();
                const msgDiv = document.getElementById('responseMessage');
                if (result.success) {
                    msgDiv.textContent = result.message;
                    msgDiv.style.color = 'green';
                    contactForm.reset();
                } else {
                    msgDiv.textContent = 'Error: ' + result.error;
                    msgDiv.style.color = 'red';
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        });
    }

    // --- Login Logic ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const credentials = {
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            };

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(credentials)
                });
                const result = await response.json();
                if (result.success) {
                    localStorage.setItem('adminToken', result.token);
                    window.location.href = 'admin.html';
                } else {
                    document.getElementById('loginMessage').textContent = result.message;
                }
            } catch (error) {
                console.error('Error logging in:', error);
            }
        });
    }

    // --- Admin Dashboard Logic ---
    const adminContent = document.getElementById('adminContent');
    if (adminContent) {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            adminContent.style.display = 'none';
            document.getElementById('accessDenied').style.display = 'block';
        } else {
            fetchSubmissions();
        }
    }

    async function fetchSubmissions() {
        try {
            const response = await fetch('/api/submissions');
            const data = await response.json();
            const list = document.getElementById('submissionsList');
            list.innerHTML = '';
            data.forEach(sub => {
                const row = `<tr>
                    <td>${new Date(sub.timestamp).toLocaleString()}</td>
                    <td>${sub.name}</td>
                    <td>${sub.email}</td>
                    <td>${sub.message}</td>
                </tr>`;
                list.innerHTML += row;
            });
        } catch (error) {
            console.error('Error fetching submissions:', error);
        }
    }
});
