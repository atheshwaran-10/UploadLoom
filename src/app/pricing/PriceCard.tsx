import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Chip } from "@nextui-org/react";
import Link from "next/link";

export interface PriceCardProps {
  title: string;
  desc: string;
  price: string;
  isCustom: boolean;
  buttonText: string;
  buttonRoute: string;
  isRecommended: boolean;
  features: string[];
}

const PriceCard: React.FC<PriceCardProps> = ({
  title,
  desc,
  price,
  isCustom,
  buttonText,
  buttonRoute,
  isRecommended,
  features,
}) => {
  return (
    <div
      className={
        " rounded-3xl  border border-solid  bg-white p-12 " +
        (isRecommended
          ? " border-medium border-purple-600"
          : "border-slate-300")
      }
    >
      <div className="mb-8" id="header">
        <div className="flex flex-row justify-between">
          <h1
            className={
              "mb-3 text-2xl font-bold " +
              (isRecommended ? " text-purple-600" : " ")
            }
          >
            {title}
          </h1>
          {isRecommended && (
            <Chip className="mt-1 bg-purple-300 text-purple-600">
              <p className="font-semibold">Recommended</p>
            </Chip>
          )}
        </div>
        <p>{desc}</p>
      </div>
      <div id="price" className="mb-6">
        <h2 className="mb-6">
          {!isCustom ? (
            <div>
              <span className="text-4xl font-bold">₹{price}</span>
              <span className="text-sm font-semibold text-slate-500">
                /month
              </span>
            </div>
          ) : (
            <div>
              <h2 className="text-4xl font-bold">Custom</h2>
            </div>
          )}
        </h2>
        {isRecommended ? (
          <Link href={buttonRoute}>
            <Button
              variant="outline"
              className="w-full border-purple-600 bg-purple-500 text-center text-white hover:bg-purple-600 hover:text-white"
            >
              {buttonText}
            </Button>
          </Link>
        ) : (
          <Link href={buttonRoute} target="__blank">
            <Button
              variant="outline"
              className="w-full border-purple-600 text-center text-purple-500 hover:text-purple-600"
            >
              {buttonText}
            </Button>
          </Link>
        )}
      </div>
      <div id="features" className="mb-12 mt-12 gap-y-5">
        {features.map((feature, index) => (
          <div className="my-3  flex flex-row gap-x-6" key={index}>
            <Check size={22} color=" rgb(168 85 247 / 1)" />
            <p className="text-sm text-slate-800">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceCard;
