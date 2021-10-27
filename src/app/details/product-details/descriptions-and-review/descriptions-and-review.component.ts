import { trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/animation';
import { AuthenticationService } from 'src/app/authentication.service';
import { data } from 'src/app/global';
import { ProductList } from 'src/app/interface';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-descriptions-and-review',
	template: `
    					<div class="reviewSection" [@fadeIn]>
		      				<ul class="nav nav-tabs" id="myTab" role="tablist">
							  <li class="nav-item">
							    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#Discription" role="tab" aria-controls="home" aria-selected="true">{{'description' | translate}}</a>
							  </li>
							  <li class="nav-item">
							    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">{{'reviews' | translate}}(6)</a>
							  </li>
							  <li class="nav-item">
							    <a class="nav-link" id="calori-tab" data-toggle="tab" href="#calori" role="tab" aria-controls="calori" aria-selected="false">{{'calories' | translate}}</a>
							  </li>							  
							</ul>
							<div class="tab-content" id="myTabContent">
							  <div class="tab-pane fade show active" id="Discription" role="tabpanel" aria-labelledby="home-tab">
							  	<div class="p-3" *ngIf="product.productDescription">
							  		<p>{{product.productDescription}}</p>
							  	</div>
								  <div class="p-3" *ngIf="!product.productDescription">
							  		<p class="text-center">{{'no_descriptions' | translate}}</p>
							  	</div>
							  </div>

							  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
							  	<div class="review_group">
								  	<div class="review_show">
								  		<div class="d-flex">
								  			<div class="userimg"><img src="assets/images/pr-img1.png" alt=""></div>
								  			<div class="userreviesd">	
								  				<h6>John Doe</h6>
												<div class="ratings">
								  					<i class="fas fa-star"></i>
								  					<i class="fas fa-star"></i>
								  					<i class="fas fa-star"></i>
								  					<i class="fas fa-star-half-alt"></i>
								  					<i class="far fa-star"></i>
								  					<span>4.5</span>
								  				</div>
								  				<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
								  			</div>	
								  		</div>	
								  	</div>
							  	</div>
							  	<div class="write_review" *ngIf="isLoggedID">
							  		<form action="#" method="post" id="commentform" class="comment-form">
							  			<div class="form-group">
							  				<label for="Title">Review Title</label>
						  					<input type="text" id="Title" class="form-control">
						  				</div>	
						  				<div class="form-group">
							  				<label for="comment" class="d-block">Your Review</label>
						  					<textarea class="form-control" id="comment" name="comment" rows="2"></textarea>
						  				</div>
						  				<div class="selectReviw form-group">
						  					<label for="comment">You're reviewing: Duis sodales tortor tortor Culturele . How do you rate this product? *</label>
						  					<div class="radioGRP">
						  						<div class="form-check-inline">
												  <label class="form-check-label">
												    <input type="radio" class="form-check-input" name="optradio">
												    <div class="ratings"><i class="fas fa-star"></i></div>	
												  </label>
												</div>
												<div class="form-check-inline">
												  <label class="form-check-label">
												    <input type="radio" class="form-check-input" name="optradio">
												    <div class="ratings"><i class="fas fa-star"></i> <i class="fas fa-star"></i></div>
												  </label>
												</div>
												<div class="form-check-inline disabled">
												  <label class="form-check-label">
												    <input type="radio" class="form-check-input" name="optradio">
												    <div class="ratings"><i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i></div>
												  </label>
												</div>
												<div class="form-check-inline disabled">
												  <label class="form-check-label">
												    <input type="radio" class="form-check-input" name="optradio">
												    <div class="ratings"><i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i></div>
												  </label>
												</div>
												<div class="form-check-inline disabled">
												  <label class="form-check-label">
												    <input type="radio" class="form-check-input" name="optradio">
												    <div class="ratings"><i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i></div>
												  </label>
												</div>
						  					</div>	
						  				</div>	

						  				<div class="pt-3 pb-3">
											<a href="javascript:voil(0)" class="addcart-btn shopingcart-tbtn btn"> Submit Review</a>
										</div>
							  		</form>	
							  	</div>	
							  </div>
							  <div class="tab-pane fade" id="calori" role="tabpanel" aria-labelledby="calori-tab">
							  	<div class="p-3" *ngIf="product.productDescription">
							  		<p>{{product.productDescription}}</p>
							  	</div>
								  <div class="p-3" *ngIf="!product.productDescription">
							  		<p class="text-center">{{'no_descriptions' | translate}}</p>
							  	</div>
							  </div>
					</div>
		      	</div>
  `,
	styles: [
	],
	animations: [
		trigger('fadeIn', fadeIn())
	]
})
export class DescriptionsAndReviewComponent implements OnInit {
	@Input() product: ProductList;
	subs = new SubSink();
	isLoggedID: boolean;
	constructor(
		private auth: AuthenticationService,
		private cd: ChangeDetectorRef
	) { }
	ngOnInit(): void {
		this.checkStatus();
	}
	checkStatus = () => {
		// getting auth user data
		this.subs.add(this.auth.user.subscribe(user => {
			if (user) {
				data.loginuserID = user.userID
				this.isLoggedID = true;
				this.cd.markForCheck();
			}
			if (user === null) {
				data.loginuserID = '0'
				this.isLoggedID = false;
				this.cd.markForCheck();
			}
		}));
	}
}
