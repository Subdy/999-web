import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  table: any = [
    {
      name: '0 đến 50',
      sub: 'Bạn chỉ sống một lần thôi, nhưng nếu bạn sống đúng, một lần là đủ rồi'
    },
    {
      name: '51 đến 100',
      sub: 'Bạn chỉ sống một lần thôi, nhưng nếu bạn sống đúng, một lần là đủ rồi'
    },
    {
      name: '101 đến 150',
      sub: 'Bất kể điều gì xảy đến với cuộc đời tôi, tôi luôn hiểu rằng: "Điều này cũng vậy, rồi sẽ qua'
    },
    {
      name: '151 đến 200',
      sub: 'Hãy làm điều gì đó trong hôm nay để tương lai bạn sẽ cảm ơn vì điều ấy'
    },
    {
      name: '201 đến 250',
      sub: ' Hãy để nụ cười của bạn thay đổi thế giới nhưng đừng để thế giới đổi thay nụ cười của bạn'
    },
    {
      name: '251 đến 300',
      sub: 'Cuộc sống chỉ mang đến cho bạn 10% cơ hội, 90% còn lại là cách mà bạn phản ứng với nó'
    },
    {
      name: '301 đến 350',
      sub: 'Hãy luyện tập như thể bạn chưa bao giờ chiến thắng. Hãy hành động như thể chưa bao giờ bạn thất bại'
    },
    {
      name: '351 đến 400',
      sub: 'Chỉ cần bạn không dừng lại thì việc bạn tiến chậm cũng không là vấn đề'
    },
    {
      name: '401 đến 450',
      sub: 'Thật khó để chờ đợi một điều gì đó bạn biết có thể chẳng bao giờ xảy ra, nhưng còn khó hơn để từ bỏ khi đó là mọi điều mà bạn muốn'
    },
    {
      name: '451 đến 500',
      sub: 'Sự trả thù tốt nhất là một thành công vĩ đại'
    },
    {
      name: '501 đến 550',
      sub: 'Nghị lực và kiên trì sẽ chiến thắng tât cả!'
    },
    {
      name: '551 đến 600',
      sub: 'Không có gì trên thế giới này có thể thay thế kiên trì được'
    },
    {
      name: '601 đến 650',
      sub: 'Kiên nhẫn, kiên trì và những giọt mồ hôi là sự kết hợp phi thường và bất bại để làm nên thành công!'
    },
    {
      name: '651 đến 700',
      sub: 'Không có bí mật nào tạo nên thành công. Đó chỉ là kết quả của sự chuẩn bị, làm việc hết sức mình và rút ra kinh nghiệm từ sự thất bại!'
    },
    {
      name: '701 đến 750',
      sub: 'Bạn có thể gặp nhiều thất bại nhưng không có nghĩa bạn sẽ bị nó đánh gục.'
    },
    {
      name: '751 đến 800',
      sub: 'Tham vọng là con đường dẫn đến thành công còn kiên trì là động cơ giúp bạn đi trên con đường đó!'
    },
    {
      name: '801 đến 850',
      sub: 'Nếu bạn đi xuống địa ngục, hãy cứ tiếp tục bước đi!'
    },
    {
      name: '851 đến 900',
      sub: 'Tin rằng bạn có thể làm một điều gì đó đồng nghĩa với việc bạn đã đi được nửa đường đến đó'
    },
    {
      name: '901 đến 950',
      sub: 'Những nhà vô địch sẽ tiếp tục chơi cho đến khi họ làm được!'
    }, {
      name: '951 đến 999',
      sub: 'Nếu bạn không thể bay, vậy thì hãy chạy'
    }
  ]
  show: any[] = []
  constructor(
    private router: Router,
    private naCtrv: NavController,
    public service: FirebaseService) { }

  ngOnInit() {
    this.show = this.table.map((item) => {
      let b = Math.floor(Math.random() * 19) + 1
      let img = 'assets/left/' + b + '.svg'
      return { ...item, img: img }
    })
  }
  gotoLetters(index) {
    this.router.navigate(['/mobile/table/letter'], { state: index })
  }
  goBack() {
    this.router.navigate(['mobile'])
  }

}
