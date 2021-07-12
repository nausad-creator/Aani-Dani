import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { terms_conditions, State } from 'src/app/reducers';

@Component({
  selector: 'app-terms',
  template: `
    <section id="about" class="about pt-3">
      <div class="container">
        <div class="brandcamp"><a href="index.html">Home  &gt;</a> <span> Terms of Service</span> </div>

        <div class="card mt-3 p-3">
          <div class="row">          
                  <div *ngIf="terms_conditions$ | async as content">
                        <div [innerHTML]="content.cmspageContents | safeHtml">
                     </div>
                     </div>
                     <div *ngIf="(terms_conditions$ | async) === null">
                            <div style="margin-top: 30px; min-height: 500px;">
                                <p class="text-center">Loading...</p>
                            </div>
                     </div>
          </div>
        </div>

      </div>
    </section><!-- End About Section -->
  `,
  styles: [
  ]
})
export class TermsComponent implements OnInit {
  terms_conditions$: Observable<{
    cmspageName: string;
    cmspageContents: string;
  }> = this.store.select(terms_conditions);
  constructor(private store: Store<State>,) { }
  ngOnInit(): void {
  }
}
