
// Model:Responsável pelos dados e regras de negócio

class LojaModel {
  constructor() {
    // Produtos cadastrados
    this.produtos = [];
    // Itens do carrinho
    this.carrinho = [];
    // Próximo ID disponível
    this.proximoId = 1;

    this.carregarDados();
  }

  // Carregar dados salvos (se existirem)
  carregarDados() {
    const produtosSalvos = localStorage.getItem("produtos");
    if (produtosSalvos) {
      this.produtos = JSON.parse(produtosSalvos);
      // Atualizar próximoId
      if (this.produtos.length > 0) {
        this.proximoId = Math.max(...this.produtos.map((p) => p.id)) + 1;
      }
    }

    const carrinhoSalvo = localStorage.getItem("carrinho");
    if (carrinhoSalvo) {
      this.carrinho = JSON.parse(carrinhoSalvo);
    }
  }

  // Salvar dados
  salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(this.produtos));
    localStorage.setItem("carrinho", JSON.stringify(this.carrinho));
  }

  // Adicionar produto
  adicionarProduto(nome, preco) {
    if (!nome || nome.trim() === "") {
      throw new Error("Nome do produto é obrigatório");
    }

    if (isNaN(preco) || preco <= 0) {
      throw new Error("Preço deve ser um número positivo");
    }

    const produto = {
      id: this.proximoId++,
      nome: nome.trim(),
      preco: parseFloat(preco),
    };

    this.produtos.push(produto);
    this.salvarDados();
    return produto;
  }

  // Obter todos os produtos
  getProdutos() {
    return [...this.produtos];
  }

  // Adicionar ao carrinho
  adicionarAoCarrinho(produtoId) {
    const produto = this.produtos.find((p) => p.id === produtoId);

    if (!produto) {
      throw new Error("Produto não encontrado");
    }

    this.carrinho.push({
      id: Date.now(),
      produtoId: produto.id,
      nome: produto.nome,
      preco: produto.preco,
    });

    this.salvarDados();
  }

  // Obter itens do carrinho
  getCarrinho() {
    return [...this.carrinho];
  }

  // Calcular quantidade total de itens no carrinho
  getQuantidadeTotal() {
    return this.carrinho.length;
  }

  // Calcular valor total do carrinho
  getPrecoTotal() {
    let total = 0;
    for (let i = 0; i < this.carrinho.length; i++) {
      total += this.carrinho[i].preco;
    }
    return total;
  }

  // Encerrar compra (limpar carrinho)
  encerrarCompra() {
    this.carrinho = [];
    this.salvarDados();
  }
}
