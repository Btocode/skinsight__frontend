"use client";

import Button from "@/components/common/Button";
import { Combobox, Option } from "@/components/common/Combobox";
import { useCallback } from "react";
import { allCountries } from "country-region-data";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import { setProductState } from "@/redux/slices/productSlice";
import { useRouter } from "next/navigation";

const SelectRegion = () => {
  const dispatch = useAppDispatch();
  const region = useAppSelector((state) => state.product.region);
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

  const onSkip = () => {
    dispatch(
      setProductState({
        key: "region",
        value: { country: "", city: "" },
      })
    );
    router.push("/find-products/find-perfect-match");
  };

  return (
    <div className="flex flex-col mt-[32px] lg:mt-0 gap-5">
      <Combobox
        options={formatCountries() as Option[]}
        placeholder="Select"
        value={getCountry(region?.country || "")}
        onChange={(value) =>
          dispatch(
            setProductState({
              key: "region",
              value: { country: value.value, city: "" },
            })
          )
        }
      />

      {region?.country && getCountry(region?.country || "") && (
        <Combobox
          options={formatRegions(region.country) as Option[]}
          placeholder="Select"
          value={getRegion(region?.country || "", region?.city || "")}
          onChange={(value) =>
            dispatch(
              setProductState({
                key: "region",
                value: { city: value.value, country: region.country },
              })
            )
          }
        />
      )}

      <div className="flex items-center gap-5">
        <Button
          className="w-[126px] h-[60px] p-0 text-xl font-medium leading-[26px]"
          disabled={!region?.country || !region?.city}
          onClick={() => {
            router.push("/find-products/find-perfect-match");
          }}
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
