export interface Category {
	categoryID: string;
	categoryName: string;
	categoryImage: string;
	categoryStatus: string;
	categoryCreatedDate: string;
	categoryDisplayOrder: string;
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
export interface ProductList {
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
}
export interface FORGOT {
	userMobile: string;
	userID: string;
	status: string;
	message: string;
}