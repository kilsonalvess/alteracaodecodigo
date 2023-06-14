import { Component } from '@angular/core';
import { Produto } from 'src/app/shared/modelo/produto';
import { Produtos } from 'src/app/shared/modelo/produtos';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-mantem-produto',
  templateUrl: './mantem-produto.component.html',
  styleUrls: ['./mantem-produto.component.css']
})
export class MantemProdutoComponent {

  produtoDeManutencao: Produto;
  estahCadastrando = true;
  nomeBotaoManutencao = 'Cadastrar';

  produtos = Produtos;
  constructor(private rotaAtual: ActivatedRoute, private roteador: Router) {
    this.produtoDeManutencao = new Produto();
    const idParaEdicao = this.rotaAtual.snapshot.paramMap.get('id');
    if (idParaEdicao) {
      // editando
      const produtoEncontrado = this.produtos.find(
        produto => produto.id === parseInt(idParaEdicao));
      if (produtoEncontrado) {
        this.estahCadastrando = false;
        this.nomeBotaoManutencao = 'Salvar';
        this.produtoDeManutencao = produtoEncontrado;
      }
    } else {
      this.nomeBotaoManutencao = 'Cadastrar';
    }
  }

  manter(): void {
    if (this.estahCadastrando && this.produtoDeManutencao) {
      this.produtos.push(this.produtoDeManutencao);
    }
    this.produtoDeManutencao = new Produto();
    this.nomeBotaoManutencao = 'Cadastrar';
    this.roteador.navigate(['listagemprodutos']);
  }

}
