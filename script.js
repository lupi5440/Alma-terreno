// Imágenes de la galería
const images = [
    'IMG/Terreno-.jpeg',
    'IMG/Terreno-1.jpeg',
    'IMG/Terreno-2.jpeg',
    'IMG/Terreno-3.jpeg',
    'IMG/Terreno-5.jpeg',
    'IMG/Terreno-6.jpeg',
    'IMG/Terreno-7.jpeg',
    'IMG/Terreno-8.jpeg',
    'IMG/Terreno-9.jpeg',
    'IMG/Terreno-10.jpeg'
];

let currentImageIndex = 0;

// Abrir modal con imagen
function openModal(index) {
    currentImageIndex = index;
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');

    modal.style.display = 'block';
    modalImg.src = images[currentImageIndex];

    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
}

// Cerrar modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Cambiar imagen en el modal
function changeImage(direction) {
    currentImageIndex += direction;

    // Loop de imágenes
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }

    const modalImg = document.getElementById('modalImage');
    modalImg.src = images[currentImageIndex];
}

// Cerrar modal al hacer clic fuera de la imagen
window.onclick = function (event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Navegación con teclado
document.addEventListener('keydown', function (event) {
    const modal = document.getElementById('imageModal');
    if (modal.style.display === 'block') {
        if (event.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (event.key === 'ArrowRight') {
            changeImage(1);
        } else if (event.key === 'Escape') {
            closeModal();
        }
    }
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a las tarjetas
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.feature-card, .gallery-item, .contact-card-premium');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});