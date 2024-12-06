const menuData = [
    { category: "coffee", name: "Cappuccino", image: "images/image1.jpg", description: "Rich espresso topped with frothy steamed milk.", price: 1.99 },
    { category: "coffee", name: "Caffè Latte", image: "images/image2.jpg", description: "Smooth espresso combined with creamy steamed milk.", price: 2.49 },
    { category: "tea", name: "Masala Chai", image: "images/image3.jpg", description: "Aromatic tea infused with bold Indian spices.", price: 1.29 },
    { category: "tea", name: "Spiced Chai Latte", image: "images/image4.jpg", description: "A warm blend of chai spices and steamed milk.", price: 1.79 },
    { category: "snacks", name: "Samosa", image: "images/image5.jpg", description: "Golden-fried pastry filled with spiced potatoes.", price: 0.99 },
    { category: "snacks", name: "Gulab Jamun", image: "images/image6.jpg", description: "Soft milk-based dumplings soaked in sugar syrup.", price: 1.49 }
];

let cart = [];

// Render menu items
const renderMenu = (category = "all") => {
    const menuContainer = document.getElementById("menu-container");
    menuContainer.innerHTML = ""; // Clear existing content

    const filteredMenu = category === "all" ? menuData : menuData.filter(item => item.category === category);

    if (filteredMenu.length === 0) {
        menuContainer.innerHTML = "<p>No items found in this category.</p>";
        return;
    }

    filteredMenu.forEach(item => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p class="price">$${item.price.toFixed(2)}</p>
            <div class="quantity-controls">
                <button class="decrease-btn" data-name="${item.name}">-</button>
                <span class="quantity-display" data-name="${item.name}">1</span>
                <button class="increase-btn" data-name="${item.name}">+</button>
            </div>
            <button class="add-to-cart-btn" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>
        `;
        menuContainer.appendChild(menuItem);
    });

    // Attach event listeners for quantity controls
    document.querySelectorAll(".increase-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const name = event.target.getAttribute("data-name");
            const display = document.querySelector(`.quantity-display[data-name="${name}"]`);
            display.textContent = parseInt(display.textContent) + 1;
        });
    });

    document.querySelectorAll(".decrease-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const name = event.target.getAttribute("data-name");
            const display = document.querySelector(`.quantity-display[data-name="${name}"]`);
            const currentQuantity = parseInt(display.textContent);
            if (currentQuantity > 1) {
                display.textContent = currentQuantity - 1;
            }
        });
    });

    // Attach event listeners for "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const name = event.target.getAttribute("data-name");
            const price = parseFloat(event.target.getAttribute("data-price"));
            const quantity = parseInt(document.querySelector(`.quantity-display[data-name="${name}"]`).textContent);
            addToCart(name, price, quantity);
        });
    });
};

// Add to Cart
const addToCart = (name, price, quantity) => {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name, price, quantity });
    }
    renderCart();
};

// Update Quantity in Cart
const updateQuantity = (name, action) => {
    const item = cart.find(item => item.name === name);
    if (item) {
        if (action === "increase") {
            item.quantity += 1;
        } else if (action === "decrease") {
            item.quantity = Math.max(1, item.quantity - 1); // Ensure quantity doesn't go below 1
        }
        renderCart();
    }
};

// Render Cart
const renderCart = () => {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = ""; // Clear the cart container

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <div class="cart-item-details">
                <p>${item.name}</p>
                <div class="quantity-controls">
                    <button class="decrease-btn" data-name="${item.name}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-btn" data-name="${item.name}">+</button>
                </div>
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button class="remove-item-btn" data-name="${item.name}">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    const totalElement = document.createElement("p");
    totalElement.classList.add("total");
    totalElement.innerHTML = `Total: $${total.toFixed(2)}`;
    cartContainer.appendChild(totalElement);

    document.querySelectorAll(".remove-item-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const name = event.target.getAttribute("data-name");
            removeFromCart(name);
        });
    });

    document.querySelectorAll(".increase-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const name = event.target.getAttribute("data-name");
            updateQuantity(name, "increase");
        });
    });

    document.querySelectorAll(".decrease-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const name = event.target.getAttribute("data-name");
            updateQuantity(name, "decrease");
        });
    });
};

// Remove from Cart
const removeFromCart = (name) => {
    cart = cart.filter(item => item.name !== name);
    renderCart();
};

// Tab Click Handlers
document.querySelectorAll(".menu-tab").forEach(tab => {
    tab.addEventListener("click", () => {
        const category = tab.getAttribute("data-category");
        renderMenu(category);
    });
});


let currentSlide = 0;

// Function to show a specific slide
const showSlide = (index) => {
    const slides = document.querySelectorAll("#slideshow .slide");
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? "block" : "none";
    });
};

// Change slide on button click
const changeSlide = (direction) => {
    const slides = document.querySelectorAll("#slideshow .slide");
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    showSlide(currentSlide);
};

// Initial Slideshow Render
showSlide(currentSlide);

// Other existing functionality (Menu and Cart Logic) here...


// Initial Render
renderMenu();
renderCart();
