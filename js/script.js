document.addEventListener('DOMContentLoaded', () => {
    // 1. Dados dos Produtos
    const products = [
        // ... (seus produtos existentes)
        {
            id: 'uniforme-selecao',
            name: 'Equipamento de Treino - Seleção',
            category: 'uniformes',
            description: 'Equipamentos de treino com design exclusivo, confeccionados com tecido premium respirável e acabamento de alta costura. Bordado com o escudo da FAF e elementos que refletem o orgulho nacional angolano. Disponível em diversos tamanhos e modelos.',
            price: 'A partir de 60.000 Kz',
            images: ['images/fato_treino04.png', 'images/fato_treino03.png', 'images/fato_treino05.png']
        },
        {
            id: 'toalha-faf',
            name: 'Toalha Personalizada FAF',
            category: 'toalhas',
            description: 'Toalhas de alta absorção e durabilidade, personalizadas com o escudo da FAF e outros elementos gráficos. Ideal para uso em treinos, vestiários e eventos. Disponível em diferentes cores e tamanhos.',
            price: 'A partir de 44.000 Kz',
            images: ['images/toalha/toalha1.png', 'images/toalha/toalha02.png', 'images/toalha/toalha03.png']
        },
        {
            id: 'vestuario-cerimonial',
            name: 'Camisolas  - Angola',
            category: 'camisolas',
            description: 'Camisolas elegantes para eventos cerimoniais ou uso casual, incorporando elementos da marca Angola. Confortáveis, com corte moderno e acabamento impecável. Perfeitas para representar o espírito angolano com estilo.',
            price: 'A partir de 48.000 Kz',
            images: ['images/camisola/camisa01.png', 'images/camisola/camisola02.png', 'images/camisola/camisola03.png', 'images/camisola/camisa04.png']
        },
        {
            id: 'caneca-personalizada',
            name: 'Chávenas Personalizada',
            category: 'escritorio',
            description: 'Chávenas de  de alta qualidade, personalizadas com o logotipo da FAF, emblemas da Seleção Angolana ou designs exclusivos. Perfeitas para uso no escritório ou como brinde promocional.',
            price: 'A partir de 45.500 Kz',
            images: ['images/caneca/caneca1.png', 'images/caneca/caneca2.png', 'images/caneca/caneca3.png']
        },
        {
            id: 'pins-crachas',
            name: 'Pins e Crachás Personalizados',
            category: 'escritorio',
            description: 'Pins e crachás metálicos ou de resina, personalizados com o escudo da FAF, bandeira de Angola ou logotipos de eventos. Ideal para identificação de staff, brindes ou colecionáveis.',
            price: 'A partir de 6.000 Kz',
            images: ['images/pins/pin1.png', 'images/pins/pin2.png', 'images/pins/pin3.png']
        },
        {
            id: 'canetas-personalizadas',
            name: 'Canetas Personalizadas',
            category: 'escritorio',
            description: 'Canetas de alta qualidade, personalizadas com gravação a laser ou impressão do logotipo da FAF. Perfeitas para uso corporativo, eventos ou como brindes de luxo.',
            price: 'A partir de 5.000 Kz',
            images: ['images/canetas/caneta1.png', 'images/canetas/caneta2.png', 'images/canetas/caneta3.png']
        },
        {
            id: 'fato-social',
            name: 'Fato Social',
            category: 'promocionais',
            description: 'Fato Social de alta qualidade, ideais para eventos e jogos oficiais. Bordado com a bandeira de Angola ou logotipos da FAF. Um item perfeito para engajar fãs e promover a marca.',
            price: 'A partir de 187.000 Kz',
            images: ['images/fato/Fato.png', 'images/fato/fato01.png', 'images/fato/fato02.png', 'images/fato/fato03.png']
        },
        {
            id: 'itens-promocional',
            name: 'Itens Promocionais Diversos',
            category: 'promocionais',
            description: 'Itens promocionais e vestuário diverso de alta qualidade, ideais para eventos e jogos oficiais. Inclui vídeos e imagens que promovem a marca e engajam os fãs.',
            price: 'Consultar preços',
            images: [
                'images/promo/promo_video01.mp4',
                'images/promo/promo_video.mp4',
                'images/promo/promo01.jpg',
                'images/promo/promo02.jpg',
                'images/promo/promo03.jpg',
                'images/promo/promo04.jpg',
                'images/promo/promo05.jpg',
                'images/promo/promo06.jpg',
                'images/promo/promo07.jpg',
                'images/promo/promo08.jpg',
                'images/promo/promo09.jpg'
            ]
        },
        // Novo item adicionado
        {
            id: 'agendas-personalizadas',
            name: 'Agendas Personalizadas',
            category: 'escritorio',
            description: 'Agendas com capa e miolo personalizáveis para empresas, eventos ou uso pessoal. Disponíveis em diferentes tamanhos e materiais de alta qualidade, ideais para brindes corporativos.',
            price: 'A partir de 15.000 Kz',
            images: ['images/agendas/agenda01.png', 'images/agendas/agenda02.png', 'images/agendas/agenda03.png']
        }
    ];

    // Referências aos elementos do DOM
    const productListings = document.querySelector('.lista-produtos');
    const productModal = document.getElementById('productModal');
    const modalProductName = document.getElementById('modalProductName');
    const carouselImagesContainer = document.getElementById('carouselImages');
    const modalProductDescription = document.getElementById('modalProductDescription');
    const modalProductPrice = document.getElementById('modalProductPrice');
    const closeButton = document.querySelector('.close-button');
    const prevButton = productModal.querySelector('.carousel-nav.prev');
    const nextButton = productModal.querySelector('.carousel-nav.next');
    const categoryItems = document.querySelectorAll('.categoria-item');
    const callToActionBtn = document.querySelector('.call-to-action');

    // Elementos do menu hambúrguer
    const navBurger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navIndividualLinks = document.querySelectorAll('.nav-links li');

    let currentProductIndex = 0;
    let currentMediaArray = [];

    // --- Funções Principais ---

    function displayProducts(filteredProducts) {
        productListings.innerHTML = '';

        if (filteredProducts.length === 0) {
            productListings.innerHTML = '<p class="no-products-message">Nenhum produto encontrado nesta categoria.</p>';
            return;
        }

        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.dataset.id = product.id;

            const firstMedia = product.images[0];
            let mediaHtml = '';

            if (firstMedia.endsWith('.mp4')) {
                mediaHtml = `
                    <div class="video-thumbnail-placeholder">
                        <video src="${firstMedia}#t=1" preload="metadata" muted></video>
                        <i class="fas fa-play-circle video-play-icon"></i>
                    </div>`;
            } else {
                mediaHtml = `<img src="${firstMedia}" alt="${product.name}">`;
            }

            productCard.innerHTML = `
                ${mediaHtml}
                <h3>${product.name}</h3>
                <p class="product-price">${product.price}</p>
            `;
            productListings.appendChild(productCard);

            productCard.addEventListener('click', () => openProductModal(product.id));
        });
    }

    function openProductModal(productId) {
        const product = products.find(p => p.id === productId);

        if (product) {
            modalProductName.textContent = product.name;
            modalProductDescription.textContent = product.description;
            modalProductPrice.textContent = `Preço: ${product.price}`;
            currentMediaArray = product.images;

            loadCarouselMedia(currentMediaArray);
            productModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    function loadCarouselMedia(mediaArray) {
        carouselImagesContainer.innerHTML = '';
        currentMediaArray.forEach(src => {
            let mediaElement;
            if (src.endsWith('.mp4')) {
                mediaElement = document.createElement('video');
                mediaElement.src = src;
                mediaElement.controls = true;
                mediaElement.muted = true;
                mediaElement.loop = true;
                mediaElement.autoplay = false;
                mediaElement.preload = 'auto';
                mediaElement.classList.add('modal-media', 'modal-video');
            } else {
                mediaElement = document.createElement('img');
                mediaElement.src = src;
                mediaElement.alt = modalProductName.textContent;
                mediaElement.classList.add('modal-media', 'modal-image');
            }

            carouselImagesContainer.appendChild(mediaElement);

            if (mediaElement.tagName === 'IMG') {
                mediaElement.addEventListener('click', (e) => {
                    mediaElement.classList.toggle('zoomed');
                    if (mediaElement.classList.contains('zoomed')) {
                        modalProductDescription.style.overflowY = 'hidden';
                        modalProductPrice.style.display = 'none';
                        prevButton.style.display = 'none';
                        nextButton.style.display = 'none';
                        const rect = mediaElement.getBoundingClientRect();
                        const x = (e.clientX - rect.left) / rect.width;
                        const y = (e.clientY - rect.top) / rect.height;
                        mediaElement.style.transformOrigin = `${x * 100}% ${y * 100}%`;
                    } else {
                        modalProductDescription.style.overflowY = 'auto';
                        modalProductPrice.style.display = 'block';
                        mediaElement.style.transformOrigin = 'center center';
                        updateCarouselButtonsVisibility();
                    }
                });

                mediaElement.addEventListener('mousemove', (e) => {
                    if (mediaElement.classList.contains('zoomed')) {
                        const rect = mediaElement.getBoundingClientRect();
                        const x = (e.clientX - rect.left) / rect.width;
                        const y = (e.clientY - rect.top) / rect.height;
                        mediaElement.style.transformOrigin = `${x * 100}% ${y * 100}%`;
                    }
                });

                mediaElement.addEventListener('mouseleave', () => {
                    if (mediaElement.classList.contains('zoomed')) {
                        mediaElement.classList.remove('zoomed');
                        mediaElement.style.transformOrigin = 'center center';
                        modalProductDescription.style.overflowY = 'auto';
                        modalProductPrice.style.display = 'block';
                        updateCarouselButtonsVisibility();
                    }
                });
            }
        });
        currentProductIndex = 0;
        updateCarousel();
    }

    function updateCarouselButtonsVisibility() {
        if (carouselImagesContainer.children.length === 0) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
            return;
        }

        const currentMedia = carouselImagesContainer.children[currentProductIndex];

        if (currentMedia && currentMedia.classList.contains('zoomed')) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        } else {
            prevButton.style.display = currentProductIndex === 0 ? 'none' : 'flex';
            nextButton.style.display = currentProductIndex === currentMediaArray.length - 1 ? 'none' : 'flex';

            if (currentMediaArray.length <= 1) {
                prevButton.style.display = 'none';
                nextButton.style.display = 'none';
            }
        }
    }

    function updateCarousel() {
        if (carouselImagesContainer.children.length === 0) return;

        Array.from(carouselImagesContainer.children).forEach((media, index) => {
            if (media.tagName === 'VIDEO') {
                if (index !== currentProductIndex) {
                    media.pause();
                    media.currentTime = 0;
                } else {
                    media.muted = false;
                    media.play().catch(error => {
                        console.warn("Autoplay impedido. O usuário precisará interagir para dar play.", error);
                    });
                }
            }
        });

        const mediaWidth = carouselImagesContainer.children[0].clientWidth;
        carouselImagesContainer.style.transform = `translateX(-${currentProductIndex * mediaWidth}px)`;

        updateCarouselButtonsVisibility();
    }

    // --- Event Listeners ---

    displayProducts(products);
    document.querySelector('.categoria-item[data-categoria="all"]').classList.add('active');

    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            categoryItems.forEach(cat => cat.classList.remove('active'));
            item.classList.add('active');

            const category = item.dataset.categoria;
            if (category === 'all') {
                displayProducts(products);
            } else {
                const filtered = products.filter(product => product.category === category);
                displayProducts(filtered);
            }
        });
    });

    callToActionBtn.addEventListener('click', () => {
        document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
    });

    prevButton.addEventListener('click', () => {
        const currentMedia = carouselImagesContainer.children[currentProductIndex];
        if (currentMedia && currentMedia.classList.contains('zoomed')) {
            return;
        }
        if (currentProductIndex > 0) {
            currentProductIndex--;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        const currentMedia = carouselImagesContainer.children[currentProductIndex];
        if (currentMedia && currentMedia.classList.contains('zoomed')) {
            return;
        }
        if (currentProductIndex < currentMediaArray.length - 1) {
            currentProductIndex++;
            updateCarousel();
        }
    });

    window.addEventListener('resize', () => {
        if (productModal.style.display === 'flex') {
            updateCarousel();
        }
    });

    closeButton.addEventListener('click', () => {
        productModal.style.display = 'none';
        document.body.style.overflow = 'auto';

        Array.from(carouselImagesContainer.children).forEach(media => {
            if (media.tagName === 'VIDEO') {
                media.pause();
                media.currentTime = 0;
            }
            if (media.tagName === 'IMG' && media.classList.contains('zoomed')) {
                media.classList.remove('zoomed');
                media.style.transformOrigin = 'center center';
                modalProductDescription.style.overflowY = 'auto';
            }
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === productModal) {
            productModal.style.display = 'none';
            document.body.style.overflow = 'auto';

            Array.from(carouselImagesContainer.children).forEach(media => {
                if (media.tagName === 'VIDEO') {
                    media.pause();
                    media.currentTime = 0;
                }
                if (media.tagName === 'IMG' && media.classList.contains('zoomed')) {
                    media.classList.remove('zoomed');
                    media.style.transformOrigin = 'center center';
                    modalProductDescription.style.overflowY = 'auto';
                }
            });
        }
    });

    navBurger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        navBurger.classList.toggle('toggle');

        navIndividualLinks.forEach((link, index) => {
            if (navLinks.classList.contains('nav-active')) {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            } else {
                link.style.animation = '';
            }
        });
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                navBurger.classList.remove('toggle');
                navIndividualLinks.forEach(item => item.style.animation = '');
            }
        });
    });

    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});