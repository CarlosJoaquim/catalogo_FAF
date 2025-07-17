document.addEventListener('DOMContentLoaded', () => {
    // 1. Dados dos Produtos
    const products = [
        {
            id: 'uniforme-selecao',
            name: 'Equipamento de Treino - Seleção',
            category: 'uniformes',
            description: 'Equipamentos de treino com design exclusivo, confeccionados com tecido premium respirável e acabamento de alta costura. Bordado com o escudo da FAF e elementos que refletem o orgulho nacional angolano. Disponível em diversos tamanhos e Modelos.',
            images: ['images/fato_treino04.png', 'images/fato_treino03.png', 'images/fato_treino05.png']
        },
        {
            id: 'toalha-faf',
            name: 'Toalha Personalizada FAF',
            category: 'toalhas',
            description: 'Toalhas de alta absorção e durabilidade, personalizadas com o escudo da FAF e outros elementos gráficos. Ideal para uso em treinos, vestiários e eventos. Disponível em diferentes cores e tamanhos.',
            images: ['images/toalha/toalha1.png', 'images/toalha/toalha02.png', 'images/toalha/toalha03.png']
        },
        {
            id: 'vestuario-cerimonial',
            name: 'Camisolas - Angola',
            category: 'camisolas',
            description: 'Camisolas elegantes para eventos cerimoniais ou uso casual, incorporando elementos da marca Angola. Confortáveis, com corte moderno e acabamento impecável. Perfeitas para representar o espírito angolano com estilo.',
            images: ['images/camisola/camisa01.png', 'images/camisola/camisola02.png', 'images/camisola/camisola03.png', 'images/camisola/camisa04.png']
        },
        {
            id: 'fato-social',
            name: 'Fato Social ',
            category: 'promocionais',
            description: 'Fato Social de alta qualidade, ideais para eventos e jogos oficiais. Bordado com a bandeira de Angola ou logotipos da FAF. Um item perfeito para engajar fãs e promover a marca.',
            images: ['images/fato/Fato.png', 'images/fato/fato01.png', 'images/fato/fato02.png', 'images/fato/fato03.png']
        },
        {
            id: 'itens-promocional',
            name: 'Itens Promocional',
            category: 'promocionais',
            description: 'Itens promocionais e vestuário diverso de alta qualidade, ideais para eventos e jogos oficiais. Inclui vídeos e imagens que promovem a marca e engajam os fãs.',
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
        }
    ];

    // Referências aos elementos do DOM
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

    let currentProductIndex = 0; // Controla o slide atual do carrossel na modal
    let currentMediaArray = []; // Armazena as mídias (imagens/vídeos) do produto atual

    // --- Funções Principais ---

    /**
     * Exibe os produtos na lista principal.
     * Cria cards de produto com base nos dados, exibindo a primeira mídia.
     * Para vídeos, mostra uma thumbnail e um ícone de play.
     * @param {Array} filteredProducts - Lista de produtos a serem exibidos.
     */
    function displayProducts(filteredProducts) {
        productListings.innerHTML = ''; // Limpa os produtos existentes

        if (filteredProducts.length === 0) {
            productListings.innerHTML = '<p class="no-products-message">Nenhum produto encontrado nesta categoria.</p>';
            return;
        }

        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.dataset.id = product.id; // Define o ID do produto para identificação ao clicar

            const firstMedia = product.images[0];
            let mediaHtml = '';

            if (firstMedia.endsWith('.mp4')) {
                // Se for um vídeo, cria uma thumbnail com um ícone de play
                mediaHtml = `
                    <div class="video-thumbnail-placeholder">
                        <video src="${firstMedia}#t=1" preload="metadata" muted></video>
                        <i class="fas fa-play-circle video-play-icon"></i>
                    </div>`;
            } else {
                // Se for uma imagem
                mediaHtml = `<img src="${firstMedia}" alt="${product.name}">`;
            }

            productCard.innerHTML = `
                ${mediaHtml}
                <h3>${product.name}</h3>
            `;
            productListings.appendChild(productCard);

            // Adiciona o evento de clique para abrir a modal com os detalhes do produto
            productCard.addEventListener('click', () => openProductModal(product.id));
        });
    }

    /**
     * Abre a modal de detalhes do produto.
     * Carrega o nome, descrição e todas as mídias do produto no carrossel da modal.
     * @param {string} productId - O ID do produto a ser exibido.
     */
    function openProductModal(productId) {
        const product = products.find(p => p.id === productId);

        if (product) {
            modalProductName.textContent = product.name;
            modalProductDescription.textContent = product.description;
            currentMediaArray = product.images; // Atualiza a array de mídias para o carrossel

            loadCarouselMedia(currentMediaArray); // Carrega as mídias no carrossel da modal
            productModal.style.display = 'flex'; // Exibe a modal
            document.body.style.overflow = 'hidden'; // Impede o scroll do corpo da página
        }
    }

    /**
     * Carrega as mídias (imagens e vídeos) no carrossel dentro da modal.
     * Cria elementos <img/> ou <video/> e adiciona lógica de zoom para imagens.
     * @param {Array} mediaArray - Array de URLs das mídias.
     */
    function loadCarouselMedia(mediaArray) {
        carouselImagesContainer.innerHTML = ''; // Limpa o carrossel existente

        mediaArray.forEach(src => {
            let mediaElement;
            if (src.endsWith('.mp4')) {
                // Cria um elemento de vídeo com controles nativos
                mediaElement = document.createElement('video');
                mediaElement.src = src;
                mediaElement.controls = true; // Mostra os controles de vídeo (play, pause, volume, etc.)
                mediaElement.muted = true; // Inicia mutado para melhor experiência do usuário (autoplay policies)
                mediaElement.loop = true; // Repete o vídeo
                mediaElement.autoplay = false; // Não inicia automaticamente ao carregar a modal
                mediaElement.preload = 'auto'; // Pré-carrega o vídeo
                mediaElement.classList.add('modal-media', 'modal-video'); // Classes para estilização
            } else {
                // Cria um elemento de imagem
                mediaElement = document.createElement('img');
                mediaElement.src = src;
                mediaElement.alt = modalProductName.textContent; // Texto alternativo para acessibilidade
                mediaElement.classList.add('modal-media', 'modal-image'); // Classes para estilização
            }

            carouselImagesContainer.appendChild(mediaElement);

            // Adiciona a lógica de zoom para imagens (apenas se for uma imagem)
            if (mediaElement.tagName === 'IMG') {
                mediaElement.addEventListener('click', (e) => {
                    mediaElement.classList.toggle('zoomed');
                    if (mediaElement.classList.contains('zoomed')) {
                        modalProductDescription.style.overflowY = 'hidden'; // Impede scroll da descrição
                        prevButton.style.display = 'none'; // Esconde botões de navegação
                        nextButton.style.display = 'none';
                        const rect = mediaElement.getBoundingClientRect();
                        const x = (e.clientX - rect.left) / rect.width;
                        const y = (e.clientY - rect.top) / rect.height;
                        mediaElement.style.transformOrigin = `${x * 100}% ${y * 100}%`;
                    } else {
                        modalProductDescription.style.overflowY = 'auto'; // Habilita scroll
                        mediaElement.style.transformOrigin = 'center center';
                        updateCarouselButtonsVisibility(); // Reexibe botões de navegação
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
                        updateCarouselButtonsVisibility();
                    }
                });
            }
        });
        currentProductIndex = 0; // Reseta o índice do carrossel para o primeiro item
        updateCarousel(); // Atualiza a exibição do carrossel
    }

    /**
     * Atualiza a visibilidade dos botões de navegação do carrossel (anterior/próximo).
     * Esconde os botões se a mídia estiver com zoom ou se for o primeiro/último item.
     */
    function updateCarouselButtonsVisibility() {
        if (carouselImagesContainer.children.length === 0) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
            return;
        }

        const currentMedia = carouselImagesContainer.children[currentProductIndex];

        // Esconde botões se a imagem estiver com zoom
        if (currentMedia && currentMedia.classList.contains('zoomed')) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        } else {
            // Exibe ou esconde os botões com base na posição do carrossel
            prevButton.style.display = currentProductIndex === 0 ? 'none' : 'flex';
            nextButton.style.display = currentProductIndex === currentMediaArray.length - 1 ? 'none' : 'flex';

            // Se houver apenas 1 mídia, esconde ambos os botões de qualquer forma
            if (currentMediaArray.length <= 1) {
                prevButton.style.display = 'none';
                nextButton.style.display = 'none';
            }
        }
    }

    /**
     * Atualiza a posição do carrossel e controla a reprodução de vídeos.
     * Pausa outros vídeos ao navegar para um novo slide.
     */
    function updateCarousel() {
        if (carouselImagesContainer.children.length === 0) return; // Evita erro se não houver mídias

        // Pausa todos os vídeos que não são o slide atual
        Array.from(carouselImagesContainer.children).forEach((media, index) => {
            if (media.tagName === 'VIDEO') {
                if (index !== currentProductIndex) {
                    media.pause();
                    media.currentTime = 0; // Volta para o início
                } else {
                    // Para o vídeo atual, pode desmutar e tentar tocar (se a política de autoplay permitir)
                    media.muted = false; // Desmuta o vídeo visível
                    media.play().catch(error => {
                        // Captura erros de autoplay se o navegador impedir
                        console.warn("Autoplay impedido. O usuário precisará interagir para dar play.", error);
                        // Você pode adicionar uma UI aqui para indicar ao usuário para clicar no play
                    });
                }
            }
        });

        const mediaWidth = carouselImagesContainer.children[0].clientWidth;
        carouselImagesContainer.style.transform = `translateX(-${currentProductIndex * mediaWidth}px)`;

        updateCarouselButtonsVisibility(); // Atualiza a visibilidade dos botões após a navegação
    }

    // --- Event Listeners ---

    // Inicialmente exibe todos os produtos e ativa a categoria "Todos"
    displayProducts(products);
    document.querySelector('.categoria-item[data-categoria="all"]').classList.add('active');

    // Listener para o filtro de categorias
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            categoryItems.forEach(cat => cat.classList.remove('active')); // Remove 'active' de todos
            item.classList.add('active'); // Adiciona 'active' ao clicado

            const category = item.dataset.categoria;
            if (category === 'all') {
                displayProducts(products);
            } else {
                const filtered = products.filter(product => product.category === category);
                displayProducts(filtered);
            }
        });
    });

    // Listener para o botão "Explore Nossos Produtos"
    callToActionBtn.addEventListener('click', () => {
        document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
    });

    // Navegação do Carrossel (botão anterior)
    prevButton.addEventListener('click', () => {
        const currentMedia = carouselImagesContainer.children[currentProductIndex];
        if (currentMedia && currentMedia.classList.contains('zoomed')) {
            return; // Impede navegação se a imagem estiver com zoom
        }
        if (currentProductIndex > 0) {
            currentProductIndex--;
            updateCarousel();
        }
    });

    // Navegação do Carrossel (botão próximo)
    nextButton.addEventListener('click', () => {
        const currentMedia = carouselImagesContainer.children[currentProductIndex];
        if (currentMedia && currentMedia.classList.contains('zoomed')) {
            return; // Impede navegação se a imagem estiver com zoom
        }
        if (currentProductIndex < currentMediaArray.length - 1) {
            currentProductIndex++;
            updateCarousel();
        }
    });

    // Ajusta o carrossel ao redimensionar a janela (se a modal estiver aberta)
    window.addEventListener('resize', () => {
        if (productModal.style.display === 'flex') {
            updateCarousel();
        }
    });

    // Fechamento da Modal pelo botão "X"
    closeButton.addEventListener('click', () => {
        productModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Reabilita o scroll do corpo

        // Pausa e reseta vídeos e remove zoom de imagens ao fechar a modal
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

    // Fechar modal clicando fora dela
    window.addEventListener('click', (event) => {
        if (event.target === productModal) {
            productModal.style.display = 'none';
            document.body.style.overflow = 'auto';

            // Pausa e reseta vídeos e remove zoom de imagens ao fechar a modal
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

    // Lógica do Menu Hambúrguer (Responsividade)
    navBurger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active'); // Ativa/desativa a navegação

        navIndividualLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ''; // Reseta a animação
            } else {
                // Adiciona animação com delay escalonado
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        navBurger.classList.toggle('toggle'); // Anima o ícone do hambúrguer
    });

    // Fechar menu hambúrguer ao clicar em um link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                navBurger.classList.remove('toggle');
                navIndividualLinks.forEach(item => item.style.animation = ''); // Reseta animação ao fechar
            }
        });
    });

  
    

    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null, // O viewport é o elemento raiz
        rootMargin: '0px', // Nenhuma margem extra
        threshold: 0.1 // A callback é executada quando 10% do elemento está visível
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Adiciona classe para iniciar a animação
                observer.unobserve(entry.target); // Para de observar após a animação (para animar apenas uma vez)
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section); // Começa a observar cada seção
    });
});