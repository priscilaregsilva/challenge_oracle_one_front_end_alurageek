async function getProdutos() {
    if(localStorage.getItem('produtos') == null) {
        const response = await fetch("assets/js/dados.json");
        const produtos = await response.json();
        localStorage.setItem('produtos', JSON.stringify(produtos));
    }
}

function deletarProduto(id) {
    const produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
    const index = produtos.findIndex(produto => produto.id === id);
    if (index !== -1) {
        produtos.splice(index, 1);
    }
    localStorage.setItem('produtos', JSON.stringify(produtos));
    const conteudoDiv = document.getElementById('produto_id');
    conteudoDiv.innerHTML = '';
    populaProdutos();
}

function adicionarProduto(id) {
    const url = document.getElementById('url');
    const nome = document.getElementById('nome');
    const preco = document.getElementById('preco');
    const identificador = document.getElementById('produto_id');

    if(url.value != "" && nome.value != "" && preco.value != "" && identificador.value != "") {
        const produto = {
            'nome': nome.value,
            'imagem': url.value,
            'preco': preco.value,
            'id': identificador.value
        }

        const produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
        produtos.push(produto);
        localStorage.setItem('produtos', JSON.stringify(produtos));
        window.location = "administracao.html";
    }
}

function editarCampoProduto(id) {
    const produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
    const produto = produtos.filter(produto => produto.id == id);
}


async function populaProdutos() {
    await getProdutos();
    const conteudoDiv = document.getElementById('produto_id');

    const proutos = JSON.parse(localStorage.getItem("produtos") || "[]");
    proutos.forEach(produto => {
        const produtoDiv = document.createElement('div');
        const produtoImg = document.createElement('img');
        const produtoName = document.createElement('span');
        const produtoPrice = document.createElement('span');
        const produtoEditarSpan = document.createElement('span');
        const produtoDeletarSpan = document.createElement('span');
        const produtoEditarInput = document.createElement('input');
        const produtoDeletarInput = document.createElement('input');

        produtoDiv.classList.add('produto_detalhe');
        produtoImg.src = produto.imagem;
        produtoImg.alt = produto.nome;
        produtoName.textContent = produto.nome;
        produtoPrice.textContent = produto.preco;
        produtoEditarInput.type = 'button';
        produtoEditarInput.classList.add('botao_editar');
        produtoEditarInput.value = 'Editar';
        produtoEditarInput.onclick = function() {
            editarCampoProduto(produto.id);
        };
        produtoDeletarInput.type = 'button';
        produtoDeletarInput.classList.add('botao_deletar');
        produtoDeletarInput.value = 'Deletar';
        produtoDeletarInput.onclick = function() {
            deletarProduto(produto.id);
        };

        produtoEditarSpan.appendChild(produtoEditarInput);
        produtoDeletarSpan.appendChild(produtoDeletarInput);

        produtoDiv.appendChild(produtoImg);
        produtoDiv.appendChild(produtoName);
        produtoDiv.appendChild(produtoPrice);
        produtoDiv.appendChild(produtoEditarSpan);
        produtoDiv.appendChild(produtoDeletarSpan);

        conteudoDiv.appendChild(produtoDiv);
    });
}

populaProdutos();


