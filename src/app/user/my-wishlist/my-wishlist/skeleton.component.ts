import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-skeleton',
	template: `
	<div class="orderDetailList" *ngFor="let number of [0,1,2,3,4]">
	<div class="bodyOrder form-row m-0 align-items-center">
	<div class="col-md-2 col-4">
		<div class="smImg">
			<ngx-skeleton-loader count="1" appearance="circle"
				[theme]="{width: '110px', height: '110px', 'border-radius': '10px'}">
			</ngx-skeleton-loader>
		</div>
	</div>
	<div class="col-md-5 col-8">
		<ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '65%' }">
		</ngx-skeleton-loader><br>
		<ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '35%' }">
		</ngx-skeleton-loader><br>
		<ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '45%' }">
		</ngx-skeleton-loader>
	</div>
	<div class="col-md-5 text-md-right">
		<div class="linksOrde pt-2">
			<ngx-skeleton-loader count="1"
				[theme]="{ height: '19px', 'margin-bottom': '10px', width: '5%', 'border-radius': '10px' }">
			</ngx-skeleton-loader>
			<ngx-skeleton-loader count="1"
				[theme]="{ height: '37px', 'margin-bottom': '0px','margin-left': '8px', width: '36%', 'border-radius': '10px' }">
			</ngx-skeleton-loader>
		</div>
	</div>
	</div>
	</div>
  `,
	styles: [
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonComponent {
}
