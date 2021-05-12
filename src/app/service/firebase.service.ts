import { Injectable, RendererFactory2, Inject, Renderer2 } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { TranslateService } from '@ngx-translate/core';
import { ToastController, LoadingController, ModalController, AlertController, ActionSheetController, PickerController, Platform } from '@ionic/angular';
import { ModalOptions, ComponentProps, ComponentRef, AlertOptions, AlertInput, ActionSheetOptions, PickerOptions } from '@ionic/core';
import { PipeTransform, Pipe } from '@angular/core'
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  renderer: Renderer2;

  constructor(
    private renderFactory: RendererFactory2,
    public translateService: TranslateService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private pickerCtrl: PickerController,
    private platform: Platform,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = this.renderFactory.createRenderer(null, null);
  }
  enableDark() {
    this.renderer.addClass(this.document.body, "dark-theme");
    localStorage.setItem("subdy_dark_mode", "dark");
    localStorage.setItem("subdy_mode", "true");
  }
  enableLight() {
    this.renderer.removeClass(this.document.body, "dark-theme");
    localStorage.setItem("subdy_dark_mode", "light");
    localStorage.setItem("subdy_mode", "false");
  }

  checkThemeExisted() {
    let existedTheme = localStorage.getItem("subdy_theme");

    if (existedTheme != null) {
      let element: HTMLElement = document.getElementsByClassName(
        "color " + existedTheme
      )[0] as HTMLElement;
      element.click();
    } else {
      let element: HTMLElement = document.getElementsByClassName(
        "hu-theme"
      )[0] as HTMLElement;
      element.click();
    }
  }
  checkTheme_all() {
    let existedTheme = localStorage.getItem("subdy_theme");
    if (existedTheme == null) {
      localStorage.removeItem("subdy_theme");
      return;
    }
    this.renderer.addClass(this.document.body, existedTheme);

    if (localStorage.getItem("subdy_dark_mode") === "dark") {
      this.enableDark();
    }
  }
  set_theme(color, event) {
    for (let elem of event.target.parentElement.children) {
      elem.innerHTML = "";
      event.target.innerHTML = `<ion-icon color="hu-white" src="./assets/icon/tick.svg" style="height: 2rem;width:2rem; margin-right: -10%;"></ion-icon>`;
    }
    // Remove old themes by filter by className string
    let bodyClasses: Array<any> = Array.from(this.document.body.classList);
    for (let i = 0; i < bodyClasses.length; i++)
      if (bodyClasses[i].indexOf("_theme") > -1) bodyClasses.splice(i, 1);
    this.document.body.className = bodyClasses.join(" ");

    // Set new theme
    if (color == "hu-theme") {
      localStorage.removeItem("subdy_theme");
      return;
    }
    this.renderer.addClass(this.document.body, color);
    localStorage.setItem("subdy_theme", color);
  }

  /**
* Set theme
*/
  public setTheme(color) {
    let bodyClasses: Array<any> = Array.from(this.document.body.classList);
    for (let i = 0; i < bodyClasses.length; i++) this.renderer.removeClass(this.document.body, bodyClasses[i])
    //   if (bodyClasses[i].indexOf("_theme") > -1) bodyClasses.splice(i, 1);
    // this.document.body.className = bodyClasses.join(" ");
    if (color == "hulu_theme") {
      localStorage.removeItem("hulu-theme");
      return;
    }
    this.renderer.addClass(this.document.body, color);
    localStorage.setItem("hulu-theme", color);
  }
  /**
 * Check theme
 */
  public checkTheme() {
    let existedTheme = localStorage.getItem("hulu-theme");
    if (existedTheme == null) {
      localStorage.removeItem("hulu-theme");
      return;
    }
    this.renderer.addClass(this.document.body, existedTheme);
  }



  /**
* Set value
*/
  translate(key) {
    let value;
    this.translateService.get(key).subscribe(res => {
      value = res;
    });
    return value;
  }
  /**
  * Thông báo
  * @param duration 
  * @param message
  * @param cssClass (default: "current-toast")
  * @example
  * this.functionUIService.showToast(2000,"HELLO WORLD", "success-toast")
     .then((toast => {
       toast.onWillDismiss().then(() => console.log('onWillDismiss'))
       toast.onDidDismiss().then(() => console.log('onDidDismiss'))
     }));
  */
  public showToast(
    duration: number,
    message: string,
    cssClass: "alert-toast" | "success-toast" | "current-toast" = "current-toast"
  ) {
    return new Promise<HTMLIonToastElement>(resolve => {
      this.toastCtrl.getTop().then(res => {
        if (res) {
          this.toastCtrl.dismiss()
        }
      }).then(() => {
        this.toastCtrl.create({ mode: "ios", duration, message, cssClass })
          .then(toast => { toast.present(), resolve(toast) })
      })

    })
  }

  /**
   * Show modal
   * @param component 
   * @param componentProps 
   * @param backdropDismiss 
   * @param swipeToClose: Android no support
   * @param cssClass 'modal-transparent' | string
   * @example
   * this.functionUIService.showModal(SearchProductsComponent, { a: 13 }, true, true)
      .then(modal => {
        modal.onWillDismiss().then(dataReturn => console.log(dataReturn))
        modal.onDidDismiss().then(dataReturn => console.log(dataReturn))
      })
   */
  private _BACK_BTN: any[] = []
  public showModal(
    component: ComponentRef,
    componentProps: ComponentProps<ComponentRef>,
    backdropDismiss: boolean = false,
    swipeToClose: boolean = false,
    cssClass?: string | string[] | 'modal-transparent' | 'modal-print') {
    return new Promise<HTMLIonModalElement>(resolve => {
      const options: ModalOptions = {
        backdropDismiss,
        component,
        componentProps
      }

      if (swipeToClose) options['swipeToClose'] = swipeToClose
      if (cssClass) options['cssClass'] = cssClass
      this.modalCtrl.create(options).then(modal => {
        modal.present().then(() => {
          this._BACK_BTN.push(this.activeAndroidBackButton(this.router.url, () => {
            this.hideModal();
          }, 2))
        });
        resolve(modal)
      })
    })
  }
  /**
   * Hide modal
   * @param data 
   * @param latency 
   * @example
   * this.functionUIService.hideModal("21324234", 200)
   */
  public hideModal(data: any = null, latency: number = 0) {
    if (this._BACK_BTN.length) {
      this.dismissAndroidBackButton(this.router.url, this._BACK_BTN[this._BACK_BTN.length - 1])
      this._BACK_BTN.pop()
    }
    setTimeout(() => this.modalCtrl.dismiss(data), latency)
  }

  /**Kích hoạt sự kiện back button trên android
   * @param path: đường dẫn url
   * @param action: hàm thực hiện
   * @example
   * ionViewDidEnter() {
    this.backButton = this.vhComponent.activeAndroidBackButton('mobile/management/invoice/purchase/cart', this.goToListInvoice)
  }
   */
  public activeAndroidBackButton(path: string, action?, priority: number = 1) {
    if (this.platform.platforms().includes("android") && this.router.url.includes(path)) {
      return this.platform.backButton.subscribeWithPriority(
        priority, () => action())
    }
  }
  /**Vô hiệu hóa sự kiện back button trên android 
   * @param path: đường dẫn url
   * @param variable: biến lưu trữ sự kiện backButton
   * @example
   * ionViewWillLeave() {
    this.vhComponent.dismissAndroidBackButton('mobile/management/invoice/purchase/cart', this.backButton)
  }
  */
  public dismissAndroidBackButton(path, variable: any) {
    if (this.platform.platforms().includes("android")) variable.unsubscribe();
  }
  /**
    * Set background
    */
  public setBackgroundImg() {
    return JSON.parse(localStorage.getItem('hulu-img')) ? JSON.parse(localStorage.getItem('hulu-img')).img : 'assets/1.jpg'
  }

  /**
  * Show alert confirm
  * @param header 
  * @param subHeader 
  * @param message 
  * @param textSuccess 
  * @param textCancel 
  * @example
  * this.vhComponent
     .alertConfirm("",
       this.languageService.translate("Delete customer?"),
       this.item.name, "OK",
       this.languageService.translate("Cancel"))
     .then(ok => {
       console.log(ok)
     }, cancel => {
       console.log(cancel)
     })
  */
  public alertConfirm(header: string, subHeader: string, message: string, textSuccess: string = 'OK', textCancel: string = "Cancel", backdropDismiss: boolean = false) {
    return new Promise<any>((resolve, rejects) => {
      const option: AlertOptions = {
        header, subHeader, message, backdropDismiss, id: 'vh-alert',
        buttons: [
          {
            text: textCancel,
            role: 'cancel',
            handler: () => rejects('Cancel')
          },
          {
            text: textSuccess,
            handler: () => resolve('OK')
          }
        ]
      }
      this.alertCtrl.getTop().then(res => {
        if (res) this.alertCtrl.dismiss()
        else
          this.alertCtrl.create(option).then(alert => {
            alert.present()
          })
      })
    })
  }

  /**
     * Set Slide
     */
  public slideOption() {
    let slide = JSON.parse(localStorage.getItem('hulu-slide')) ? (JSON.parse(localStorage.getItem('hulu-slide')).slide) : 4
    switch (slide) {
      case 1: return this.slideOpts1
      case 2: return this.slideOpts2
      case 3: return this.slideOpts3
      default: this.slideOpts4
    }
  }
  /**
  * Active Loading
  * @param message 
  * @param cssClass 
  * @param spinner 
  * @param duration 
  * @param showBackdrop 
  * @example 
  * this.vhComponent.showLoading("", "transparent-loading", null, 0, false).then(() => action())
  */
  private loading: any;
  public showLoading(
    message: string,
    cssClass?: "current-loading" | "transparent-loading",
    spinner?: "bubbles" | "circles" | "circular" | "crescent" | "dots" | "lines" | "lines-small",
    duration: number = 0,
    mode: "md" | "ios" = "md",
    showBackdrop: boolean = true
  ) {
    return new Promise((resolve) => {
      this.loading = setTimeout(() => this.loadingCtrl.dismiss(), 3000)
      const option: any = { message, showBackdrop, duration, mode }

      if (spinner) option['spinner'] = spinner;
      option['cssClass'] = cssClass ? cssClass : "current-loading";

      this.loadingCtrl.create(option).then(loading => {
        loading.present().then(() => resolve('Loading'));
      })
    })
  }
  /**
   * Dismiss Loading
   * @param latency 
   * @param data 
   * @example
   * this.functionUIService.hideLoading(200)
   */
  public hideLoading(latency: number = 0, value: any = {}) {
    return new Promise((resolve) => {
      clearTimeout(this.loading)
      setTimeout(() => this.loadingCtrl.dismiss(value).then(res => resolve(res)), latency)
    })
  }

  /**
   * Set value
   */
  public setValue(col, value) {
    localStorage.setItem(col, JSON.stringify(value))
  }
  /**
  * Get Value
  */
  public getValue(col) {
    return JSON.parse(localStorage.getItem(col))
  }

  /**
    * Option slide
    */
  slideOpts1 = {
    initialSlide: JSON.parse(localStorage.getItem('hulu-index')) ? JSON.parse(localStorage.getItem('hulu-index')).index : 0,
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}flip`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.originalParams = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { $, slides, rtlTranslate: rtl } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          let progress = $slideEl[0].progress;
          if (swiper.params.flipEffect.limitRotation) {
            progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          }
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          const rotate = -180 * progress;
          let rotateY = rotate;
          let rotateX = 0;
          let tx = -offset$$1;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
            rotateX = -rotateY;
            rotateY = 0;
          } else if (rtl) {
            rotateY = -rotateY;
          }

          $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

          if (swiper.params.flipEffect.slideShadows) {
            // Set shadows
            let shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if (shadowBefore.length === 0) {
              shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'left' : 'top'}"></div>`);
              $slideEl.append(shadowBefore);
            }
            if (shadowAfter.length === 0) {
              shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'right' : 'bottom'}"></div>`);
              $slideEl.append(shadowAfter);
            }
            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
          }
          $slideEl
            .transform(`translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, activeIndex, $wrapperEl } = swiper;
        slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          // eslint-disable-next-line
          slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;

            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      }
    }
  };
  slideOpts2 = {
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    on: {
      beforeInit: function () {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}cube`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          resistanceRatio: 0,
          spaceBetween: 0,
          centeredSlides: false,
          virtualTranslate: true,
        };

        this.params = Object.assign(this.params, overwriteParams);
        this.originalParams = Object.assign(this.originalParams, overwriteParams);
      },
      setTranslate: function () {
        const swiper = this;
        const {
          $el, $wrapperEl, slides, width: swiperWidth, height: swiperHeight, rtlTranslate: rtl, size: swiperSize,
        } = swiper;
        const params = swiper.params.cubeEffect;
        const isHorizontal = swiper.isHorizontal();
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        let wrapperRotate = 0;
        let $cubeShadowEl;
        if (params.shadow) {
          if (isHorizontal) {
            $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
            if ($cubeShadowEl.length === 0) {
              $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
              $wrapperEl.append($cubeShadowEl);
            }
            $cubeShadowEl.css({ height: `${swiperWidth}px` });
          } else {
            $cubeShadowEl = $el.find('.swiper-cube-shadow');
            if ($cubeShadowEl.length === 0) {
              $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
              $el.append($cubeShadowEl);
            }
          }
        }

        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          let slideIndex = i;
          if (isVirtual) {
            slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
          }
          let slideAngle = slideIndex * 90;
          let round = Math.floor(slideAngle / 360);
          if (rtl) {
            slideAngle = -slideAngle;
            round = Math.floor(-slideAngle / 360);
          }
          const progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          let tx = 0;
          let ty = 0;
          let tz = 0;
          if (slideIndex % 4 === 0) {
            tx = -round * 4 * swiperSize;
            tz = 0;
          } else if ((slideIndex - 1) % 4 === 0) {
            tx = 0;
            tz = -round * 4 * swiperSize;
          } else if ((slideIndex - 2) % 4 === 0) {
            tx = swiperSize + (round * 4 * swiperSize);
            tz = swiperSize;
          } else if ((slideIndex - 3) % 4 === 0) {
            tx = -swiperSize;
            tz = (3 * swiperSize) + (swiperSize * 4 * round);
          }
          if (rtl) {
            tx = -tx;
          }

          if (!isHorizontal) {
            ty = tx;
            tx = 0;
          }

          const transform$$1 = `rotateX(${isHorizontal ? 0 : -slideAngle}deg) rotateY(${isHorizontal ? slideAngle : 0}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
          if (progress <= 1 && progress > -1) {
            wrapperRotate = (slideIndex * 90) + (progress * 90);
            if (rtl) wrapperRotate = (-slideIndex * 90) - (progress * 90);
          }
          $slideEl.transform(transform$$1);
          if (params.slideShadows) {
            // Set shadows
            let shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if (shadowBefore.length === 0) {
              shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
              $slideEl.append(shadowBefore);
            }
            if (shadowAfter.length === 0) {
              shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
              $slideEl.append(shadowAfter);
            }
            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
          }
        }
        $wrapperEl.css({
          '-webkit-transform-origin': `50% 50% -${swiperSize / 2}px`,
          '-moz-transform-origin': `50% 50% -${swiperSize / 2}px`,
          '-ms-transform-origin': `50% 50% -${swiperSize / 2}px`,
          'transform-origin': `50% 50% -${swiperSize / 2}px`,
        });

        if (params.shadow) {
          if (isHorizontal) {
            $cubeShadowEl.transform(`translate3d(0px, ${(swiperWidth / 2) + params.shadowOffset}px, ${-swiperWidth / 2}px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`);
          } else {
            const shadowAngle = Math.abs(wrapperRotate) - (Math.floor(Math.abs(wrapperRotate) / 90) * 90);
            const multiplier = 1.5 - (
              (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2)
              + (Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2)
            );
            const scale1 = params.shadowScale;
            const scale2 = params.shadowScale / multiplier;
            const offset$$1 = params.shadowOffset;
            $cubeShadowEl.transform(`scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${(swiperHeight / 2) + offset$$1}px, ${-swiperHeight / 2 / scale2}px) rotateX(-90deg)`);
          }
        }

        const zFactor = (swiper.browser.isSafari || swiper.browser.isUiWebView) ? (-swiperSize / 2) : 0;
        $wrapperEl
          .transform(`translate3d(0px,0,${zFactor}px) rotateX(${swiper.isHorizontal() ? 0 : wrapperRotate}deg) rotateY(${swiper.isHorizontal() ? -wrapperRotate : 0}deg)`);
      },
      setTransition: function (duration) {
        const swiper = this;
        const { $el, slides } = swiper;
        slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
        if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
          $el.find('.swiper-cube-shadow').transition(duration);
        }
      },
    }
  }
  slideOpts3 = {
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.params = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { slides } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = swiper.slides.eq(i);
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          let tx = -offset$$1;
          if (!swiper.params.virtualTranslate) tx -= swiper.translate;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
          }
          const slideOpacity = swiper.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
            : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
          $slideEl
            .css({
              opacity: slideOpacity,
            })
            .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, $wrapperEl } = swiper;
        slides.transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          slides.transitionEnd(() => {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;
            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      },
    }
  }
  slideOpts4 = {
    initialSlide: JSON.parse(localStorage.getItem('hulu-index')) ? JSON.parse(localStorage.getItem('hulu-index')).index : 0,
    speed: 50
  };

}
export class StorageService {
  /**
   * Set value
   */
  public addData(key: string, data: any) {
    let a = JSON.parse(localStorage.getItem(key))
    if (!a) localStorage.setItem(key, JSON.stringify([data]));
    else {
      a.push(data)
      localStorage.setItem(key, JSON.stringify(a));
    }
  }
  /**
  * Get Value
  */
  public getData(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }
  /**
   * delete Value
   */
  public deleteData(key: string, data: any) {
    let a = JSON.parse(localStorage.getItem(key))
    if (a) {
      for (let i = 0; i < a.length; i++) {
        if (a[i].id == data) {
          a.splice(i, 1);
        }
      }
      localStorage.setItem(key, JSON.stringify(a));
    }
  }
  /**
  * delete Value
  */
  public deleteQuote(key: string, data: any) {
    let a = JSON.parse(localStorage.getItem(key))
    if (a) {
      for (let i = 0; i < a.length; i++) {
        if (a[i].title == data) {
          a.splice(i, 1);
        }
      }
      localStorage.setItem(key, JSON.stringify(a));
    }
  }
  /**
  * update Value
  */
  public updateData(key: string, id: any, data: any) {
    let c = JSON.parse(localStorage.getItem(key))
    for (let i = 0; i < c.length; i++) {
      if (c[i].id == id) {
        c[i] = data
      }
    }
    localStorage.setItem(key, JSON.stringify(c));
  }
  createId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
