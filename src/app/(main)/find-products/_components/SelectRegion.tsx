"use client";

import Button from "@/components/common/Button";
import { Combobox, Option } from "@/components/common/Combobox";
import { useCallback } from "react";
import { allCountries } from "country-region-data";
import { useRouter } from "next/navigation";
import { RecommendationComponentProps } from "@/types/products";
import { setCookie } from "cookies-next/client";
import { useAppSelector } from "@/lib/redux/hook";

const SelectRegion = ({
  value,
  onChange,
}: Omit<RecommendationComponentProps, "value"> & { value: string | null }) => {
  const userSkinProfile = useAppSelector(
    (state) => state.product.userSkinProfile
  );
  const router = useRouter();

  const formatCountries = useCallback(() => {
    return allCountries.map((country) => ({
      value: country[0],
      label: country[0],
    }));
  }, []);

  const formatCities = useCallback((country: string) => {
    const countryData = allCountries.find((c) => c[0] === country);
    if (!countryData) return [];
    return countryData[2].map((city) => ({
      value: city[0],
      label: city[0],
    }));
  }, []);

  const getCountry = (country: string) => {
    const countries = formatCountries();
    return countries.find((c) => c.value === country);
  };

  const getCity = (country: string, city: string) => {
    const cities = formatCities(country);
    return cities.find((r) => r.value.toLowerCase() === city.toLowerCase());
  };

  const onNext = () => {
    setCookie("recommendation", JSON.stringify(userSkinProfile));
    router.push("/find-products/find-perfect-match");
  };

  const onSkip = () => {
    onChange("region", null);
    router.push("/find-products/find-perfect-match");
  };

  const onRegionChange = (country: string = "", city: string = "") => {
    const region = `${country}, ${city}`;
    onChange("region", region);
  };

  const splittedValue = value?.split(",") ?? [];
  const countryText = splittedValue[0] ?? "";
  const cityText = splittedValue[1]?.trim() ?? "";

  return (
    <div className="flex flex-col mt-[32px] lg:mt-0 gap-5 text-[#2C2C2C]">
      <Combobox
        options={formatCountries() as Option[]}
        placeholder="Select"
        value={getCountry(countryText)}
        onChange={(_country) => onRegionChange(_country?.value, "")}
      />

      {countryText && getCountry(countryText) && (
        <Combobox
          options={formatCities(countryText) as Option[]}
          placeholder="Select"
          value={getCity(countryText, cityText)}
          onChange={(_city) => onRegionChange(countryText, _city?.value)}
        />
      )}

      <div className="flex items-center gap-5">
        <Button
          className="w-[126px] h-[60px] p-0 text-xl font-medium leading-[26px]"
          disabled={!countryText || !cityText}
          onClick={onNext}
        >
          Next
        </Button>
        <Button
          onClick={onSkip}
          variant={"outline"}
          className="w-[126px] h-[60px] border"
        >
          Skip
        </Button>
      </div>
    </div>
  );
};

export default SelectRegion;
