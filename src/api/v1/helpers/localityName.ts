import { AxiosResponse } from "axios";
import CustomError from "./customError";

const LocalityName = (value: AxiosResponse<any>): string => {
  let body = value.data;

  let addressComponents =
    body.status == "OK"
      ? (body.results[0].address_components as [
          { types: [string]; long_name: string; short_name: string }
        ])
      : [];
  if (addressComponents == []) {
    throw new CustomError("Bad request", 404, "No such latlng pair found");
  }
  console.log(addressComponents);

  let locality = addressComponents.find((address) => {
    return address.types.some((type) => type == "administrative_area_level_1");
  });

  // if (!locality) {
  //   throw new CustomError("Bad request", 404, "No locality found");
  // }
  console.log(locality);
  return locality?.long_name ?? "";
};
export default LocalityName;
