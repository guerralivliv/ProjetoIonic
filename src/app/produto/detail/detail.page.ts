import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  slideOpts = {
    slidesPerView: 1,
    initialSlide: 1,
    pager:true,
    speed: 400
  };

  private produto$: Observable<any>;
  private id: string;

  constructor(
    private activeRouter: ActivatedRoute,
    private prodService: ProdutoService,
  ) {
    this.id = this.activeRouter.snapshot.paramMap.get('id');
    this.produto$ = this.prodService.get(this.id);
  }

  ngOnInit() {

  }

  addCar(i, p){
    p.id = i;
    console.log(p);
  }

}

