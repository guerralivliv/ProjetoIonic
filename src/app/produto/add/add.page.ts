import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser'

import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  slideOpts = {
    slidesPerView: 3,
    initialSlide: 1,
    speed: 400
  };

  private produto: Produto;

  constructor(
    private camera: Camera,
    private ds:DomSanitizer,
    private prodService: ProdutoService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.produto = new Produto;
  }

  onSubmit(form) {
    if (this.produto.fotos[0] == null) {
      this.presentAlert("Sem fotos", "Cadastre ao memos uma foto!");
    } else {
      this.addProduto();
      form.reset();
    }
  }

  async addPhotoCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
           
      this.produto.fotos.push(base64Image);
    }, (err) => {
      console.log(err)
    });
  }

  async addProduto() {
    this.prodService.save(this.produto)
      .then(
        ok => {
          this.presentAlert("OK", "Cadastrado!");
          this.produto = new Produto;
        },
        noSave => {
          this.presentAlert("Erro", "Não cadastrado!");
          console.log(noSave);

        }
      )
      .catch(
        err => {
          this.presentAlert("Erro no sistema", "Erro ao acessar o sistema!");
        }
      );
  }

  //Alerts---------------------------------
  async presentAlert(tipo: string, texto: string) {
    const alert = await this.alertController.create({
      header: tipo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });

    await alert.present();
  }
}
