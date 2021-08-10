import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-shared-skeleton',
	template: `
    <div class="tableCart">
                            <div class="table-responsive">
                              <table class="table">
                              <thead>
                                <tr>
                                    <th></th>
                                  <th>Product</th>
                                  <th>Price</th>
                                  <th>Quantity</th>
                                  <th>Subtotal</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="align-middle"><div class="align-items-center">
                                  <ngx-skeleton-loader count="1" appearance="circle" [theme]="{width: '80px', height: '80px', 'border-radius': '10px'}"></ngx-skeleton-loader></div></td>
                                  <td class="align-middle"><ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '100%' }"></ngx-skeleton-loader></td>
                                  <td class="align-middle"><ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '55%' }"></ngx-skeleton-loader></td>
                                  <td class="align-middle"><div class="form-group mb-0 detailBtn"><ngx-skeleton-loader count="1" [theme]="{ height: '27px', 'margin-bottom': '0px', width: '65%', 'border-radius': '10px' }"></ngx-skeleton-loader></div></td>
                                  <td class="align-middle"><ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '65%' }"></ngx-skeleton-loader></td>
                                </tr>
                                <tr>
                                  <td class="align-middle"><div class="align-items-center">
                                  <ngx-skeleton-loader count="1" appearance="circle" [theme]="{width: '80px', height: '80px', 'border-radius': '10px'}"></ngx-skeleton-loader></div></td>
                                  <td class="align-middle"><ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '100%' }"></ngx-skeleton-loader></td>
                                  <td class="align-middle"><ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '55%' }"></ngx-skeleton-loader></td>
                                  <td class="align-middle"><div class="form-group mb-0 detailBtn"><ngx-skeleton-loader count="1" [theme]="{ height: '27px', 'margin-bottom': '0px', width: '65%', 'border-radius': '10px' }"></ngx-skeleton-loader></div></td>
                                  <td class="align-middle"><ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '65%' }"></ngx-skeleton-loader></td>
                                </tr>
                                <tr>
                                  <td class="align-middle"><div class="align-items-center">
                                  <ngx-skeleton-loader count="1" appearance="circle" [theme]="{width: '80px', height: '80px', 'border-radius': '10px'}"></ngx-skeleton-loader></div></td>
                                  <td class="align-middle"><ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '100%' }"></ngx-skeleton-loader></td>
                                  <td class="align-middle"><ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '55%' }"></ngx-skeleton-loader></td>
                                  <td class="align-middle"><div class="form-group mb-0 detailBtn"><ngx-skeleton-loader count="1" [theme]="{ height: '27px', 'margin-bottom': '0px', width: '65%', 'border-radius': '10px' }"></ngx-skeleton-loader></div></td>
                                  <td class="align-middle"><ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '65%' }"></ngx-skeleton-loader></td>
                                </tr>
                                <tr>
                                  <td class="align-middle"><div class="align-items-center">
                                  <ngx-skeleton-loader count="1" appearance="circle" [theme]="{width: '80px', height: '80px', 'border-radius': '10px'}"></ngx-skeleton-loader></div></td>
                                  <td class="align-middle"><ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '100%' }"></ngx-skeleton-loader></td>
                                  <td class="align-middle"><ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '55%' }"></ngx-skeleton-loader></td>
                                  <td class="align-middle"><div class="form-group mb-0 detailBtn"><ngx-skeleton-loader count="1" [theme]="{ height: '27px', 'margin-bottom': '0px', width: '65%', 'border-radius': '10px' }"></ngx-skeleton-loader></div></td>
                                  <td class="align-middle"><ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '65%' }"></ngx-skeleton-loader></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>  
                        </div>	
  `,
	styles: [
	]
})
export class SharedSkeletonComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

}
