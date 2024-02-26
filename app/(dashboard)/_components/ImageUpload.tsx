"use client";

import { UploadButton } from "@/utils/uploadthing";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

interface Props {
  data: Record<string, string>;
  setData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const ImageUpload = ({ data, setData }: Props) => {
  return (
    <div>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          setData({ ...data, imageUrl: res[0].url });
        }}
        onUploadError={(error: Error) => {
          toast.error(`ERROR! ${error.message}`);
        }}
      />
      <AnimatePresence>
        {data.imageUrl && (
          <motion.div
            className="relative h-52 w-52 mx-auto my-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            exit={{ opacity: 0 }}
          >
            <Image
              src={data.imageUrl}
              alt="Board Image"
              className="mx-auto object-cover rounded-xl h-52 w-52"
              width={208}
              height={208}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUpload;
