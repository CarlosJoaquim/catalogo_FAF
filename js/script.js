document.addEventListener('DOMContentLoaded', () => {
    // 1. Dados dos Produtos
    const products = [
        {
            id: 'uniforme-selecao',
            name: 'Equipamento de Treino - Seleção',
            category: 'uniformes',
            description: 'Equipamentos de treino com design exclusivo para as seleções da FAF, confeccionados com tecido premium respirável e acabamento de alta costura. Bordado com o escudo da FAF e elementos que refletem o orgulho nacional angolano. Disponível em diversos tamanhos e personalizações.',
            images: ['images/fato_treino04.png', 'images/fato_treino02.png', 'images/fato_treino03.png', 'images/fato_treino.png', 'images/fato_treino05.png']
        },
        {
            id: 'toalha-faf',
            name: 'Toalha Personalizada FAF',
            category: 'toalhas',
            description: 'Toalhas de alta absorção e durabilidade, personalizadas com o escudo da FAF e outros elementos gráficos. Ideal para uso em treinos, vestiários e eventos. Disponível em diferentes cores e tamanhos.',
            images: ['images/toalha/toalha1.png', 'images/toalha/toalha02.png', 'images/toalha/toalha03.png']
        },
        {
            id: 'camisola-cerimonial',
            name: 'Camisa - Angola',
            category: 'camisolas',
            description: 'Camisolas elegantes para eventos cerimoniais ou uso casual, incorporando elementos da marca Angola. Confortáveis, com corte moderno e acabamento impecável. Perfeitas para representar o espírito angolano com estilo.',
            images: ['images/camisola/camisa01.png', 'images/camisola/camisola02.png', 'images/camisola/camisola03.png', 'images/camisola/camisa04.png']
        },
       
        {
            id: 'item-promocional-bandeira',
            name: 'Fato Social ',
            category: 'promocionais',
            description: 'Fato Social de alta qualidade, ideais para eventos e jogos oficiais. Bordado com a bandeira de Angola ou logotipos da FAF. Um item perfeito para engajar fãs e promover a marca.',
            images: ['images/fato/Fato.png', 'images/fato/fato01.png', 'images/fato/fato02.png', 'images/fato/fato03.png']
        },
        // Adicione mais produtos conforme necessário
    ];

    const productListings = document.querySelector('.lista-produtos');
    const productModal = document.getElementById('productModal');
    const modalProductName = document.getElementById('modalProductName');
    const carouselImagesContainer = document.getElementById('carouselImages');
    const modalProductDescription = document.getElementById('modalProductDescription');
    const closeButton = document.querySelector('.close-button');
    const prevButton = productModal.querySelector('.carousel-nav.prev');
    const nextButton = productModal.querySelector('.carousel-nav.next');
    const categoryItems = document.querySelectorAll('.categoria-item');
    const callToActionBtn = document.querySelector('.call-to-action');

    // Elementos do menu hambúrguer
    const navBurger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navIndividualLinks = document.querySelectorAll('.nav-links li');

    let currentProductIndex = 0; // Para o carrossel
    let currentImages = []; // Para armazenar as imagens do produto atual no carrossel

    // 2. Carregamento Dinâmico de Produtos
    function displayProducts(filteredProducts) {
        productListings.innerHTML = ''; // Limpa os produtos existentes
        if (filteredProducts.length === 0) {
            productListings.innerHTML = '<p class="no-products-message">Nenhum produto encontrado nesta categoria.</p>';
            return;
        }
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.dataset.id = product.id; // Para identificar qual produto foi clicado

            productCard.innerHTML = `
                <img src="${product.images[0]}" alt="${product.name}">
                <h3>${product.name}</h3>
            `;
            productListings.appendChild(productCard);

            // Adiciona o evento de clique para abrir a modal
            productCard.addEventListener('click', () => openProductModal(product.id));
        });
    }

    // Inicialmente exibe todos os produtos e ativa a categoria "Todos"
    displayProducts(products);
    document.querySelector('.categoria-item[data-categoria="all"]').classList.add('active');

    // 3. Filtragem por Categoria
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove a classe 'active' de todos os itens de categoria
            categoryItems.forEach(cat => cat.classList.remove('active'));
            // Adiciona a classe 'active' ao item clicado
            item.classList.add('active');

            const category = item.dataset.categoria;
            if (category === 'all') { // Se for a categoria "Todos"
                displayProducts(products);
            } else {
                const filtered = products.filter(product => product.category === category);
                displayProducts(filtered);
            }
        });
    });

    // Adicionar funcionalidade para o botão "Explore Nossos Produtos"
    callToActionBtn.addEventListener('click', () => {
        document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
    });

    // 4. Abertura da Modal
    function openProductModal(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            modalProductName.textContent = product.name;
            modalProductDescription.textContent = product.description;
            currentImages = product.images; // Guarda as imagens do produto atual
            loadCarouselImages(currentImages);
            productModal.style.display = 'flex'; // Exibe a modal
            document.body.style.overflow = 'hidden'; // Evita scroll no body
        }
    }

    // Carrega as imagens no carrossel
    function loadCarouselImages(images) {
        carouselImagesContainer.innerHTML = '';
        images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = modalProductName.textContent; // Alt text para acessibilidade
            carouselImagesContainer.appendChild(img);

            // Adiciona o evento de clique para zoom na imagem da modal
            img.addEventListener('click', (e) => {
                img.classList.toggle('zoomed');
                // Se a imagem estiver em zoom, desabilita a rolagem do modal
                // e desabilita a navegação do carrossel
                if (img.classList.contains('zoomed')) {
                    modalProductDescription.style.overflowY = 'hidden';
                    prevButton.style.display = 'none';
                    nextButton.style.display = 'none';
                    // Posiciona o zoom no clique inicial
                    const rect = img.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width;
                    const y = (e.clientY - rect.top) / rect.height;
                    img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
                } else {
                    modalProductDescription.style.overflowY = 'auto'; // Reabilita a rolagem
                    img.style.transformOrigin = 'center center'; // Reseta a origem
                    updateCarousel(); // Reabilita os botões de navegação conforme necessário
                }
            });

            // Adiciona evento para mover a imagem com o mouse (apenas quando zoomed)
            img.addEventListener('mousemove', (e) => {
                if (img.classList.contains('zoomed')) {
                    const rect = img.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width;
                    const y = (e.clientY - rect.top) / rect.height;
                    img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
                } else {
                    img.style.transformOrigin = 'center center'; // Reseta quando não está zoomed
                }
            });

            // Adiciona evento para resetar o zoom se o mouse sair (útil se o clique não for pego)
            img.addEventListener('mouseleave', () => {
                if (img.classList.contains('zoomed')) {
                    img.classList.remove('zoomed');
                    img.style.transformOrigin = 'center center';
                    modalProductDescription.style.overflowY = 'auto';
                    updateCarousel();
                }
            });
        });
        currentProductIndex = 0;
        updateCarousel();
    }

    // Atualiza a posição do carrossel
    function updateCarousel() {
        if (carouselImagesContainer.children.length === 0) return; // Evita erro se não houver imagens
        const imageWidth = carouselImagesContainer.children[0].clientWidth;
        carouselImagesContainer.style.transform = `translateX(-${currentProductIndex * imageWidth}px)`;

        // Esconde/mostra botões de navegação se não houver mais imagens
        // Certifica-se de que não está em modo zoom para mostrar/esconder
        const currentImage = carouselImagesContainer.children[currentProductIndex];
        if (currentImage && currentImage.classList.contains('zoomed')) {
             prevButton.style.display = 'none';
             nextButton.style.display = 'none';
        } else {
            prevButton.style.display = currentProductIndex === 0 ? 'none' : 'flex';
            nextButton.style.display = currentProductIndex === currentImages.length - 1 ? 'none' : 'flex';
            // Se houver apenas 1 imagem, esconde ambos os botões
            if (currentImages.length <= 1) {
                prevButton.style.display = 'none';
                nextButton.style.display = 'none';
            }
        }
    }

    // Navegação do Carrossel
    prevButton.addEventListener('click', () => {
        // Impede a navegação se a imagem atual estiver em zoom
        const currentImage = carouselImagesContainer.children[currentProductIndex];
        if (currentImage && currentImage.classList.contains('zoomed')) {
            return;
        }
        if (currentProductIndex > 0) {
            currentProductIndex--;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        // Impede a navegação se a imagem atual estiver em zoom
        const currentImage = carouselImagesContainer.children[currentProductIndex];
        if (currentImage && currentImage.classList.contains('zoomed')) {
            return;
        }
        if (currentProductIndex < currentImages.length - 1) {
            currentProductIndex++;
            updateCarousel();
        }
    });

    // Ajusta o carrossel ao redimensionar a janela
    window.addEventListener('resize', () => {
        // Apenas se a modal estiver aberta, recalcule e atualize o carrossel
        if (productModal.style.display === 'flex') {
            updateCarousel();
        }
    });

    // 6. Fechamento da Modal
    closeButton.addEventListener('click', () => {
        productModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Habilita scroll no body novamente

        // Reseta qualquer zoom ativo na imagem da modal ao fechar
        const currentImage = carouselImagesContainer.children[currentProductIndex];
        if (currentImage && currentImage.classList.contains('zoomed')) {
            currentImage.classList.remove('zoomed');
            currentImage.style.transformOrigin = 'center center';
            modalProductDescription.style.overflowY = 'auto';
        }
    });

    // Fechar modal clicando fora dela
    window.addEventListener('click', (event) => {
        if (event.target === productModal) {
            productModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            // Reseta qualquer zoom ativo na imagem da modal ao fechar
            const currentImage = carouselImagesContainer.children[currentProductIndex];
            if (currentImage && currentImage.classList.contains('zoomed')) {
                currentImage.classList.remove('zoomed');
                currentImage.style.transformOrigin = 'center center';
                modalProductDescription.style.overflowY = 'auto';
            }
        }
    });

    // Lógica do Menu Hambúrguer (Responsividade)
    navBurger.addEventListener('click', () => {
        // Toggle nav
        navLinks.classList.toggle('nav-active');

        // Animate links
        navIndividualLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        navBurger.classList.toggle('toggle');
    });

    // Fechar menu hambúrguer ao clicar em um link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                navBurger.classList.remove('toggle');
                navIndividualLinks.forEach(item => item.style.animation = ''); // Reseta a animação ao fechar
            }
        });
    });

    // --- CÓDIGO PARA ANIMAÇÃO DE SEÇÕES (NOVO) ---
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Quando 10% da seção estiver visível
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Para animar apenas uma vez
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    // --- FIM CÓDIGO ANIMAÇÃO SEÇÕES ---

});