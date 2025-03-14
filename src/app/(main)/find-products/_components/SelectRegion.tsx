"use client";

import Button from "@/components/common/Button";
import { Combobox, Option } from "@/components/common/Combobox";
import { useCallback } from "react";
import { allCountries } from "country-region-data";
import { useRouter } from "next/navigation";
import { RecommendationComponentProps, Region } from "@/types/products";
import { setCookie } from "cookies-next/client";
import { useAppSelector } from "@/lib/redux/hook";

const SelectRegion = ({
  value,
  onChange,
}: Omit<RecommendationComponentProps, "value"> & { value: Region | null }) => {
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

  const formatRegions = useCallback((country: string) => {
    const countryData = allCountries.find((c) => c[0] === country);
    if (!countryData) return [];
    return countryData[2].map((region) => ({
      value: region[0],
      label: region[0],
    }));
  }, []);

  const getCountry = (country: string) => {
    const countries = formatCountries();
    return countries.find((c) => c.value === country);
  };

  const getRegion = (country: string, region: string) => {
    const regions = formatRegions(country);
    return regions.find((r) => r.value === region);
  };

  const onNext = () => {
    setCookie("recommendation", JSON.stringify(userSkinProfile));
    router.push("/find-products/find-perfect-match");
  };

  const onSkip = () => {
    onChange("region", { country: "", city: "" });
    router.push("/find-products/find-perfect-match");
  };

  console.log(value);

  return (
    <div className="flex flex-col mt-[32px] lg:mt-0 gap-5 text-[#2C2C2C]">
      <Combobox
        options={formatCountries() as Option[]}
        placeholder="Select"
        value={getCountry(value?.country || "")}
        onChange={(_country) =>
          onChange("region", { country: _country?.value, city: "" })
        }
      />

      {value?.country && getCountry(value?.country || "") && (
        <Combobox
          options={formatRegions(value?.country) as Option[]}
          placeholder="Select"
          value={getRegion(value?.country || "", value?.city || "")}
          onChange={(_city) =>
            onChange("region", { country: value?.country, city: _city?.value })
          }
        />
      )}

      <div className="flex items-center gap-5">
        <Button
          className="w-[126px] h-[60px] p-0 text-xl font-medium leading-[26px]"
          disabled={!value?.country || !value?.city}
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
