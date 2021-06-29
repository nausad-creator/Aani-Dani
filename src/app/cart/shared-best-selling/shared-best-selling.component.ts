import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-best-selling',
  template: `
     <section class="pb-3 pt-4">
        <div class="card pt-3">
            <div class="container">
                <div class="category-section">
                    <div class="card-header bg-white">
                      <div class="section-title row pb-0">
                        <div class="col-md-8 p-0">		
                            <h5 class="mb-0"><b>Bestselling Items</b></h5>
                        </div>				  	
                      </div>
                  </div>  

                  <div class="category_slider">
                      <div class="owl-carousel product-carousel">
                        <div class="slider_itemBox text-center">
                                <img class="w-auto m-auto" src="assets/images/product-1.jpg" alt="Mamro Big"> 
                                <div class="content_textContent">
                                    <h5 class="text-dark mb-0">Blueberry Buttercream</h5>
                                    <div class="form-group select_unit mb-2 mt-2">
                                        <select class="form-control">
                                            <option>200 gm</option>
                                            <option>500 gm</option>
                                            <option>1 Kg</option>
                                            <option>2 Kg</option>
                                            <option>5 Kg</option>	
                                        </select>	
                                    </div>
                                    <div class="d-flex align-items-center justify-content-center">
                                        <div class="price_text">202.62 SR</div>
                                        <div class="mrp_text">222.62 SR</div>
                                    </div>
                                    <div class="productInfo">
                                        <div class="ratings">
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star-half-alt"></i>
                                            <i class="far fa-star"></i>
                                        </div>
                                        <p class="salinginfo">110 people bought this</p>
                                    </div>		
                                    
                                    <div class="cartbox">
                                      <a href="javascript:voil(0)" class="addcart-btn shopingcart-tbtn btn" id="addcart-1"><i class="icofont-shopping-cart"></i> Add to Cart</a>
                                      
                                  </div>	
                                </div>	
                        </div>
                        <div class="slider_itemBox text-center">
                                <img class="w-auto m-auto" src="assets/images/product-2.jpg" alt="Turkish Apricots"> 
                                <div class="content_textContent">
                                    <h5 class="text-dark mb-0">Chocolate Cupcake</h5>
                                    <div class="form-group select_unit mb-2 mt-2">
                                        <select class="form-control">
                                            <option>200 gm</option>
                                            <option>500 gm</option>
                                            <option>1 Kg</option>
                                            <option>2 Kg</option>
                                            <option>5 Kg</option>	
                                        </select>	
                                    </div>
                                    <div class="d-flex align-items-center justify-content-center">
                                        <div class="price_text">202.62 SR</div>
                                        <div class="mrp_text">222.62 SR</div>					  		
                                    </div>
                                    <div class="productInfo">
                                        <div class="ratings">
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star-half-alt"></i>
                                            <i class="far fa-star"></i>
                                        </div>
                                        <p class="salinginfo">110 people bought this</p>
                                    </div>		
                                    
                                    <div class="cartbox">
                                      <a href="javascript:voil(0)" class="addcart-btn shopingcart-tbtn btn" id="addcart-1"><i class="icofont-shopping-cart"></i> Add to Cart </a>
                                  </div>	
                                </div>
                        </div>
                        <div class="slider_itemBox text-center">
                                <img class="w-auto m-auto" src="assets/images/product-3.jpg" alt="Maharaja Halwa"> 
                                <div class="content_textContent">
                                    <h5 class="text-dark mb-0">Graduation Cake - Chocolate</h5>
                                    <div class="form-group select_unit mb-2 mt-2">
                                        <select class="form-control">
                                            <option>200 gm</option>
                                            <option>500 gm</option>
                                            <option>1 Kg</option>
                                            <option>2 Kg</option>
                                            <option>5 Kg</option>	
                                        </select>	
                                    </div>
                                    <div class="d-flex align-items-center justify-content-center">
                                        <div class="price_text">202.62 SR</div>
                                        <div class="mrp_text">222.62 SR</div>					  		
                                    </div>
                                    <div class="productInfo">
                                        <div class="ratings">
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star-half-alt"></i>
                                            <i class="far fa-star"></i>
                                        </div>
                                        <p class="salinginfo">110 people bought this</p>
                                    </div>		
                                    
                                    <div class="cartbox">
                                      <a href="javascript:voil(0)" class="addcart-btn shopingcart-tbtn btn" id="addcart-1"><i class="icofont-shopping-cart"></i> Add to Cart</a>
                                  </div>	
                                </div>
                        </div>	
                        <div class="slider_itemBox">
                        <img src="assets/images/product-4.jpg" alt="Badam Halwa"> 
                        <div class="content_textContent">
                            <a href="product-details.html"><h5 class="text-dark mb-0">Eggnog Cupcakes</h5></a>
                            <div class="form-group select_unit mb-2 mt-2">
                                <select class="form-control">
                                    <option>200 gm</option>
                                    <option>500 gm</option>
                                    <option>1 Kg</option>
                                    <option>2 Kg</option>
                                    <option>5 Kg</option>	
                                </select>	
                            </div>
                            <div class="d-flex align-items-center justify-content-center">
                                <div class="price_text">202.62 SR</div>
                                <div class="mrp_text">222.62 SR</div>					  		
                            </div>
                            <div class="productInfo">
                                <div class="ratings">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star-half-alt"></i>
                                    <i class="far fa-star"></i>
                                </div>
                                <p class="salinginfo">110 people bought this</p>
                            </div>		
                            
                            <div class="cartbox">
                              <a href="javascript:voil(0)" class="addcart-btn shopingcart-tbtn btn" id="addcart-1"><i class="icofont-shopping-cart"></i> Add to Cart</a>
                          </div>	
                        </div>
                        </div>
                        <div class="slider_itemBox">
                                <img src="assets/images/product-5.jpg" alt="Fig"> 
                                <div class="content_textContent">
                                    <a href="product-details.html"><h5 class="text-dark mb-0">Strawberry Cheesecake</h5></a>
                                    <div class="form-group select_unit mb-2 mt-2">
                                        <select class="form-control">
                                            <option>200 gm</option>
                                            <option>500 gm</option>
                                            <option>1 Kg</option>
                                            <option>2 Kg</option>
                                            <option>5 Kg</option>	
                                        </select>	
                                    </div>
                                    <div class="d-flex align-items-center justify-content-center">
                                        <div class="price_text">202.62 SR</div>
                                        <div class="mrp_text">222.62 SR</div>					  		
                                    </div>
                                    <div class="productInfo">
                                        <div class="ratings">
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star-half-alt"></i>
                                            <i class="far fa-star"></i>
                                        </div>
                                        <p class="salinginfo">110 people bought this</p>
                                    </div>		
                                    
                                    <div class="cartbox">
                                      <a href="javascript:voil(0)" class="addcart-btn shopingcart-tbtn btn" id="addcart-1"><i class="icofont-shopping-cart"></i> Add to Cart</a>
                                  </div>	
                                </div>
                        </div>
                        <div class="slider_itemBox">
                                <img src="assets/images/product-1.jpg" alt="Grocery"> 
                                <div class="content_textContent">
                                    <a href="product-details.html"><h5 class="text-dark mb-0">Blueberry Buttercream</h5></a>
                                    <div class="form-group select_unit mb-2 mt-2">
                                        <select class="form-control">
                                            <option>200 gm</option>
                                            <option>500 gm</option>
                                            <option>1 Kg</option>
                                            <option>2 Kg</option>
                                            <option>5 Kg</option>	
                                        </select>	
                                    </div>
                                    <div class="d-flex align-items-center justify-content-center">
                                        <div class="price_text">202.62 SR</div>
                                        <div class="mrp_text">222.62 SR</div>					  		
                                    </div>
                                    <div class="productInfo">
                                        <div class="ratings">
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star-half-alt"></i>
                                            <i class="far fa-star"></i>
                                        </div>
                                        <p class="salinginfo">110 people bought this</p>
                                    </div>		
                                    <div class="cartbox">
                                      <a href="javascript:voil(0)" class="addcart-btn shopingcart-tbtn btn" id="addcart-1"><i class="icofont-shopping-cart"></i> Add to Cart</a>
                                  </div>	
                                </div>	
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
export class SharedBestSellingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.jquery();
  }
  jquery = () => {
    jQuery(() => {
        ($(".product-carousel") as any).owlCarousel({
            //autoplay: true,
            dots: true,
            loop: false,
            nav:true,
            margin:0,
            navText: ["<i class='icofont-rounded-left'></i>","<i class='icofont-rounded-right'></i>"],
            responsive: {
              0: {
                items: 1
              },
              767: {
                items: 2
              },        
              1000: {
                items: 3
              },
              1200: {
                items: 4
              }
            }
          });
    })}

}
