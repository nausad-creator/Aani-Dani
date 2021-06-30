import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  template: `
    <a href="#" class="back-to-top"><i class="icofont-simple-up"></i></a>
  `,
  styles: [
  ]
})
export class ScrollToTopComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    jQuery(() => {
      $('.back-to-top').on('click', function() {
        $("html, body").animate({scrollTop: 0}, 500);
      });
    })
  }
}
