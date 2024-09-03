import { generateMetadata } from "/utils/metadata";

const title = "소셜 - 혹성의 아이";
const description = "혹성의 아이에 관한 소식을 만나 보세요.";

export const metadata = generateMetadata(title, description);

export const runtime = "edge";

async function getPosts() {
  const API_URL = process.env.API_URL;
  const API_KEY = process.env.API_KEY;
  const response = await fetch(API_URL, {
    headers: {
      "X-API-Key": API_KEY,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export default async function guestbook() {
  const posts = await getPosts();
  return (
    <main className="">
      <section className="w-full flex flex-col items-center">
        <h2 className="text-6xl mb-7">방명록</h2>
        <ul className="w-11/12 flex flex-col items-center">
          {posts.map(([title, date, content, id]) => (
            <li
              className="flex flex-col w-9/12 bg-white mb-8 gap-8 px-6 py-8 rounded-lg shadow-md shadow-slate-100"
              id={id}
            >
              <div className="flex flex-row items-center flex-wrap justify-between">
                <h2 className=" m-0">{title}</h2>
                <p className=" m-0">
                  <date>{date}</date>
                </p>
              </div>
              <p className="m-0  break-keep text-left">{content}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
