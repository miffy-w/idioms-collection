"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { SimpleIdiomItem } from "@/types";
import IdiomsDrawer from "./IdiomsDrawer";

export interface HomeProps {
  baseUrl: string;
  viewAllBtnText?: string;
  children: React.ReactNode;
  idiomList: SimpleIdiomItem[];
}

export default ({
  children,
  baseUrl,
  viewAllBtnText,
  idiomList,
}: HomeProps) => {
  return (
    <div className="mb-6 text-center max-w-3xl mx-auto">
      <div className="text-base md:text-lg text-muted-foreground leading-relaxed">
        {children}
      </div>

      <div className="flex gap-6 items-center justify-center mt-8">
        <Link href={`${baseUrl}/1`}>
          <Button variant="destructive" size="lg" className="cursor-pointer">
            {viewAllBtnText}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>

        <IdiomsDrawer baseUrl={baseUrl} idiomList={idiomList} />
      </div>
    </div>
  );
};
