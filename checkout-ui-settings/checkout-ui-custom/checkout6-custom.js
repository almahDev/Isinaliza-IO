$(document).ready(function () {
    console.log("// Adiciona o botão de compartilhar carrinho");

    setTimeout(() => {
        $(".body-cart-vertical .cart-template.full-cart.active .totalizers.summary-totalizers.cart-totalizers").before('<button id="shareCart" style="padding:10px 15px; color:white; border:none; cursor:pointer;">Compartilhe seu carrinho</button>');

        // Evento de clique no botão, agora com delegação para garantir que funcione após o append
        $("#shareCart").click(function () {
            $.ajax({
                url: "/api/checkout/pub/orderForm",
                type: "GET",
                success: function (data) {
                    if (data.orderFormId) {
                        var cartLink = window.location.origin + "/checkout/?orderFormId=" + data.orderFormId + "#/cart";

                        // Copia o link para a área de transferência
                        var tempInput = $("<input>");
                        $("body").append(tempInput);
                        tempInput.val(cartLink).select();
                        document.execCommand("copy");
                        tempInput.remove();

                        // Insere o link no modal e exibe
                        $("#cartLinkText").text(cartLink);
                        $("#shareModal").fadeIn().delay(5000).fadeOut();
                    } else {
                        alert("Erro ao obter o carrinho.");
                    }
                },
                error: function () {
                    alert("Erro ao buscar o carrinho.");
                }
            });
        });
    }, 2000);

    // Adiciona o modal oculto com estilos melhorados
    $("body").append(`
        <div id="shareModal" style="display:none; position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); background:white; padding:20px; border-radius:5px; box-shadow:0px 0px 10px rgba(0,0,0,0.2); z-index:9999; text-align:center;">
            <img src="/arquivos/link-isinaliza.png" alt="link">
            <p id="cartLinkText01" style="margin:0;">Link copiado!</p>
            <p id="cartLinkText" style="margin-top:10px; font-size:14px; color:#007BFF; word-break:break-all;"></p>
        </div>
    `);
});

// Atualizando a quantidade no mini cart
$(window).on("orderFormUpdated.vtex", function () {
    setTimeout(function () {
        $(".mini-cart .quantity.badge").each(function () {
            var $_this = $(this);
            $_this.text(parseInt($_this.text()));
        });

        $(".item-attachments-content.item-attachments-name-personalizacao").each(function () {
            var $_this = $(this);
            var $_itemAttachmentsImage = $_this.find(".item-attachments-item-fields");

            // Obter a URL da imagem
            var _thumb = $_this.find(".item-attachment-name-thumb input").val().trim();

            // Verificar se a URL da imagem existe e se a imagem com essa URL já foi inserida
            if (_thumb) {
                var imageAlreadyInserted = $_itemAttachmentsImage.find('img[src="' + _thumb + '"]').length > 0;

                if (!imageAlreadyInserted) {
                    console.log('Imagem a ser inserida:', _thumb);  // Verificar a URL da imagem
                    $_itemAttachmentsImage.prepend($("<img>", { src: _thumb }).addClass('image-inserted'));
                } else {
                    console.log('Imagem já foi inserida ou URL inválida:', _thumb);
                }
            } else {
                console.log('URL da imagem inválida ou não encontrada:', _thumb);
            }

            // Adicionar a classe 'has-attachment' e desabilitar o textarea
            $_this.prev().prev().addClass("has-attachment");
            $(this).find("textarea").attr("disabled", "disabled");
        });
    }, 1000);  // Garantir que a página tenha carregado completamente
});


