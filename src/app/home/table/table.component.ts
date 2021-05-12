import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/service/firebase.service';
import { AdbooksComponent } from '../adbooks/adbooks.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  table: any = [
    {
      index: 0,
      name: '0 đến 50',
      sub: 'Bạn chỉ sống một lần thôi, nhưng nếu bạn sống đúng, một lần là đủ rồi'
    },
    {
      index: 1,
      name: '51 đến 100',
      sub: 'Bạn chỉ sống một lần thôi, nhưng nếu bạn sống đúng, một lần là đủ rồi'
    },
    {
      index: 2,
      name: '101 đến 150',
      sub: 'Bất kể điều gì xảy đến với cuộc đời tôi, tôi luôn hiểu rằng: "Điều này cũng vậy, rồi sẽ qua'
    },
    {
      index: 3,
      name: '151 đến 200',
      sub: 'Hãy làm điều gì đó trong hôm nay để tương lai bạn sẽ cảm ơn vì điều ấy'
    },
    {
      index: 4,
      name: '201 đến 250',
      sub: ' Hãy để nụ cười của bạn thay đổi thế giới nhưng đừng để thế giới đổi thay nụ cười của bạn'
    },
    {
      index: 5,
      name: '251 đến 300',
      sub: 'Cuộc sống chỉ mang đến cho bạn 10% cơ hội, 90% còn lại là cách mà bạn phản ứng với nó'
    },
    {
      index: 6,
      name: '301 đến 350',
      sub: 'Hãy luyện tập như thể bạn chưa bao giờ chiến thắng. Hãy hành động như thể chưa bao giờ bạn thất bại'
    },
    {
      index: 7,
      name: '351 đến 400',
      sub: 'Chỉ cần bạn không dừng lại thì việc bạn tiến chậm cũng không là vấn đề'
    },
    {
      index: 8,
      name: '401 đến 450',
      sub: 'Khó khăn nào rồi cũng qua. Cũng giống như sau cơn mưa, trời lại sáng'
    },
    {
      index: 9,
      name: '451 đến 500',
      sub: 'Sự trả thù tốt nhất là một thành công vĩ đại'
    },
    {
      index: 10,
      name: '501 đến 550',
      sub: 'Nghị lực và kiên trì sẽ chiến thắng tât cả!'
    },
    {
      index: 11,
      name: '551 đến 600',
      sub: 'Không có gì trên thế giới này có thể thay thế kiên trì được'
    },
    {
      index: 12,
      name: '601 đến 650',
      sub: 'Kiên nhẫn, kiên trì và những giọt mồ hôi là sự kết hợp phi thường và bất bại để làm nên thành công!'
    },
    {
      index: 13,
      name: '651 đến 700',
      sub: ' Không có gì là không thể với một người luôn biết cố gắng'
    },
    {
      index: 14,
      name: '701 đến 750',
      sub: 'Bạn có thể gặp nhiều thất bại nhưng không có nghĩa bạn sẽ bị nó đánh gục.'
    },
    {
      index: 15,
      name: '751 đến 800',
      sub: 'Tham vọng là con đường dẫn đến thành công còn kiên trì là động cơ giúp bạn đi trên con đường đó!'
    },
    {
      index: 16,
      name: '801 đến 850',
      sub: 'Nếu bạn đi xuống địa ngục, hãy cứ tiếp tục bước đi!'
    },
    {
      index: 17,
      name: '851 đến 900',
      sub: 'Tin rằng bạn có thể làm một điều gì đó đồng nghĩa với việc bạn đã đi được nửa đường đến đó'
    },
    {
      index: 18,
      name: '901 đến 950',
      sub: 'Những nhà vô địch sẽ tiếp tục chơi cho đến khi họ làm được!'
    },
    {
      index: 19,
      name: '951 đến 999',
      sub: 'Nếu bạn không thể bay, vậy thì hãy chạy'
    }
  ]
  show: any[] = []
  constructor(
    private router: Router,
    public service: FirebaseService) { }

  ngOnInit() {
    this.show = this.table.map((item) => {
      let b = Math.floor(Math.random() * 19) + 1
      let img = 'assets/left/' + b + '.svg'
      return { ...item, img: img }
    })
  }
  gotoLetters(item) {
    this.router.navigate(['/letter'], {
      state: item.index
    })
  }

}
