document.addEventListener('DOMContentLoaded', function() {
       // Initialize service performance chart
       const ctx = document.getElementById('serviceChart').getContext('2d');
       new Chart(ctx, {
               type: 'bar',
               data: {
                   labels: ['Digital Printing', 'Silkscreen', 'Sublimation', 'Shirt Printing', 'Mugs', 'Others'],
                   datasets: [{
                       label: 'Daily Usage',
                       data: [65, 45, 35, 28, 22, 15],
                       backgroundColor: '#3498db'
                   }]
               },
               options: {
                   responsive: true,
                   maintainAspectRatio: false,
                   scales: {
                       y: {
                           beginAtZero: true
                       }
                   }
               }
           }) 
        });



        // Modal functionality
        let currentEditSection = '';

        function openEditModal(section) {
            const modal = document.getElementById('editModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalContent = document.getElementById('modalContent');
            currentEditSection = section;

            modalContent.innerHTML = '';
            
            switch(section) {
                case 'top-services':
                    modalTitle.textContent = 'Edit Top Services';
                    modalContent.innerHTML = `
                        <input type="text" id="mostUsedService" placeholder="Most Used Service">
                        <input type="number" id="utilizationRate" placeholder="Utilization Rate">
                    `;
                    break;
                case 'inventory':
                    modalTitle.textContent = 'Edit Inventory Status';
                    modalContent.innerHTML = `
                        <input type="number" id="lowStockItems" placeholder="Low Stock Items">
                        <input type="number" id="totalItems" placeholder="Total Items">
                        <input type="text" id="alertMessage" placeholder="Alert Message">
                    `;
                    break;
                case 'services':
                    modalTitle.textContent = 'Edit Services';
                    modalContent.innerHTML = `
                        <div id="servicesList">
                            <input type="text" placeholder="Service 1">
                            <input type="text" placeholder="Service 2">
                            <input type="text" placeholder="Service 3">
                        </div>
                        <button onclick="addServiceField()" style="margin-top: 10px">Add Service</button>
                    `;
                    break;
            }

            modal.style.display = 'block';
        }

        function closeModal() {
            document.getElementById('editModal').style.display = 'none';
        }

        function addServiceField() {
            const servicesList = document.getElementById('servicesList');
            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.placeholder = `Service ${servicesList.children.length + 1}`;
            servicesList.appendChild(newInput);
        }

        function saveChanges() {
            // Here you would typically save the changes to a backend
            alert('Changes saved successfully!');
            closeModal();
            
            // Simulate updates to the UI
            switch(currentEditSection) {
                case 'top-services':
                    const mostUsedService = document.getElementById('mostUsedService').value;
                    const utilizationRate = document.getElementById('utilizationRate').value;
                    if (mostUsedService) {
                        document.querySelector('.metric-value').textContent = mostUsedService;
                    }
                    if (utilizationRate) {
                        document.querySelectorAll('.metric-value')[1].textContent = `${utilizationRate}%`;
                    }
                    break;
                case 'inventory':
                    const lowStockItems = document.getElementById('lowStockItems').value;
                    const totalItems = document.getElementById('totalItems').value;
                    const alertMessage = document.getElementById('alertMessage').value;
                    if (lowStockItems) {
                        document.querySelectorAll('.metric-value')[2].textContent = lowStockItems;
                    }
                    if (totalItems) {
                        document.querySelectorAll('.metric-value')[3].textContent = totalItems;
                    }
                    if (alertMessage) {
                        document.querySelector('.inventory-alert').textContent = alertMessage;
                    }
                    break;
                case 'services':
                    const serviceInputs = document.querySelectorAll('#servicesList input');
                    const serviceList = document.querySelector('.service-list');
                    serviceList.innerHTML = '';
                    serviceInputs.forEach(input => {
                        if (input.value) {
                            const serviceItem = document.createElement('div');
                            serviceItem.className = 'service-item';
                            serviceItem.textContent = input.value;
                            serviceList.appendChild(serviceItem);
                        }
                    });
                    break;
            }
        }

        // Sample data
        const orders = [
            {
                id: 1,
                name: "Roshen Tolosa",
                email: "shen@gmail.com",
                contact: "09154623470",
                location: "Manila Sta. Mesa",
                service: "Digital Printing",
                timestamp: "2024-02-05 10:30 AM",
                status: "New",
                serviceDetails: {
                    size: "A4",
                    quantity: "100",
                    paperType: "Glossy",
                    printQuality: "High Resolution",
                    lamination: "Yes"
                }
            },
            {
                id: 2,
                name: "Johnson Villa Cruz",
                email: "villa@gmail.com",
                contact: "098-765-4321",
                location: "Pasig City",
                service: "T-Shirt Print",
                timestamp: "2024-02-05 09:15 AM",
                status: "New",
                serviceDetails: {
                    size: "L",
                    quantity: "50",
                    materialType: "Cotton",
                    printingMethod: "Silkscreen",
                    designPlacement: "Front"
                }
            }
        ];

        const messages = [
            {
                id: 1,
                name: "Jane Cooper",
                email: "jane@example.com",
                service: "Digital Printing",
                message: "Hi, I would like to know the pricing for bulk printing of business cards.",
                timestamp: "2024-02-05 11:30 AM"
            },
            {
                id: 2,
                name: "Robert Fox",
                email: "robert@example.com",
                service: "T-Shirt Printing",
                message: "Can you provide a quote for 50 custom printed t-shirts?",
                timestamp: "2024-02-05 10:15 AM"
            }
        ];

        // Tab switching functionality
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Show corresponding content
                document.querySelectorAll('.message-list').forEach(list => list.classList.remove('active'));
                document.getElementById(button.dataset.tab).classList.add('active');
            });
        });

        // Render orders
        function renderOrders() {
            const ordersContainer = document.getElementById('orders');
            ordersContainer.innerHTML = orders.map(order => `
                <div class="message-card">
                    <div class="message-header-content">
                        <div class="customer-info">
                            <strong>Order #${order.id}</strong>
                            <span class="status-badge">${order.status}</span>
                        </div>
                        <span class="timestamp">${order.timestamp}</span>
                    </div>

                    <div class="message-details">
                        <div class="detail-row">
                            <span class="detail-label">Customer:</span>
                            <span>${order.name}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Email:</span>
                            <span>${order.email}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Contact:</span>
                            <span>${order.contact}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Location:</span>
                            <span>${order.location}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Service:</span>
                            <span>${order.service}</span>
                        </div>
                    </div>

                    <div class="message-details">
                        <h4 style="margin-bottom: 10px;">Service Details</h4>
                        ${Object.entries(order.serviceDetails).map(([key, value]) => `
                            <div class="detail-row">
                                <span class="detail-label">${key}:</span>
                                <span>${value}</span>
                            </div>
                        `).join('')}
                    </div>

                    <div class="reply-box">
                        <input type="text" class="reply-input" placeholder="Type your response...">
                        <button class="reply-button" onclick="sendResponse(${order.id})">Send Response</button>
                    </div>
                </div>
            `).join('');
        }

        // Render messages
        function renderMessages() {
            const messagesContainer = document.getElementById('messages');
            messagesContainer.innerHTML = messages.map(message => `
                <div class="message-card">
                    <div class="message-header-content">
                        <div class="customer-info">
                            <strong>${message.name}</strong>
                            <span class="status-badge">New</span>
                        </div>
                        <span class="timestamp">${message.timestamp}</span>
                    </div>

                    <div class="message-details">
                        <div class="detail-row">
                            <span class="detail-label">Email:</span>
                            <span>${message.email}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Service:</span>
                            <span>${message.service}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Message:</span>
                            <span>${message.message}</span>
                        </div>
                    </div>

                    <div class="reply-box">
                        <input type="text" class="reply-input" placeholder="Type your response...">
                        <button class="reply-button" onclick="sendMessageResponse(${message.id})">Send Response</button>
                    </div>
                </div>
            `).join('');
        }

        // Handle responses
        function sendResponse(orderId) {
            const input = event.target.previousElementSibling;
            const response = input.value.trim();
            if (response) {
                alert(`Response sent for order #${orderId}: ${response}`);
                input.value = '';
            }
        }

        function sendMessageResponse(messageId) {
            const input = event.target.previousElementSibling;
            const response = input.value.trim();
            if (response) {
                alert(`Response sent for message #${messageId}: ${response}`);
                input.value = '';
            }
        }

        // Initial render
        renderOrders();
        renderMessages();

        // Simulate real-time updates
        setInterval(() => {
            const metrics = document.querySelectorAll('.metric-value');
            metrics.forEach(metric => {
                if (metric.textContent.includes('%')) {
                    const currentValue = parseInt(metric.textContent);
                    metric.textContent = `${Math.max(0, Math.min(100, currentValue + Math.floor(Math.random() * 3) - 1))}%`;
                }
            });
        }, 5000);