"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DogBreeds, DogBreedKey } from "@/lib/constants";

interface BreedSelectProps {
  value?: DogBreedKey;
  onValueChange?: (value: DogBreedKey) => void;
  label?: string;
}

export function BreedSelect({
  value,
  onValueChange,
  label = "Select breed",
}: BreedSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.entries(DogBreeds).map(([key, value]) => (
            <SelectItem key={key} value={key}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
