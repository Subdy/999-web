import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Howl } from 'howler';
import { IonRange } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { FirebaseService } from 'src/app/service/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {

  @ViewChild('range', { static: false }) range: IonRange;
  img: any = ''
  playlist: any = [
    {
      id: 1,
      name: 'Allégro - Emmit Fenn',
      path: 'https://firebasestorage.googleapis.com/v0/b/music1-df235.appspot.com/o/All%C3%A9gro%20-%20Emmit%20Fenn.mp3?alt=media&token=15bd2731-8444-4616-b4bf-b90a9775146f',
      sub: 'Hãy dừng để ý tới những khó khăn của bạn mà hãy biết ơn những gì bạn có'
    },
    {
      id: 2,
      name: 'Before I Go - RKVC',
      sub: 'Sẽ không bao giờ có bế tắc thật sự khi trong bạn còn niềm tin. Chỉ cần có niềm tin, bạn sẽ có hi vọng, sẽ tìm thấy con đường để bước tiếp',
      path: 'https://firebasestorage.googleapis.com/v0/b/music1-df235.appspot.com/o/Before%20I%20Go%20-%20RKVC.mp3?alt=media&token=5a1fb76e-8a50-4480-ac2a-7caf8f4bc27b',
    },
    {
      id: 3,
      name: 'Dulcinea - Steve Adams',
      sub: 'Nếu bạn không thích điều gì đó, hãy thay đổi nó. Nếu bạn không thể thay đổi nó, hãy thay đổi cách suy nghĩ của bạn về nó',
      path: 'https://firebasestorage.googleapis.com/v0/b/music1-df235.appspot.com/o/Dulcinea%20-%20Steve%20Adams.mp3?alt=media&token=4b576005-96df-45cb-9bbb-a53840373ae5',
    },
    {
      id: 4,
      name: 'Everything Is Fine - Sir Cubworth',
      sub: 'Dù không muốn mình lớn lên nhưng bạn vẫn phải trưởng thành. Vì vậy hãy mạnh mẽ mà trưởng thành',
      path: 'https://firebasestorage.googleapis.com/v0/b/music1-df235.appspot.com/o/Everything%20Is%20Fine%20-%20Sir%20Cubworth.mp3?alt=media&token=702693df-3998-4727-8c76-3ceb5c7cff45',
    },
    {
      id: 5,
      name: 'Forever Yours - Wayne Jones',
      sub: 'Cuộc sống luôn có nhiều việc xảy ra không như ý, chúng ta không thể né tránh, điều duy nhất bạn có thể làm là thay đổi góc nhìn về nó',
      path: 'https://firebasestorage.googleapis.com/v0/b/music1-df235.appspot.com/o/Forever%20Yours%20-%20Wayne%20Jones.mp3?alt=media&token=9fc97cc0-d8d5-4c94-bc6c-42d623d58f82',
    },
    {
      id: 6,
      name: 'Highway One - Steve Adams',
      sub: 'Không bao giờ bỏ cuộc. Cho dù bạn đang ở trong hoàn cảnh nào đi chăng nữa, hãy đối diện với sự thật',
      path: 'https://firebasestorage.googleapis.com/v0/b/music1-df235.appspot.com/o/Highway%20One%20-%20Steve%20Adams.mp3?alt=media&token=0c7b616a-cb84-4104-8b41-2b5329eeb8ff',
    },
    {
      id: 7,
      name: 'Hopeful Freedom - Asher Fulero',
      sub: 'Vinh quang không phải là không bao giờ thất bại, mà là cách chúng ta đứng dậy sau mỗi lần gục ngã',
      path: 'https://firebasestorage.googleapis.com/v0/b/music1-df235.appspot.com/o/Hopeful%20Freedom%20-%20Asher%20Fulero.mp3?alt=media&token=a2040f87-c38d-48a9-9af6-44bf50d4bd85',
    },
    {
      id: 8,
      name: 'Large Smile Mood - Nico Staf',
      sub: 'Khi mọi thứ dường như chống lại bạn. Hãy nhớ rằng máy bay chỉ có thể cất cánh khi chống lại gió, không phải thuận theo nó',
      path: 'https://firebasestorage.googleapis.com/v0/b/music1-df235.appspot.com/o/Large%20Smile%20Mood%20-%20Nico%20Staf.mp3?alt=media&token=def3c64b-62c7-4939-9984-2b21e69b392e',
    },
    {
      id: 9,
      name: "Let's Do This! - Nat Keefe & Hot Buttered Rum",
      sub: 'Lạc quan là niềm tin dẫn tới thành tựu. Bạn chẳng thể làm được điều gì mà thiếu đi hy vọng và sự tự tin',
      path: "https://firebasestorage.googleapis.com/v0/b/music1-df235.appspot.com/o/Let's%20Do%20This!%20-%20Nat%20Keefe%20%26%20Hot%20Buttered%20Rum.mp3?alt=media&token=56bed649-a189-493b-a923-b114400a7acd",
    },
    {
      id: 10,
      name: 'New Space Ship - Trevor Garrod',
      sub: 'Hãy để cuộc sống này trôi qua một cách tự nhiên, đừng vì sự cố chấp của  bản thân và níu kéo một người không thuộc về mình',
      path: 'https://firebasestorage.googleapis.com/v0/b/music1-df235.appspot.com/o/New%20Space%20Ship%20-%20Trevor%20Garrod.mp3?alt=media&token=b914f67d-d35b-4e01-8fd5-3f7c8663a19e',
    },
    {
      id: 11,
      name: 'Parisian Cafe - Aaron Kenny',
      sub: 'Bất kỳ ai cố gắng “dìm” bạn xuống thì họ đều thua kém bạn. Hãy tin vào bản thân mình',
      path: 'https://firebasestorage.googleapis.com/v0/b/music1-df235.appspot.com/o/Parisian%20Cafe%20-%20Aaron%20Kenny.mp3?alt=media&token=a6c25065-7162-4f02-9d14-28611c246a2c',
    },
    {
      id: 12,
      name: 'Simple Gifts - Cooper Cannell',
      sub: 'Cuộc đời là những chuỗi ngày dài lê thê, nhưng dài lê thê đâu có nghĩa là cứ phải buồn mãi đâu…',
      path: 'https://firebasestorage.googleapis.com/v0/b/music1-df235.appspot.com/o/Simple%20Gifts%20-%20Cooper%20Cannell.mp3?alt=media&token=f1d6fbea-3e52-4e5d-9176-b129eb37e759',
    },
    {
      id: 13,
      name: 'Sweetly My Heart - Asher Fulero',
      sub: 'Cuộc sống hiện đại như một cỗ máy cuốn ta vào một guồng quay. Công nghệ càng phát triển, việc kết nối với nhau càng dễ dàng thì con người trở nên cô đơn hơn',
      path: 'https://firebasestorage.googleapis.com/v0/b/music1-df235.appspot.com/o/Sweetly%20My%20Heart%20-%20Asher%20Fulero.mp3?alt=media&token=d1a13a96-b6fe-445d-94aa-1ad283fe1d00',
    },
    {
      id: 14,
      name: "View of the Valley - Trevor Garrod",
      sub: 'Đôi khi chỉ cần một sự quan tâm rất nhỏ từ một ai đó, dù cho mọi việc tồi tệ đến thế nào cũng sẽ ổn thôi!',
      path: 'https://firebasestorage.googleapis.com/v0/b/music1-df235.appspot.com/o/View%20of%20the%20Valley%20-%20Trevor%20Garrod.mp3?alt=media&token=9d3e0608-7111-4e00-965f-b4b8082cacde',
    },
    {
      id: 15,
      name: 'Willy’s Sunny Side - The Whole Other',
      sub: 'Đủ nắng hoa sẽ nở. Đủ chong chóng gió sẽ quay. Đủ yêu thương hạnh phúc sẽ đong đầy',
      path: 'https://firebasestorage.googleapis.com/v0/b/music1-df235.appspot.com/o/Willy%E2%80%99s%20Sunny%20Side%20-%20The%20Whole%20Other.mp3?alt=media&token=50a900f5-91a9-4189-9a8f-26c380821b61',
    },
  ];
  activeTrack: any = null
  active: any
  player: Howl;
  isPlaying = false;
  spiner: boolean = false;
  progress = 0;
  show: any
  constructor(private navCtrl: NavController,
    public firebase: FirebaseService,
    private router: Router,) { }

  ngOnInit() {
    this.show = this.playlist.map((item) => {
      let b = Math.floor(Math.random() * 19) + 1
      let img = 'assets/left/' + b + '.svg'
      return { ...item, img: img }
    })
  }

  private backButton: any
  ionViewDidEnter() {
    this.backButton = this.firebase.activeAndroidBackButton('home/music', this.goBack)
  }
  ionViewWillLeave() {
    this.firebase.dismissAndroidBackButton('home/music', this.backButton)
  }

  goBack = () => {
    this.router.navigate(['/home'])
  }
  start(track: any) {
    this.active = track.id;
    this.activeTrack = track;
    this.spiner = true
    if (this.player) {
      this.player.stop();
    }
    this.player = new Howl({
      src: [track.path],
      html5: true,
      onplay: () => {
        this.spiner = false
        this.isPlaying = true;
        this.updateProgress();
      },
      onend: () => {
        this.next()
      }
    });
    this.player.play()
  }

  togglePlayer(pause) {
    this.isPlaying = !pause;
    if (pause) {
      this.player.pause();
    } else {
      this.player.play();
    }
  }

  next() {
    const index = this.playlist.findIndex(item => item.id == this.activeTrack.id);
    if (index !== this.playlist.length - 1) {
      this.start(this.playlist[index + 1]);
    } else {
      this.start(this.playlist[0]);
    }
  }

  prev() {
    const index = this.playlist.indexOf(this.activeTrack);
    if (index > 0) {
      this.start(this.playlist[index - 1]);
    } else {
      this.start(this.playlist[this.playlist.length - 1]);
    }
  }

  seek() {
    const newValue = + this.range.value;
    const duration = this.player.duration();
    this.player.seek(duration * (newValue / 100));
  }

  updateProgress() {
    const seek = this.player.seek();
    this.progress = (seek / this.player.duration()) * 100 || 0;
    setTimeout(() => {
      this.updateProgress();
    }, 1000);
  }

}
