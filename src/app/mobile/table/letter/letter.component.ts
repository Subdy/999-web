import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import data from './../../../../assets/data/data.json'
import { FirebaseService, StorageService } from 'src/app/service/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss']
})
export class LetterComponent implements OnInit {

  @ViewChild("slides") slides: IonSlides;
  char: any = []
  img: any = ''
  hide: boolean = true
  index: any
  option = {
    speed: 300
  }
  /**Lấy index slide */
  save = {
    index0: 0, index1: 0, index2: 0,
    index3: 0, index4: 0, index5: 0,
    index6: 0, index7: 0, index8: 0,
    index9: 0, index10: 0, index11: 0,
    index12: 0, index13: 0, index14: 0,
    index15: 0, index16: 0, index17: 0,
    index18: 0, index19: 0
  }
  constructor(
    public service: FirebaseService,
    private route: NavController,
    private router: Router,
    private storageService: StorageService,
    private naCtrv: NavController,
  ) {
    this.index = this.router.getCurrentNavigation().extras.state;
    let save = this.service.getValue('hulu-index')
    if (save) this.save = save
  }
  list: any = ['Đừng so sánh mình với người khác!', 'Mọi chuyện sẽ ổn thôi!', 'Hãy cười lên nào!', 'Chắc chắn sẽ làm được!']
  ngOnInit() {
    this.service.showLoading(this.list[Math.floor(Math.random() * 3)], "transparent-loading", 'lines', null, "ios", false).then(() => {
      this.selectLetter(this.index)
      this.service.hideLoading().then(() => {
        this.slides.slideTo(this.checkIndex(this.index))
      })
    })
  }
  selectLetter(index) {
    switch (index) {
      case 0: return this.getData(data.let0)
      case 1: return this.getData(data.let1)
      case 2: return this.getData(data.let2)
      case 3: return this.getData(data.let3)
      case 4: return this.getData(data.let4)
      case 5: return this.getData(data.let5)
      case 6: return this.getData(data.let6)
      case 7: return this.getData(data.let7)
      case 8: return this.getData(data.let8)
      case 9: return this.getData(data.let9)
      case 10: return this.getData(data.let10)
      case 11: return this.getData(data.let11)
      case 12: return this.getData(data.let12)
      case 13: return this.getData(data.let13)
      case 14: return this.getData(data.let14)
      case 15: return this.getData(data.let15)
      case 16: return this.getData(data.let16)
      case 17: return this.getData(data.let17)
      case 18: return this.getData(data.let18)
      case 19: return this.getData(data.let19)
      default: this.getData(this.char)
    }
  }
  getData(data): any {
    let love = this.storageService.getData('hulu-love')
    this.char = data.map((item) => {
      let b = Math.floor(Math.random() * 19) + 1
      if (item.id % 2 == 0) this.img = 'assets/left/' + b + '.svg'
      else this.img = 'assets/right/' + b + '.svg'
      for (let i in love) {
        if (love) {
          if (item.id == love[i].id) {
            item.status = true
          }
        }
      }
      return { ...item, img: this.img }
    })
    // this.indexImg = this.char[this.checkIndex(this.index)].id
  }
  checkIndex(index) {
    switch (index) {
      case 0: return this.service.getValue('hulu-index') ? this.service.getValue('hulu-index')['index0'] : 0
      case 1: return this.service.getValue('hulu-index') ? this.service.getValue('hulu-index')['index1'] : 0
      case 2: return this.service.getValue('hulu-index') ? this.service.getValue('hulu-index')['index2'] : 0
      case 3: return this.service.getValue('hulu-index') ? this.service.getValue('hulu-index')['index3'] : 0
      case 4: return this.service.getValue('hulu-index') ? this.service.getValue('hulu-index')['index4'] : 0
      case 5: return this.service.getValue('hulu-index') ? this.service.getValue('hulu-index')['index5'] : 0
      case 6: return this.service.getValue('hulu-index') ? this.service.getValue('hulu-index')['index6'] : 0
      case 7: return this.service.getValue('hulu-index') ? this.service.getValue('hulu-index')['index7'] : 0
      case 8: return this.service.getValue('hulu-index') ? this.service.getValue('hulu-index')['index8'] : 0
      case 9: return this.service.getValue('hulu-index') ? this.service.getValue('hulu-index')['index9'] : 0
      case 10: return this.service.getValue('hulu-index') ? this.service.getValue('hulu-index')['index10'] : 0
      case 11: return this.service.getValue('hulu-index') ? this.service.getValue('hulu-index')['index11'] : 0
      case 12: return this.service.getValue('hulu-index') ? this.service.getValue('hulu-index')['index12'] : 0
      case 13: return this.service.getValue('hulu-index') ? this.service.getValue('hulu-index')['index13'] : 0
      case 14: return this.service.getValue('hulu-index') ? this.service.getValue('hulu-index')['index14'] : 0
      case 15: return this.service.getValue('hulu-index') ? this.service.getValue('hulu-index')['index15'] : 0
      case 16: return this.service.getValue('hulu-index') ? this.service.getValue('hulu-index')['index16'] : 0
      case 17: return this.service.getValue('hulu-index') ? this.service.getValue('hulu-index')['index17'] : 0
      case 18: return this.service.getValue('hulu-index') ? this.service.getValue('hulu-index')['index18'] : 0
      case 19: return this.service.getValue('hulu-index') ? this.service.getValue('hulu-index')['index19'] : 0
      default: this.getData(this.char)
    }
  }


