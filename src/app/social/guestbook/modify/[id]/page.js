import GuestbookFormModify from "@/components/guestbook-form-modify";

export default function ModifyEntry({ params }) {
  const API_URL = process.env.API_URL;
  const API_KEY = process.env.API_KEY;

  const sn = params.id;

  return (
    <main className="px-6 md:px-8 lg:px-10 xl:px-12">
      <h2 className="text-4xl font-bold mb-4">소셜</h2>
      <section className="w-full flex flex-col items-center gap-8">
        <GuestbookFormModify
          API_URL={API_URL}
          API_KEY={API_KEY}
          id={sn}
          type="modify"
        />
      </section>
    </main>
  );
}
