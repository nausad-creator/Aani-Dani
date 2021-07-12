import { Pipe, PipeTransform } from '@angular/core';
import { ADDRESS } from 'src/app/interface';
@Pipe({
    name: 'myfilterAddress',
    pure: false
})
export class MyFilterAdressPipe implements PipeTransform {
    transform(address: ADDRESS[]): ADDRESS[] {
        if (!address) {
            return address;
        }
        return address.map((a) => {
            return {
                addressID: a.addressID,
                userID: a.userID,
                addressTitle: a.addressTitle,
                addressBuildingName: a.addressBuildingName,
                addressBlockNo: a.addressBlockNo,
                addressStreetName: a.addressStreetName,
                addressLandmark: a.addressLandmark,
                cityID: a.cityID,
                stateID: a.stateID,
                countryID: a.countryID,
                addressPincode: a.addressPincode,
                addressLati: a.addressLati,
                addressLongi: a.addressLongi,
                addressMobile: a.addressMobile,
                addressGST: a.addressGST,
                addressPAN: a.addressPAN,
                addressType: a.addressType,
                addressIsDefault: a.addressIsDefault,
                addressCreatedDate: a.addressCreatedDate,
                countryName: a.countryName,
                cityName: a.cityName,
                fullAddress: Object.keys(a).filter((key: string) => {
                    if (key === 'addressBlockNo' && a.addressBlockNo){
                        return `${a.addressBlockNo}`;
                    }
                    if (key === 'addressBuildingName' && a.addressBuildingName){
                        return `${a.addressBuildingName}`;
                    }
                    if (key === 'addressLandmark' && a.addressLandmark){
                        return `${a.addressLandmark}`;
                    }
                    if (key === 'addressStreetName' && a.addressStreetName){
                        return `${a.addressStreetName}`;
                    }
                }).map(f => a[f]).join(' ')
            }
        });
    }
}
