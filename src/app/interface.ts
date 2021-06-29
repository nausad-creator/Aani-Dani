export interface Category {
	categoryID: string;
	categoryName: string;
	categoryImage: string;
	categoryStatus: string;
	categoryCreatedDate: string;
	categoryDisplayOrder: string;
}
export interface Upload {
	fileName: string;
	status: string;
	message: string;
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