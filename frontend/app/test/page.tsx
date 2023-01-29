import { getPost } from "@api/client";

async function Page() {
  const data = await getPost({
    id: "686dab88-78e7-4963-99df-ecb5dcc937b0",
  });

  return (
    <div>
      <h1>Hello from API call</h1>
      <p>{data.code}</p>
    </div>
  );
}

export default Page;
