import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-details',
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
                                  <td class="align-middle"><div class="d-flex align-items-center"><a href="#" class="mr-2"><i class="icofont-close-circled"></i></a> <img src="assets/images/product-1.jpg" alt="product" width="80"></div></td>
                                  <td class="align-middle">Graduation Cake - Chocolate</td>
                                  <td class="align-middle">180.00 SR</td>
                                  <td class="align-middle"><div class="form-group mb-0 detailBtn"><input type="number" class="form-control" value="1" min="1"></div></td>
                                  <td class="align-middle">180.00 SR</td>
                                </tr>
                                <tr>
                                  <td class="align-middle"><div class="d-flex align-items-center"><a href="#" class="mr-2"><i class="icofont-close-circled"></i></a> <img src="assets/images/product-1.jpg" alt="product" width="80"></div></td>
                                  <td class="align-middle">Graduation Cake - Chocolate</td>
                                  <td class="align-middle">180.00 SR</td>
                                  <td class="align-middle"><div class="form-group mb-0 detailBtn"><input type="number" class="form-control" value="1" min="1"></div></td>
                                  <td class="align-middle">180.00 SR</td>
                                </tr>
                                <tr>
                                  <td class="align-middle"><div class="d-flex align-items-center"><a href="#" class="mr-2"><i class="icofont-close-circled"></i></a> <img src="assets/images/product-1.jpg" alt="product" width="80"></div></td>
                                  <td class="align-middle">Graduation Cake - Chocolate</td>
                                  <td class="align-middle">180.00 SR</td>
                                  <td class="align-middle"><div class="form-group mb-0 detailBtn"><input type="number" class="form-control" value="1" min="1"></div></td>
                                  <td class="align-middle">180.00 SR</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>  
                        </div>	
  `,
  styles: [
  ]
})
export class SharedDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
