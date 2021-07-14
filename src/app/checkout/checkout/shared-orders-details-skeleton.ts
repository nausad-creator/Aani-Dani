import { Component } from '@angular/core';

@Component({
    selector: 'app-shared-skeleton-orders-details',
    template: `
    <div class="paymentDetails">
                            <h5><ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '25%' }"></ngx-skeleton-loader></h5>
                            <div class="tableCart">
                                <div class="table-responsive">
                                  <table class="table">
                                  <thead>
                                    <tr>
                                      <th><ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '85%' }"></ngx-skeleton-loader></th>
                                      <th class="text-right"><ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '35%' }"></ngx-skeleton-loader></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td class="align-middle"><ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '75%' }"></ngx-skeleton-loader> <p class="mb-0"><ngx-skeleton-loader count="1" [theme]="{ height: '13px', 'margin-bottom': '0px', width: '35%' }"></ngx-skeleton-loader></p></td>
                                      <td class="align-middle text-right"><ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '35%' }"></ngx-skeleton-loader></td>
                                    </tr>
                                    <tr>
                                      <td class="align-middle"><ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px' }"></ngx-skeleton-loader> <p class="mb-0"><ngx-skeleton-loader count="1" [theme]="{ height: '13px', 'margin-bottom': '0px', width: '35%' }"></ngx-skeleton-loader></p></td>
                                      <td class="align-middle text-right"><ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '35%' }"></ngx-skeleton-loader></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>  
                            </div>	
                            <hr class="mt-0">

                            <div class="coponCode d-flex">
                            <div class="form-group mb-0 w-100">
                                <ngx-skeleton-loader count="1" [theme]="{ height: '40px', 'margin-bottom': '0px', width: '55%', 'border-radius': '5px' }"></ngx-skeleton-loader>
                                <ngx-skeleton-loader count="1" [theme]="{ height: '40px', 'margin-bottom': '0px', 'margin-left': '15px', width: '40%', 'border-radius': '8px' }"></ngx-skeleton-loader>
                              </div>
                              <div class="pl-3">
                              </div>
                            </div>	

                            <div class="form-group mb-0 w-100 mt-3">
                            <ngx-skeleton-loader count="1" [theme]="{ height: '45px', 'margin-bottom': '0px', 'border-radius': '10px' }"></ngx-skeleton-loader>
                          </div>

                          <div class="priceDiscri pt-3">
                                <div class="pb-2">
                                    <div class="totalPr">
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '13px', 'margin-bottom': '0px', width: '55%' }"></ngx-skeleton-loader>
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '12px', 'margin-bottom': '0px', 'margin-left': '20px', width: '15%' }"></ngx-skeleton-loader>
                                    </div>	
                                </div>
                                <div class="totalPr">
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '30%' }"></ngx-skeleton-loader>
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '13px', 'margin-bottom': '0px', 'margin-left': '20px', width: '20%' }"></ngx-skeleton-loader>
                                    </div>	
                                    <div class="totalPr">
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '55%' }"></ngx-skeleton-loader>
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '13px', 'margin-bottom': '0px', 'margin-left': '20px', width: '25%' }"></ngx-skeleton-loader>
                                    </div>	
                                    <div class="totalPr">
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '13px', 'margin-bottom': '0px', width: '50%' }"></ngx-skeleton-loader>
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '12px', 'margin-bottom': '0px', 'margin-left': '20px', width: '25%' }"></ngx-skeleton-loader>
                                    </div>
                                    <div class="totalPr">
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '12px', 'margin-bottom': '0px', width: '40%' }"></ngx-skeleton-loader>
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '13px', 'margin-bottom': '0px', 'margin-left': '20px', width: '25%' }"></ngx-skeleton-loader>
                                    </div>
                                    <div class="totalPr">
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '12px', 'margin-bottom': '0px', width: '60%' }"></ngx-skeleton-loader>
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '13px', 'margin-bottom': '0px', 'margin-left': '20px', width: '25%' }"></ngx-skeleton-loader>
                                    </div>
                            </div>

                            <br>
                            <div class="row">
                                <div class="col-6">
                                <ngx-skeleton-loader count="1" [theme]="{ height: '37px', 'margin-bottom': '0px', 'border-radius': '10px' }"></ngx-skeleton-loader>
                                </div>
                                <div class="col-6">
                                <ngx-skeleton-loader count="1" [theme]="{ height: '37px', 'margin-bottom': '0px', 'border-radius': '10px' }"></ngx-skeleton-loader>
                                </div>		
                            </div>
                        </div>
  `,
    styles: [
    ]
})
export class SharedSkeletonDetailsComponent {
}
