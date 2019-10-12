import { IPriceLongTerm, IPriceShortTerm } from '@/types/Requests/LTR/CreateListing/Step3/PriceTerm';
import { typeService } from '@/types/Requests/LTR/CreateListing/Step3/ServicesFee';
import { ImagesRes } from '@/types/Requests/LTR/Images/ImageResponses';
import { AmenitiesIndexRes } from '@/types/Requests/LTR/Amenities/AmenitiesResponses';
import { TransformerInclude } from '@/types/Requests/ResponseTemplate';
import { UserReviewRes, RoomReviewIndexResponse } from '@/types/Requests/Rooms/RoomReviewIndexResponse';
import { MediaIndexRes } from '@/types/Requests/Media/MediaIndexResponse';
import { CityRes } from '@/types/Requests/Cities/CityResponse';
import { DistrictRes } from '@/types/Requests/Districts/DistrictResponse';
import { PlaceIndexResponse } from '@/types/Requests/Places/PlaceIndexResponse';
import { RoomDetails, Merchant } from '@/types/Requests/Rooms/RoomResponses';

export interface LTRoomIndexRes {
  id: number,
  room_id: number,
  prices: pricesLT,
  discount_prices: number | null,
  is_discount: number,
  is_discount_txt: string,
  price_display: number | null,
  price_discount_display: number | null,
  included_services: string[],
  not_included_services: string[],
  bedrooms: any,
  bathrooms: numberBathroom,
  avatar: ImagesRes,
  cover_photo: ImagesRes,
  outdoors: ImagesRes,
  furnitures: ImagesRes,
  kitchens: ImagesRes,
  livingrooms: ImagesRes,
  about_room: aboutRoom,
  address:string,
  long_term_rent_type:detailRentType,
  short_term_rent_type:detailRentType,
  building: string,
  latitude: string,
  longitude: string,
  accommodation_type: number,
  accommodation_type_txt: string,
  guests: detailguest | null,
  rating: detailrating,
  instant_book: number,
  instant_book_txt: string,
  display: any,
  stay_with_host: number,
  stay_with_host_txt: string,
  short_term_room: IPriceShortTerm,
  merchant_id: number,
  refund_settings: string[],
  payment_method: number | null,
  minimum_month: string,
  city_id: number,
  district_id: number,
  percent: number,
  comission: string | null,
  comforts:detailcomforts,
  details: TransformerInclude<RoomDetails[]>;
  user: TransformerInclude<UserReviewRes>;
  media: TransformerInclude<MediaIndexRes[]>;
  city: TransformerInclude<CityRes>;
  district: TransformerInclude<DistrictRes>;
  merchant: TransformerInclude<Merchant>;
  places: TransformerInclude<PlaceIndexResponse[]>;
  reviews: TransformerInclude<RoomReviewIndexResponse[]>;
}

export type LTRoomScheduleRes = {
  blocks: string[];
};

export interface pricesLT {
  prices: IPriceLongTerm,
  included_fee: typeService[]
}

export interface numberBathroom {
  number_bathroom:number
}

export interface aboutRoom {
  name: string,
  description: string,
  lang: string,
  space: string,
  note: string
}

export interface detailRentType {
  rent_type: number,
  rent_type_txt: string
}

export interface detailguest {
  recommendation: number,
  max_additional_guest: number
}

export interface detailrating {
  avg_cleanliness: number | null,
  avg_quality: number | null,
  avg_service: number | null,
  avg_valuable: number | null,
  avg_avg_rating: number | null,
  total_recommend: number | null,
  avg_cleanliness_txt: string,
  avg_quality_txt: string,
  avg_service_txt: string,
  avg_valuable_txt: string,
  avg_avg_rating_txt: string
}

export interface detailcomforts {
  common: AmenitiesIndexRes,
  livingrooms: AmenitiesIndexRes,
  bedrooms: AmenitiesIndexRes,
  kitchens: AmenitiesIndexRes,
  bathrooms: AmenitiesIndexRes,
  others: AmenitiesIndexRes,
  entertainment: AmenitiesIndexRes,
  facilities: AmenitiesIndexRes,
}