function waitForElement(selector, callback, interval = 500, timeout = 10000) {
    const startTime = Date.now();
  
    const checkExist = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(checkExist);
        callback(element);
      } else if (Date.now() - startTime > timeout) {
        clearInterval(checkExist);
        console.error(`Elemento ${selector} não encontrado dentro do tempo limite.`);
      }
    }, interval);
  }
  
  function waitForElement(selector, callback, interval = 500, timeout = 10000) {
    const startTime = Date.now();
  
    const checkExist = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(checkExist);
        callback(element);
      } else if (Date.now() - startTime > timeout) {
        clearInterval(checkExist);
        console.error(`Elemento ${selector} não encontrado dentro do tempo limite.`);
      }
    }, interval);
  }
  
  function createCheckoutShelf({ categoryCluster, title = 'Você também pode gostar' }) {
    waitForElement('#shipping-preview-container', (insertAfterElement) => {
      const newSection = document.createElement('section');
      newSection.classList.add('almah-footer__shelf');
      newSection.style.display = 'flex';
      newSection.style.flexDirection = 'column';
      newSection.style.marginTop = '20px';
      newSection.innerHTML = `
      <hr>
        <h2 class="almah-footer__block--title">${title}</h2>
        <div class="almah-footer__area-shelf" style="display: flex; overflow-x: auto; gap: 10px;">
          <div class="loading-spinner"></div>
        </div>
      `;
  
      insertAfterElement.insertAdjacentElement('afterend', newSection);
      getShelfContent(categoryCluster);
    });
  }
  
  function getShelfContent(categoryCluster) {
    fetch(`/api/catalog_system/pub/products/search?fq=C:${categoryCluster}`)
      .then(response => response.json())
      .then(products => {
        const shelfContainer = document.querySelector('.almah-footer__area-shelf');
        shelfContainer.innerHTML = '';
  
        if (products.length === 0) {
          shelfContainer.innerHTML = '<p>Nenhum produto encontrado.</p>';
          return;
        }
  
        products.forEach(product => {
          const productElement = document.createElement('div');
          productElement.classList.add('almah-footer__product');
  
          productElement.innerHTML = `
            <img src="${product.items[0].images[0].imageUrl}" alt="${product.productName}" style="width: 100px; height: auto;">
            <p>${product.productName}</p>
            <strong>R$ ${product.items[0].sellers[0].commertialOffer.Price.toFixed(2)}</strong>
            <button style="margin-top: 5px; padding: 5px 10px; background-color: #008CBA; color: white; border: none; cursor: pointer;"
              onclick="addToCart(${product.items[0].itemId})">Comprar</button>
          `;
  
          shelfContainer.appendChild(productElement);
        });
      })
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }
  
  function addToCart(itemId) {
    fetch('/api/checkout/pub/orderForm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        orderItems: [{ id: itemId, quantity: 1, seller: '1' }],
      }),
    })
      .then(response => response.json())
      .then(() => alert('Produto adicionado ao carrinho!'))
      .catch(error => console.error('Erro ao adicionar produto:', error));
  }
  
  function waitForElement(selector, callback, interval = 500, timeout = 10000) {
    const startTime = Date.now();
  
    const checkExist = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(checkExist);
        callback(element);
      } else if (Date.now() - startTime > timeout) {
        clearInterval(checkExist);
        console.error(`Elemento ${selector} não encontrado dentro do tempo limite.`);
      }
    }, interval);
  }
  
  function createCheckoutShelf({ collectionId, title = 'Você também pode gostar' }) {
    waitForElement('#shipping-preview-container', (insertAfterElement) => {
      const newSection = document.createElement('section');
      newSection.classList.add('almah-footer__shelf');
      newSection.style.display = 'flex';
      newSection.style.flexDirection = 'column';
      newSection.style.marginTop = '20px';
      newSection.innerHTML = `
        <h2 class="almah-footer__block--title">${title}</h2>
        <div class="almah-footer__slider-container">
          <button class="almah-footer__slider-prev">&#10094;</button>
          <div class="almah-footer__slider">
            <div class="almah-footer__slider-track"></div>
          </div>
          <button class="almah-footer__slider-next">&#10095;</button>
        </div>
       <div class="almah-footer__button-ver-mais-container">
        <button class="almah-footer__button-ver-mais"><a>VER TODOS PRODUTOS</a></button>
       </div>
      `;
  
      insertAfterElement.insertAdjacentElement('afterend', newSection);
      getShelfContent(collectionId);
    });
  }
  
  function getShelfContent(collectionId) {
    fetch(`/api/catalog_system/pub/products/search?fq=productClusterIds:${collectionId}`)
      .then(response => response.json())
      .then(products => {
        const track = document.querySelector('.almah-footer__slider-track');
        if (!track) return;
  
        if (!products || products.length === 0) {
          track.innerHTML = '<p style="padding: 20px;">Nenhum produto encontrado.</p>';
          return;
        }
  
        track.innerHTML = ''; // Limpa antes de adicionar os produtos
        products.forEach(product => {
          const imageUrl = product.items[0]?.images[0]?.imageUrl || '';
          const productName = product.productName || 'Produto sem nome';
          const price = product.items[0]?.sellers[0]?.commertialOffer?.Price || 0;
          const listPrice = product.items[0]?.sellers[0]?.commertialOffer?.ListPrice || 0;
          const itemId = product.items[0]?.itemId || '';
  
          const priceHTML = listPrice > price
            ? `<p class="almah-footer__price">
                 <span class="almah-footer__list-price">De: R$ ${listPrice.toFixed(2)}</span>
                 <br>
                 <strong class="almah-footer__best-price">Por: R$ ${price.toFixed(2)}</strong>
               </p>`
            : `<p class="almah-footer__price">
                 <strong>R$ ${price.toFixed(2)}</strong>
               </p>`;
  
          const productElement = document.createElement('div');
          productElement.classList.add('almah-footer__product');
          productElement.innerHTML = `
            <img src="${imageUrl}" alt="${productName}">
            <p>${productName}</p>
            ${priceHTML}
            <button onclick="addToCart('${itemId}')">Adicionar ao Carrinho</button>
          `;
  
          track.appendChild(productElement);
        });
  
        initializeSlider();
      })
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }
  
  function initializeSlider() {
    const track = document.querySelector('.almah-footer__slider-track');
    const prevButton = document.querySelector('.almah-footer__slider-prev');
    const nextButton = document.querySelector('.almah-footer__slider-next');
    let index = 0;
    const totalItems = track.children.length;
    const visibleItems = 2;
    const maxIndex = totalItems - visibleItems;
  
    function updateSlider() {
      const translateX = -(index * (100 / visibleItems));
      track.style.transform = `translateX(${translateX}%)`;
    }
  
    nextButton.addEventListener('click', () => {
      if (index < maxIndex) {
        index++;
        updateSlider();
      }
    });
  
    prevButton.addEventListener('click', () => {
      if (index > 0) {
        index--;
        updateSlider();
      }
    });
  
    updateSlider();
  }
  
  function addToCart(itemId) {
    fetch('/api/checkout/pub/orderForm', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(orderForm => {
        const orderFormId = orderForm.orderFormId;
  
        return fetch(`/api/checkout/pub/orderForm/${orderFormId}/items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            orderItems: [
              {
                id: itemId,
                quantity: 1,
                seller: '1',
              },
            ],
          }),
        });
      })
      .then(response => response.json())
      .then(() => {
        alert('Produto adicionado ao carrinho!');
        location.reload(); // Atualiza o checkout para refletir a mudança
      })
      .catch(error => console.error('Erro ao adicionar produto:', error));
  }
  
  
  // Estilos para o slider
  const style = document.createElement('style');
  style.innerHTML = `
    .almah-footer__slider-container {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      max-width: 400px;
      overflow: hidden;
      margin: 0 auto;
    }
  
    .almah-footer__slider {
      overflow: hidden;
      width: 100%;
    }
  
    .almah-footer__slider-track {
      display: flex;
      transition: transform 0.5s ease-in-out;
      gap: 10px;
    }
  
    .almah-footer__product {
      flex: 0 0 calc(50% - 5px);
      box-sizing: border-box;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      text-align: center;
      min-width: 150px;
    }
  
    .almah-footer__slider-prev,
    .almah-footer__slider-next {
      background-color: #008CBA;
      color: white;
      border: none;
      padding: 10px;
      cursor: pointer;
      font-size: 18px;
      border-radius: 5px;
    }
  
    .almah-footer__list-price {
      text-decoration: line-through;
      color: #888;
      font-size: 14px;
    }
  
    .almah-footer__best-price {
      font-size: 16px;
      color: #d32f2f;
    }
  `;
  document.head.appendChild(style);
  
  // Criando a shelf no checkout com a coleção 157
  createCheckoutShelf({ collectionId: '157' });
  
  
