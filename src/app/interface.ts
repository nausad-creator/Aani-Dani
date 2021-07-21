export interface Category {
	categoryID: string;
	categoryName: string;
	categoryImage: string;
	categoryStatus: string;
	categoryCreatedDate: string;
	categoryDisplayOrder: string;
}
export interface Nationality {
	nationalityID: string;
	nationalityName: string;
	nationalityStatus: string;
}
export interface Home {
	banners: Banner[];
	category: Category[];
	bestsealling: ProductList[];
}
export interface Upload {
	fileName: string;
	status: string;
	message: string;
}
export interface Banner {
	bannerID: string;
	bannerName: string;
	bannerURL: string;
	bannerImage: string;
	bannerType: string;
	bannerTypeID: string;
	categoryName: string;
}
export interface UserUpdate {
	languageID: string;
	loginuserID: string;
	userFullName: string;
	userEmail: string;
	userMobile: string;
	nationalityID: string;
	userDOB: string;
	userProfilePicture: string;
}
export interface ProductList {
	productID: string;
	categoryID: string;
	subcatID: string;
	addedCartCount: number;
	productName: string;
	productArabicNme: string;
	productSKU: string;
	productTag: string;
	productDescription: string;
	productPriceVat: string;
	productPrice: string;
	productMOQ: string;
	productImage: string;
	productPackagesize: string;
	productReviewCount: string;
	productRatingCount: string;
	productRatingAvg: string;
	productSoldCount: string;
	productStatus: string;
	productCreatedDate: string;
	categoryName: string;
	isFavorite: string;
	similarproducts: SimilarProducts[];
}
export interface SimilarProducts {
	productID: string;
	categoryID: string;
	subcatID: string;
	productName: string;
	productArabicNme: string;
	productSKU: string;
	productTag: string;
	productDescription: string;
	productPriceVat: string;
	productPrice: string;
	productMOQ: string;
	productImage: string;
	productPackagesize: string;
	productReviewCount: string;
	productRatingCount: string;
	productRatingAvg: string;
	productSoldCount: string;
	productStatus: string;
	productCreatedDate: string;
	categoryName: string;
	isFavorite: string;
}
export interface Language {
	languageID: string;
	languageName: string;
}
export interface LOGIN {
	data: [];
	message: string;
	status: string;
}
export interface USER_RESPONSE {
	userID: string;
	userFullName: string;
	userEmail: string;
	userCountryCode: string;
	userMobile: string;
	userPassword: string;
	userProfilePicture: string;
	languageID: string;
	nationalityID: string;
	userDeviceType: string;
	userDeviceID: string;
	userVerified: string;
	userEmailNotification: string;
	userPushNotification: string;
	userSMSNotification: string;
	userStatus: string;
	userOTP: string;
	userDOB: string;
	userSignedRefKey: string;
	userReferKey: string;
	userD365ID: string;
	userCreatedDate: string;
	languageName: string;
	address: ADDRESS[];
	settings: SETTINGS[];
	storeID: string;
}
export interface SETTINGS {
	settingsID: string;
	settingsEmailFrom: string;
	settingsEmailTo: string;
	settingsEmailGateway: string;
	settingEmailID: string;
	settingsEmailPass: string;
	settingsSSL: string;
	settingsTLS: string;
	settingEmailPort: string;
	settingSenderName: string;
	settingPGMode: string;
	settingsPGSandboxUrl: string;
	settingPGSandboxCustomerKey: string;
	settingsPGSandboxCustomerAuth: string;
	settingsPGLiveUrl: string;
	settingPGLiveCustomerKey: string;
	settingPGLiveCustomerAuth: string;
	settingsUserResetPinLinkExpHr: string;
	settingsLogDeleteDays: string;
	settingsDeliveryCharges: string;
	settingsFreeDeliveryAbove: string;
	settings1USDtoINR: string;
	settingsTollFree: string;
	settingsContactNo: string;
	settingsWhatsappNNo: string;
	settingsSalesEmail: string;
	settingsOrderReturnTimeMinutes: string;
	settingsMasterOtp: string;
	settingsJhoneaGST: string;
	settingsPaymentUrl: string;
	settingsPaymentSuccessUrl: string;
	settingsPaymentErrorUrl: string;
	settingsPackgingcharge: string;
	settingsShippingcharge: string;
	settingsMaintenance: string;
	settingsOthermaintenance: string;
	settingsMinimumOrderValue: string;
	settingsReferredPoints: string;
	settingsReferringPoints: string;
	settingsWalletUsePer: string;
	settingsDeliverySlot: string;
	settingsFBUrl: string;
	settingsInstaURL: string;
	settingsGooglePage: string;
	settingsAddress: string;
}
export interface ADDRESS {
	addressID: string;
	userID: string;
	addressTitle: string;
	addressBuildingName: string;
	addressBlockNo: string;
	addressStreetName: string;
	addressLandmark: string;
	cityID: string;
	stateID: string;
	countryID: string;
	addressPincode: string;
	addressLati: string;
	addressLongi: string;
	addressMobile: string;
	addressGST: string;
	addressPAN: string;
	addressType: string;
	addressIsDefault: string;
	addressCreatedDate: string;
	countryName: string;
	cityName: string;
	fullAddress: string;
}
export interface FORGOT {
	userMobile: string;
	userID: string;
	status: string;
	message: string;
}
export interface TempOrders {
	orderdetails: OrderDetailsTemp[],
	temporderDate: string;
	temporderID: string;
	userFullName: string;
	userID: string;
	userMobile: string;
	billingDetails: {
		delivery_Tip: number;
		delivery_Fee: number;
		item_Total: number;
		vat: number;
		net_Payable: number;
	}
}
export interface Orders {
	orderID: string;
	userID: string;
	orderNo: string;
	orderDate: string;
	orderBillingAddress: string;
	orderDeliveryAddress: string;
	orderDeliveryLat: string;
	orderDeliveryLong: string;
	orderDeliveryCharges: string;
	statusID: string;
	orderStatusDate: string;
	orderStatusRemark: string;
	orderDiscountCode: string;
	orderDiscount: string;
	orderWalletAmt: string;
	orderGrossAmt: string;
	orderVAT: string;
	orderNetAmount: string;
	orderPaymentMode: string;
	orderDeliveryType: string;
	orderDeliveryDate: string;
	orderPaymentStatus: string;
	orderPaymentTransactionID: string;
	orderNotes: string;
	orderRatingPending: string;
	userFullName: string;
	userMobile: string;
	statusName: string;
	orderdetails: OrderDetails[],
	timeline: [
		{
			orderstatusID: string;
			orderID: string;
			statusID: string;
			orderstatusDate: string;
			orderstatusRemark: string;
			statusName: string;
		}
	]
}
export interface OrderDetailsTemp {
	Price: string;
	Qty: string;
	categoryID: string;
	categoryName: string;
	productArabicNme: string;
	productCreatedDate: string;
	productDescription: string;
	productID: string;
	productImage: string;
	productMOQ: string;
	productName: string;
	productPackagesize: string;
	productPrice: string;
	productPriceVat: string;
	productRatingAvg: string;
	productRatingCount: string;
	productReviewCount: string;
	productSKU: string;
	productSoldCount: string;
	productStatus: string;
	productTag: string;
	subcatID: string;
}
export interface OrderDetails {
	orderdetailsID: string;
	orderID: string;
	productID: string;
	orderdetailsQty: string;
	orderdetailsPrice: string;
	statusID: string;
	statusName: string;
	categoryID: string;
	subcatID: string;
	productName: string;
	productArabicNme: string;
	productSKU: string;
	productTag: string;
	productDescription: string;
	productPriceVat: string;
	productPrice: string;
	productMOQ: string;
	productImage: string;
	productPackagesize: string;
	productReviewCount: string;
	productRatingCount: string;
	productRatingAvg: string;
	productSoldCount: string;
	productStatus: string;
	productCreatedDate: string;
	categoryName: string;
}
export interface ChangePassword {
	userCurrentPassword: string;
	userNewPassword: string;
	userNewRePassword: string;
}
export interface TempCartItems {
	productID: string;
	qty: number;
}
export interface Store {
	storeID: string;
	storeClientID: string;
	storeName: string;
	storeManagerName: string;
	storeCode: string;
	storeCity: string;
	cityID: string;
	storeEmail: string;
	storeManagerMobile: string;
	storeMobile: string;
	storeOpeningTime: string;
	storeClosingTime: string;
	storeOffDay: string;
	storeLatitude: string;
	storeLangitude: string;
	storeMapUrl: string;
	storeStatus: string;
	storeBarqHubID: string;
	distance_in_km: string;
	offlinedelivery: string;
}