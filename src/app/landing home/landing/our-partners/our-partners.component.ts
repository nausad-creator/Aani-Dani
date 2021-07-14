import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-our-partners',
  template: `
    <section class="LowestPrice-section bg-white p-3">
    <div class="container">
        <div class="card-header bg-white">
          <div class="section-title row pb-0">
            <div class="col-md-6">		
                <h2 class="mb-0">Our Partners</h2>
            </div>
          </div>
      </div>   

      <div class="category_slider">
          <div class="owl-carousel partner-carousel">
          <a class="partnersItem text-center" target="_blank" href="https://www.mobily.com.sa/wps/portal/web/personal/mobile/neqaty/overview/neqaty-partners/neqaty-partners/">
                    <img src="assets/images/partners/Mobily.jpg" alt="partners"> 
                    <h5>MOBILY</h5>
            </a>
            <a class="partnersItem text-center" target="_blank" href="https://www.saib.com.sa/en/">
                    <img src="assets/images/partners/SAIB.jpg" alt="partners"> 
                    <h5>SAIB</h5>
            </a>

            <a class="partnersItem text-center" target="_blank" href="https://www.sabb.com/en/">
                    <img src="assets/images/partners/SABB.jpg" alt="partners"> 
                    <h5>SABB</h5>
            </a>
            <a class="partnersItem text-center" target="_blank" href="https://www.riyadbank.com/en/">
                    <img src="assets/images/partners/RiyadBank.jpg" alt="partners"> 
                    <h5>Riyad Bank</h5>
            </a>
            <a class="partnersItem text-center" target="_blank" href="https://www.bankaljazira.com/en-us/Personal-Banking/">
                    <img src="assets/images/partners/AljaziraBank.jpg" alt="partners"> 
                    <h5>Aljazira Bank</h5>
            </a>
            <a class="partnersItem text-center" target="_blank" href="https://www.alrajhibank.com.sa/personal/">
                    <img src="assets/images/partners/AlRajhiBank.jpg" alt="partners"> 
                    <h5>Al Rajhi Bank</h5>
            </a>
          </div>
      </div>
    </div>
  </section>	
  `,
  styles: [
  ]
})
export class OurPartnersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.jquery();
  }
  jquery = () => {
    jQuery(() => {
      ($(".partner-carousel") as any).owlCarousel({
        //autoplay: true,
        dots: true,
        loop: false,
        nav:true,
        margin:10,
        navText: ["<i class='icofont-rounded-left'></i>","<i class='icofont-rounded-right'></i>"],
        responsive: {
          0: {
            items: 2
          },
          768: {
            items: 3
          },
          900: {
            items: 4
          },
          1000: {
            items: 5
          }
        }
      });
    })}
}
