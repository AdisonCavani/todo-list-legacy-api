"use client";

import { useState } from "react";
import Card from "./Card";

type Props = {
  data: any[];
  title: string;
};

function RenderCards({ data, title }: Props) {
  if (data?.length > 0) {
    return (
      <>
        {data.map((post) => (
          <Card key={post.id} {...post} />
        ))}
      </>
    );
  }

  return (
    <h2 className="mt-5 text-xl font-bold uppercase text-[#6449ff]">{title}</h2>
  );
}

function Search() {
  const [searchText, setSearchText] = useState<string>();

  return (
    <>
      {searchText && (
        <h2 className="mb-3 text-xl font-medium text-[#666e75]">
          Showing results for{" "}
          <span className="text-[#222328]">{searchText}</span>
        </h2>
      )}

      <div className="xs:grid-cols-2 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {searchText ? (
          <RenderCards data={[]} title="No search results found" />
        ) : (
          <RenderCards data={[]} title="No posts found" />
        )}
      </div>
    </>
  );
}

export default Search;
