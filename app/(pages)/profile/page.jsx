import { authConfig } from "@/app/lib/authConfig";
import { getServerSession } from "next-auth/next";


export default async function Profile() {
  const session = await getServerSession(authConfig);
  console.log(session);

  return (
    <div>
      {session ? (
        <>
          <h1>Профиль</h1>
          <p>Добро пожаловать, {session.user.name || "Пользователь"}!</p>
          <p>Email: {session.user.email}</p>
        </>
      ) : (
        <p>
          Вы не авторизованы. <a href="/api/auth/signin">Войти</a>
        </p>
      )}
    </div>
  );
}