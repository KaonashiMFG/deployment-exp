import { User } from "@/types/user";

export default async function HomePage() {
  const res = await fetch("https://deployment-exp-web.vercel.app/user");
  const users = await res.json();

  console.log(users);

  return (
    <section className="m-5 flex gap-10">
      {users.data.map((user: User) => {
        return (
          <div key={user.id}>
            <p>name: {user.name}</p>
            <p>email: {user.email}</p>
          </div>
        );
      })}
    </section>
  );
}
