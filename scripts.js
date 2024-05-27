document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const propertyForm = document.getElementById('property-form');
    const propertyList = document.getElementById('property-list');
    const sellerProperties = document.getElementById('seller-properties');
    const pagination = document.getElementById('pagination');

    let currentUser = null;
    const properties = [];
    const propertiesPerPage = 5;
    let currentPage = 1;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        currentUser = {
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        };
        alert('User registered successfully!');
        document.getElementById('login-section').style.display = 'none';
    });

    propertyForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const property = {
            place: document.getElementById('property-place').value,
            area: document.getElementById('property-area').value,
            bedrooms: document.getElementById('property-bedrooms').value,
            bathrooms: document.getElementById('property-bathrooms').value,
            nearby: document.getElementById('property-nearby').value,
            likes: 0
        };

        properties.push(property);
        displayProperties();
        alert('Property posted successfully!');
    });

    function displayProperties() {
        sellerProperties.innerHTML = '';
        propertyList.innerHTML = '';
        pagination.innerHTML = '';

        const startIndex = (currentPage - 1) * propertiesPerPage;
        const endIndex = startIndex + propertiesPerPage;
        const currentProperties = properties.slice(startIndex, endIndex);

        currentProperties.forEach((property, index) => {
            const propertyDiv = document.createElement('div');
            propertyDiv.classList.add('property');
            propertyDiv.innerHTML = `
                <h3>Property ${startIndex + index + 1}</h3>
                <p>Place: ${property.place}</p>
                <p>Area: ${property.area} sq ft</p>
                <p>Bedrooms: ${property.bedrooms}</p>
                <p>Bathrooms: ${property.bathrooms}</p>
                <p>Nearby: ${property.nearby}</p>
                <p>Likes: ${property.likes}</p>
                <button onclick="deleteProperty(${startIndex + index})">Delete</button>
                <button onclick="likeProperty(${startIndex + index})">Like</button>
            `;
            sellerProperties.appendChild(propertyDiv);

            const buyerPropertyDiv = document.createElement('div');
            buyerPropertyDiv.classList.add('property');
            buyerPropertyDiv.innerHTML = `
                <h3>Property ${startIndex + index + 1}</h3>
                <p>Place: ${property.place}</p>
                <p>Area: ${property.area} sq ft</p>
                <p>Bedrooms: ${property.bedrooms}</p>
                <p>Bathrooms: ${property.bathrooms}</p>
                <p>Nearby: ${property.nearby}</p>
                <p>Likes: ${property.likes}</p>
                <button onclick="showInterest(${startIndex + index})">I'm Interested</button>
            `;
            propertyList.appendChild(buyerPropertyDiv);
        });

        // Pagination
        const totalPages = Math.ceil(properties.length / propertiesPerPage);
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                displayProperties();
            });
            pagination.appendChild(pageButton);
        }
    }

    window.deleteProperty = function(index) {
        properties.splice(index, 1);
        displayProperties();
    }

    window.likeProperty = function(index) {
        properties[index].likes++;
        displayProperties();
    }

    window.showInterest = function(index) {
        if (!currentUser) {
            alert('Please login to view seller details.');
            return;
        }
        const property = properties[index];
        alert(`Details of Property ${index + 1}:
        Seller Email: example@seller.com
        Seller Phone: 123-456-7890
        Buyer Email: ${currentUser.email}`);
    }
});