  showHide() {
    this.hide = !this.hide
  }
  indexImg: any;
  /**Lấy index slide */
  getIndex() {
    this.slides.getActiveIndex()
      .then(index => {
        //this.indexImg = this.char[index].id
        this.saveIndex(this.index, index)
      })
      .catch(err => console.error(err));
  }

  saveIndex(index, save) {
    switch (index) {
      case 0: {
        this.save.index0 = save
        this.service.setValue('hulu-index', this.save)
      } break
      case 1: {
        this.save.index1 = save
        this.service.setValue('hulu-index', this.save)
      } break
      case 2: {
        this.save.index2 = save
        this.service.setValue('hulu-index', this.save)
      } break
      case 3: {
        this.save.index3 = save
        this.service.setValue('hulu-index', this.save)
      } break
      case 4: {
        this.save.index4 = save
        this.service.setValue('hulu-index', this.save)
      } break
      case 5: {
        this.save.index5 = save
        this.service.setValue('hulu-index', this.save)
      } break
      case 6: {
        this.save.index6 = save
        this.service.setValue('hulu-index', this.save)
      } break
      case 7: {
        this.save.index7 = save
        this.service.setValue('hulu-index', this.save)
      } break
      case 8: {
        this.save.index8 = save
        this.service.setValue('hulu-index', this.save)
      } break
      case 9: {
        this.save.index9 = save
        this.service.setValue('hulu-index', this.save)
      } break
      case 10: {
        this.save.index10 = save
        this.service.setValue('hulu-index', this.save)
      } break
      case 11: {
        this.save.index11 = save
        this.service.setValue('hulu-index', this.save)
      } break
      case 12: {
        this.save.index12 = save
        this.service.setValue('hulu-index', this.save)
      } break
      case 13: {
        this.save.index13 = save
        this.service.setValue('hulu-index', this.save)
      } break
      case 14: {
        this.save.index14 = save
        this.service.setValue('hulu-index', this.save)
      } break
      case 15: {
        this.save.index15 = save
        this.service.setValue('hulu-index', this.save)
      } break
      case 16: {
        this.save.index16 = save
        this.service.setValue('hulu-index', this.save)
      } break
      case 17: {
        this.save.index17 = save
        this.service.setValue('hulu-index', this.save)
      } break
      case 18: {
        this.save.index18 = save
        this.service.setValue('hulu-index', this.save)
      } break
      case 19: {
        this.save.index19 = save
        this.service.setValue('hulu-index', this.save)
      } break
    }
  }
  goBack() {
    this.router.navigate(['mobile/table'])
  }
}
