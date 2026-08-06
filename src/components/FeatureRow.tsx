"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type FeatureRowProps = {
  tag: string;
  titleLines: string[];
  description: string;
  image: ReactNode;
  imagePosition: "left" | "right";
};

export default function FeatureRow({
  tag,
  titleLines,
  description,
  image,
  imagePosition,
}: FeatureRowProps) {
  const isImageLeft = imagePosition === "left";

  return (
    <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-[45px]">
      <motion.div
        initial={{ opacity: 0, x: isImageLeft ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`order-1 shrink-0 ${isImageLeft ? "lg:order-1" : "lg:order-2"}`}
      >
        {image}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        className={`order-2 flex w-full max-w-[552px] flex-col items-start gap-7 ${
          isImageLeft ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <p className="font-poppins text-[18px] font-medium text-grape-dark">
          {tag}
        </p>
        <h3 className="font-poppins text-[32px] font-bold leading-[1.35] text-text-primary sm:text-[40px] sm:leading-[54px]">
          {titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>
        <p className="font-montserrat text-[18px] leading-[28px] text-text-secondary sm:text-[20px] sm:leading-[32px]">
          {description}
        </p>
      </motion.div>
    </div>
  );
}
