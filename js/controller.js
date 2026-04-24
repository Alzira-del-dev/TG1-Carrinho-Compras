
//Controller: Responsável por conectar Model e View, responder às ações do usuário

class LojaController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.inicializar();
  }

  inicializar() {
    // Botão de adicionar produto
    const btnAdicionar = document.getElementById("btnAdicionarProduto");
    if (btnAdicionar) {
      btnAdicionar.addEventListener("click", () => this.adicionarProduto());
    }

    // Botão de encerrar compra
    const btnEncerrar = document.getElementById("btnEncerrarCompra");
    if (btnEncerrar) {
      btnEncerrar.addEventListener("click", () => this.encerrarCompra());
    }

    // Enter no campo de preço
    const precoInput = document.getElementById("precoProduto");
    if (precoInput) {
      precoInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") this.adicionarProduto();
      });
    }

    // Atualizar a interface
    this.atualizarTela();
  }

  adicionarProduto() {
    const nomeInput = document.getElementById("nomeProduto");
    const precoInput = document.getElementById("precoProduto");

    const nome = nomeInput ? nomeInput.value : "";
    const preco = precoInput ? parseFloat(precoInput.value) : NaN;

    try {
      this.model.adicionarProduto(nome, preco);
      this.view.mostrarSucesso("Produto adicionado com sucesso!");
      this.view.limparFormulario();
      this.atualizarTela();
    } catch (erro) {
      this.view.mostrarErro(erro.message);
    }
  }

  adicionarAoCarrinho(produtoId) {
    try {
      this.model.adicionarAoCarrinho(produtoId);
      this.view.mostrarSucesso("Produto adicionado ao carrinho!");
      this.atualizarTela();
    } catch (erro) {
      this.view.mostrarErro(erro.message);
    }
  }

  encerrarCompra() {
    const quantidade = this.model.getQuantidadeTotal();

    if (quantidade === 0) {
      this.view.mostrarErro("Carrinho está vazio!");
      return;
    }

    if (confirm(`Finalizar compra de ${quantidade} item(ns)?`)) {
      this.model.encerrarCompra();
      this.view.mostrarSucesso("Compra finalizada! Obrigado!");
      this.atualizarTela();
    }
  }

  atualizarTela() {
    // Atualizar lista de produtos
    const produtos = this.model.getProdutos();
    this.view.renderizarProdutos(produtos, (id) =>
      this.adicionarAoCarrinho(id),
    );

    // Atualizar carrinho
    const carrinho = this.model.getCarrinho();
    const quantidade = this.model.getQuantidadeTotal();
    const total = this.model.getPrecoTotal();
    this.view.renderizarCarrinho(carrinho, quantidade, total);
  }
}
