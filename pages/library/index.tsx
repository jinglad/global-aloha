import { NextPage } from "next";
import React from "react";
import Library from "../../src/components/Library/Library";

const LibraryPage: NextPage = ({ categories }: any) => {
  return <Library categories={categories} />;
};

export default LibraryPage;

export async function getStaticProps() {
  const res = await fetch(
    "https://api-globalalohaservice-dev.saams.xyz/v1/common/category?categoryTypes=1"
  );
  const categories = await res.json();
  return {
    props: {
      categories,
    },
  };
}
