"use client";
import React from "react";
import { IconArrowDown } from "@/components/Icons";
import "./SlideButton.scss";

interface SlideButtonProps {
  onClick: () => void;
  type: string;
}

const SlideButton = ({ onClick, type }: SlideButtonProps) => (
  <button className={`slide-button slide-button--${type}`} onClick={onClick}>
    <span>
      <IconArrowDown />
    </span>
  </button>
);

export default SlideButton;
