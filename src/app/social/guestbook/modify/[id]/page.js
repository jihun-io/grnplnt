import dynamic from "next/dynamic";

const GuestbookFormModify = dynamic(
  () => import("@/components/GuestbookFormModify"),
  {
    ssr: false,
  }
);

export const runtime = "edge";

export default function ModifyEntry({ params }) {
  const sn = params.id;

  return (
    <main className="px-6 md:px-8 lg:px-10 xl:px-12">
      <h2 className="text-4xl font-bold mb-4">소셜</h2>
      <section className="w-full flex flex-col items-center gap-8">
        <GuestbookFormModify id={sn} type="modify" />
      </section>
    </main>
  );
}
