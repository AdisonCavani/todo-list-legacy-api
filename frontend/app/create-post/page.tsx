import Form from "@components/Form";

function Page() {
  return (
    <section className="mx-auto max-w-7xl">
      <div>
        <h1 className="text-3xl font-extrabold text-[#222328]">Create</h1>
        <p className="mt-2 max-w-lg text-base text-[#666e75]">
          Create imaginative and visually stunning images through DALL-E AI and
          share them with the community
        </p>
      </div>

      <Form />
    </section>
  );
}

export default Page;
