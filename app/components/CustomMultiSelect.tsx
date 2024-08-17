"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import LoadingModal from "./LoadingModal";
import { useAppContext } from "../context/context";

interface SelectProps {
  placeholder: string;
  dataUrl?: string;
  options?: any[];
  action: React.Dispatch<React.SetStateAction<any>>;
  isMulti: boolean;
  className: string;
  value: string[];
}

const CustomOption = (props: any) => {
  const { data } = props

  return (
    <components.Option {...props}>
      <div className="flex justify-evenly items-center">
        <div className="w-[40px] h-[40px] rouned-full">
          <Image
            src={data.profileImage}
            alt="profile"
            className="rounded-full"
            width={40}
            height={40}
          />
        </div>

        <div className="text-white">{data.username}</div>
      </div>
    </components.Option>
  );
};

const CustomSingleValue = (props: any) => {
  const { data } = props
  return (
    <components.SingleValue {...props}>
      <div className="flex justify-evenly items-center">
        <div className="w-[40px] h-[40px] rouned-full">
          <Image
            src={data.profileImage}
            alt="profile"
            className="rounded-full"
            width={40}
            height={40}
          />
        </div>

        <div className="text-white">{data.username}</div>
      </div>
    </components.SingleValue>
  );
};

const CustomMultiValue = (props: any) => {
  const { data } = props
  return (
    <components.MultiValue {...props}>

      <div>
      <Image
        src={data.profileImage}
        alt="profile"
        className="rounded-full"
        width={40}
        height={40}
      />

      </div>
    </components.MultiValue>
  );
};


const CustomMultiSelect = ({
  placeholder,
  options,
  action,
  isMulti,
  className,
  value,
  dataUrl,
}: SelectProps) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // @ts-ignore
  const { user } = useAppContext();

  useEffect(() => {
    if (!dataUrl) return;

    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(dataUrl, {
        params: {
          userId: user?._id,
        },
      });
      // adding id as value to data
      const resultant = response.data.map((res:any) => ({...res,value:res._id}))
      setData(resultant);
      console.log(response.data);
      setLoading(false);
    };
    fetchData();
  }, [dataUrl, user?._id]);

  return (
    <Select
      options={data}
      placeholder={placeholder}
      onChange={action}
      isMulti={isMulti}
      className={className}
      value={value}
      components={{
        Option: CustomOption,
        SingleValue: CustomSingleValue,
        MultiValue: CustomMultiValue,
      }}
      styles={{
        control: (provided) => ({
          ...provided,
          backgroundColor: "#333",
          borderColor: "#555",
          color: "#fff",
          boxShadow: "none",
          "&:hover": {
            borderColor: "#777",
          },
        }),
        menu: (provided) => ({
          ...provided,
          backgroundColor: "#333",
        }),
        multiValue: (provided) => ({
          ...provided,
          backgroundColor: "#444",
          color: "#fff",
        }),
        multiValueLabel: (provided) => ({
          ...provided,
          color: "#fff",
        }),
        multiValueRemove: (provided) => ({
          ...provided,
          color: "#fff",
          "&:hover": {
            backgroundColor: "#555",
            color: "#fff",
          },
        }),
        input: (provided) => ({
          ...provided,
          color: "#fff",
        }),
        singleValue: (provided) => ({
          ...provided,
          color: "#fff",
        }),
        placeholder: (provided) => ({
          ...provided,
          color: "#aaa",
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          color: "#aaa",
          "&:hover": {
            color: "#fff",
          },
        }),
        indicatorSeparator: (provided) => ({
          ...provided,
          backgroundColor: "#555",
        }),
        clearIndicator: (provided) => ({
          ...provided,
          color: "#aaa",
          "&:hover": {
            color: "#fff",
          },
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected
            ? "#555"
            : state.isFocused
            ? "#444"
            : "#333",
          color: state.isSelected ? "#fff" : "#ddd",
          "&:hover": {
            backgroundColor: "#555",
            color: "#fff",
          },
        }),
      }}
    ></Select>
  );
};

export default CustomMultiSelect;
