import { listTasks } from "@api/client";

async function Page() {
  const tasks = await listTasks({
    page: 1,
    pageSize: 25,
  });

  return (
    <section className="mx-auto max-w-7xl">
      {tasks.data.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </section>
  );
}

export default Page;
