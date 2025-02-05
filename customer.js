document.addEventListener("DOMContentLoaded", function () {
    function showSection(sectionId) {
        document.querySelectorAll(".content").forEach(section => {
            section.style.display = "none";
        });
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = "block";
        }
    }

    document.querySelectorAll(".nav-item").forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            const sectionId = this.getAttribute("href").substring(1);
            showSection(sectionId);
        });
    });

    document.querySelectorAll(".details").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            showSection("product");
        });
    });

    showSection("homepage");

    const reviewButton = document.querySelector('.add-review-btn');
    const reviewForm = document.querySelector('.review-form');

    if (reviewButton && reviewForm) {
        reviewButton.addEventListener('click', function() {
            reviewForm.style.display = reviewForm.style.display === 'none' || reviewForm.style.display === '' ? 'block' : 'none';
        });
    }

    const reviewFormElement = document.getElementById('reviewForm');
    if (reviewFormElement) {
        reviewFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            reviewForm.style.display = 'none';
            alert('Thank you for your review!');
        });
    }

    const adminForm = document.getElementById('adminMessageForm');
    if (adminForm) {
        adminForm.addEventListener('submit', function(e) {
            e.preventDefault();
            window.location.href = 'admin1.html#communication-tools';
        });
    }
});
