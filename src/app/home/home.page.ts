import { Component, OnInit } from '@angular/core';
import { Produto } from '../produto/produto';
import { ProdutoService } from '../produto/produto.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private produtos: Observable<any>;

  constructor(
    private prodService: ProdutoService,
  ) { 
    this.produtos = this.prodService.getAll();   
  }

  ngOnInit() {

  }

}
