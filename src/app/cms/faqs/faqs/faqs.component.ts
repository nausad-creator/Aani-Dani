import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { faqs, State } from 'src/app/reducers';

@Component({
  selector: 'app-faqs',
  template: `
    <section id="about" class="about pt-3">
      <div class="container">
        <div class="brandcamp"><a href="index.html">Home  &gt;</a> <span> FAQs</span> </div>
        <div class="card mt-3 p-3">
            <h5>We’re here to help you with your issues.</h5> <br>
            <div id="accordion" class="pt-3" *ngIf="faqs$ | async as faqs">
              <div class="accrodation_list" *ngFor="let faq of faqs; index as i">
                <div id="headingOne">
                  <h5 class="mb-0">
                  <button class="btn btn-link collapsed" data-toggle="collapse" [attr.data-target]="'#test' + i" aria-expanded="false"> {{faq?.faqQuestion}} </button>                        
                  </h5>
                </div>        
                <div id="test{{i}}" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                  <div class="card-body p-3" [innerHTML]="faq?.faqAnswer | safeHtml">
                  </div>
                </div>
              </div>          
            </div>
        </div>
      </div>
    </section>
  `,
  styles: [
  ]
})
export class FaqsComponent implements OnInit {
  faqs$: Observable<{
    faqID: string;
    faqQuestion: string;
    faqAnswer: string;
  }[]> = this.store.select(faqs);
  constructor(private store: Store<State>,) { }
  ngOnInit(): void {
  }
}
