import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { about_us, State } from 'src/app/reducers';

@Component({
  selector: 'app-about-us',
  template: `
    <!-- ======= About Section ======= -->
    <section id="about" class="about pt-3">
      <div class="container">
        <div class="brandcamp"><a href="index.html">Home  &gt;</a> <span> About us</span> </div>
        <div class="card mt-3 p-3">
          <div class="row">          
                     <div *ngIf="about_us$ | async as content">
                        <div [innerHTML]="content.cmspageContents | safeHtml"></div>
                     <div *ngIf="(about_us$ | async) === null">
                            <div style="margin-top: 30px; min-height: 500px;">
                                <p class="text-center">Loading...</p>
                            </div>
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
export class AboutUsComponent implements OnInit {
  about_us$: Observable<{
    cmspageName: string;
    cmspageContents: string;
  }> = this.store.select(about_us);
  constructor(private store: Store<State>,) { }
  ngOnInit(): void {
  }
}
