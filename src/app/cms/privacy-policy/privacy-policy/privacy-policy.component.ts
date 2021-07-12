import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { privacy_policy, State } from 'src/app/reducers';

@Component({
  selector: 'app-privacy-policy',
  template: `
  <section id="about" class="about pt-3">
      <div class="container">
        <div class="brandcamp"><a href="index.html">Home  &gt;</a> <span> Privacy policy</span> </div>

        <div class="card mt-3 p-3">
          <div class="row">          
                  <div *ngIf="privacy_policy$ | async as content">
                        <div [innerHTML]="content.cmspageContents | safeHtml">
                     </div>
                     </div>
                     <div *ngIf="(privacy_policy$ | async) === null">
                            <div style="margin-top: 30px; min-height: 500px;">
                                <p class="text-center">Loading...</p>
                            </div>
                     </div>
          </div>
        </div>

      </div>
    </section><!-- End About Section -->
  `,
  styles: []
})
export class PrivacyPolicyComponent implements OnInit {
  privacy_policy$: Observable<{
    cmspageName: string;
    cmspageContents: string;
  }> = this.store.select(privacy_policy);
  constructor(private store: Store<State>,) { }
  ngOnInit(): void {
  }
}
