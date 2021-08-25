import { Component } from '@angular/core';

@Component({
	selector: 'app-not-found',
	template: `
<div id="main">
	<div class="fof">
		<h1>{{'error' | translate}} 404</h1>
		<p><a style="cursor: pointer; color: #f27b21;
			    border-color: #f27b21;" [routerLink]="['/']" routerLinkActive="active">{{'back_to_home' | translate}}</a></p>
	</div>
</div>
  `,
	styles: [
		`* {
			transition: all 0.6s;
		      }
		      
		      `,
		`html {
			height: 100%;
		      }
		      
		      `,
		`body {
			font-family: 'Lato', sans-serif;
			color: #888;
			margin: 0;
		      }
		      
		      `,
		`#main {
			display: table;
			width: 100%;
			height: 100vh;
			text-align: center;
		      }
		      
		      `,
		`.fof {
			display: table-cell;
			vertical-align: middle;
		      }
		      
		      `,
		`.fof h1 {
			font-size: 50px;
			display: inline-block;
			padding-right: 12px;
			animation: type .5s alternate infinite;
		      }
		      
		      `,
		`@keyframes type {
			from {
			  box-shadow: inset -3px 0px 0px #888;
			}
		      
			to {
			  box-shadow: inset -3px 0px 0px transparent;
			}
		      }`
	]
})
export class NotFoundComponent { }
