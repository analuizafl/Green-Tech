fetch('js/backend.json')
    .then(response => response.json())
    .then(data => {
        // Salvar os dados do back-end localmente
        // Vamos utilizar o localStorage
        localStorage.setItem('produtos', JSON.stringify(data));
        console.log('Dados dos produtos SALVOS NO LOCALSTORAGE');

        //SIMULAR O CARREGAMENTO 
        setTimeout(() => {

            // Esvaziar a área de produtos
            $("#produtos").empty();


            data.forEach(produto => {
                var produtoHTML = `
                    <!--ITEM-CARD-->
                    <div class="item-card">
                        <a data-id="${produto.id}" href="/detalhes/" class="item">
                            <div class="img-container">
                                <img src="${produto.imagem}">
                            </div>
                            <div class="nome-rating">
                                <samp class="color-gray">${produto.nome}</samp>
                                <samp class="bold margin-right">
                                    <i class="mdi mdi-star"></i>
                                    ${produto.rating}
                                </samp>
                            </div>
                            <div class="price"> ${produto.preco_promocional.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                        </a>
                    </div>
                `;

                $("#produtos").append(produtoHTML);
            });

            $(".item").on('click', function () {
                var id = $(this).attr('data-id');
                localStorage.setItem('detalhe', id);
                app.views.main.router.navigate('/detalhes/');
            });

        }, 1000);



    })
    .catch(error => alert('ERRO ao fazer fetch dos dados: ' + error));

//VER QUANTOS ITENS TEM DENTRO DO CARRINHO 
setTimeout(() => {
    var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    //ALIMENTAR O CONTADOR DA SACOLA 
    $('.btn-cart').attr('data-count', carrinho.length);

}, 300);