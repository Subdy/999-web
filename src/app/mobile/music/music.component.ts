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
      name: 'In The Morning Light',
      path: 'https://firebasestorage.googleapis.com/v0/b/music-e7d09.appspot.com/o/In_The_Morning_Light.mp3?alt=media&token=d025585e-c241-4bb8-8da3-b286d6cfe215',
      sub: 'Bạn chỉ sống một lần thôi, nhưng nếu bạn sống đúng, một lần là đủ rồi'
    },
    {
      id: 2,
      name: 'Night Of The Piano',
      sub: 'Bạn chỉ sống một lần thôi, nhưng nếu bạn sống đúng, một lần là đủ rồi',
      path: 'https://firebasestorage.googleapis.com/v0/b/music-e7d09.appspot.com/o/Night_Of_The_Piano.mp3?alt=media&token=2abadfe3-7019-413c-9c4b-8929d4c503d4',
    },
    {
      id: 3,
      name: 'Allégro',
      sub: 'Bạn chỉ sống một lần thôi, nhưng nếu bạn sống đúng, một lần là đủ rồi',
      path: 'https://firebasestorage.googleapis.com/v0/b/music1-df235.appspot.com/o/All%C3%A9gro%20-%20Emmit%20Fenn.mp3?alt=media&token=3e3ab86c-ef48-4fef-9ff0-d0bd83c06268',
    },
    {
      id: 4,
      name: 'Every Step',
      sub: 'Bạn chỉ sống một lần thôi, nhưng nếu bạn sống đúng, một lần là đủ rồi',
      path: 'https://firebasestorage.googleapis.com/v0/b/music1-df235.appspot.com/o/Every%20Step%20-%20Silent%20Partner.mp3?alt=media&token=7165c1d6-5c90-417e-8c8c-787808e10efb',
    },
    {
      id: 5,
      name: 'Kiss The Rain',
      sub: 'Bạn chỉ sống một lần thôi, nhưng nếu bạn sống đúng, một lần là đủ rồi',
      path: 'https://firebasestorage.googleapis.com/v0/b/music1-df235.appspot.com/o/Kiss%20the%20Rain.mp3?alt=media&token=d2ffd62f-69a5-4d83-b422-f9ebc503c8db',
    },
    {
      id: 6,
      name: 'Like Tears In Rain',
      sub: 'Bạn chỉ sống một lần thôi, nhưng nếu bạn sống đúng, một lần là đủ rồi',
      path: 'https://firebasestorage.googleapis.com/v0/b/music1-df235.appspot.com/o/Like%20Tears%20In%20Rain%20%20Piano%20Diary.mp3?alt=media&token=b301e16b-d152-4e22-99a5-e3239213cf41',
    },
    {
      id: 7,
      name: 'Night Of The Piano 6',
      sub: 'Bạn chỉ sống một lần thôi, nhưng nếu bạn sống đúng, một lần là đủ rồi',
      path: 'https://firebasestorage.googleapis.com/v0/b/music1-df235.appspot.com/o/Night%20Of%20The%20Piano%206%20%20Jin%20Shi%20%20Instrumental.mp3?alt=media&token=8fd73383-98b6-4abb-89b7-e21bf032e49c',
    },
    {
      id: 8,
      name: 'Sad Minuet',
      sub: 'Bạn chỉ sống một lần thôi, nhưng nếu bạn sống đúng, một lần là đủ rồi',
      path: 'https://firebasestorage.googleapis.com/v0/b/music1-df235.appspot.com/o/Sad%20Minuet%20-%20Sir%20Cubworth.mp3?alt=media&token=25524b63-cf45-455a-945e-64b56260db58',
    },
    {
      id: 9,
      name: 'Sweetly My Heart',
      sub: 'Bạn chỉ sống một lần thôi, nhưng nếu bạn sống đúng, một lần là đủ rồi',
      path: 'https://firebasestorage.googleapis.com/v0/b/music1-df235.appspot.com/o/Sweetly%20My%20Heart%20-%20Asher%20Fulero.mp3?alt=media&token=f7f280dd-4ee1-4f62-a4b9-1860ae6aa134',
    },
    {
      id: 10,
      name: 'Beside You Silently',
      sub: 'Bạn chỉ sống một lần thôi, nhưng nếu bạn sống đúng, một lần là đủ rồi',
      path: 'https://firebasestorage.googleapis.com/v0/b/music1-df235.appspot.com/o/%C3%82m%20Th%E1%BA%A7m%20B%C3%AAn%20Em%20%20S%C6%A1n%20T%C3%B9ng%20MTP%20%20PIANO%20COVER%20%20AN%20COONG%20PIANO.mp3?alt=media&token=c644fc92-4efb-4439-aee8-e40a11f5e071',
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
      let b = Math.floor(Math.random() * 9) + 1
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
    this.router.navigate(['/mobile'])
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
