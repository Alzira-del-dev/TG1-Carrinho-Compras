// View: Responsável pela interface (HTML/CSS)

class LojaView {
  constructor() {
    this.listaProdutosDiv = document.getElementById("listaProdutos");
    this.carrinhoListaDiv = document.getElementById("carrinhoLista");
    this.quantidadeSpan = document.getElementById("quantidadeTotal");
    this.precoTotalSpan = document.getElementById("precoTotal");
  }

  // Mostrar lista de produtos
  renderizarProdutos(produtos, aoComprar) {
    if (!this.listaProdutosDiv) return;

    if (produtos.length === 0) {
      this.listaProdutosDiv.innerHTML =
        '<div class="vazio">Nenhum produto cadastrado</div>';
      return;
    }

    let html = "";
    for (let i = 0; i < produtos.length; i++) {
      const p = produtos[i];
      html += `
                <div class="produto-item">
                    <div class="produto-info">
                        <strong>${this.escapeHtml(p.nome)}</strong><br>
                        <span class="produto-preco">MT ${p.preco.toFixed(2)}</span>
                    </div>
                    <button class="btn-comprar" data-id="${p.id}">🛒 Comprar</button>
                </div>
            `;
    }

    this.listaProdutosDiv.innerHTML = html;

    // Adicionar eventos aos botões de comprar
    const botoes = document.querySelectorAll(".btn-comprar");
    for (let i = 0; i < botoes.length; i++) {
      const botao = botoes[i];
      const id = parseInt(botao.getAttribute("data-id"));
      botao.addEventListener("click", () => aoComprar(id));
    }
  }

  // Mostrar carrinho
  renderizarCarrinho(itens, quantidadeTotal, precoTotal) {
    if (!this.carrinhoListaDiv) return;

    if (itens.length === 0) {
      this.carrinhoListaDiv.innerHTML =
        '<div class="vazio">Carrinho vazio</div>';
    } else {
      let html = "";
      for (let i = 0; i < itens.length; i++) {
        const item = itens[i];
        html += `
                    <div class="carrinho-item">
                        <span>${this.escapeHtml(item.nome)}</span>
                        <span class="produto-preco">MT ${item.preco.toFixed(2)}</span>
                    </div>
                `;
      }
      this.carrinhoListaDiv.innerHTML = html;
    }

    // Atualizar totais
    this.quantidadeSpan.textContent = quantidadeTotal;
    this.precoTotalSpan.textContent = precoTotal.toFixed(2);
  }

  // Mostrar mensagem de erro
  mostrarErro(mensagem) {
    alert(mensagem);
  }

  // Mostrar mensagem de sucesso
  mostrarSucesso(mensagem) {
    alert(mensagem);
  }

  // Limpar campos do formulário
  limparFormulario() {
    const nomeInput = document.getElementById("nomeProduto");
    const precoInput = document.getElementById("precoProduto");

    if (nomeInput) nomeInput.value = "";
    if (precoInput) precoInput.value = "";

    if (nomeInput) nomeInput.focus();
  }

  // Escapar HTML para evitar injeção
  escapeHtml(texto) {
    if (!texto) return "";
    return texto
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
}
