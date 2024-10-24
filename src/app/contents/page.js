import OptimizedImage from "@/components/OptimizedImage";
import Image from "next/image";

export default function Contents() {
  return (
    <main className="px-8">
      <h2 className="font-bold text-3xl mb-8">콘텐츠</h2>
      <section>
        <h3 className="text-xl my-4">포스터</h3>
        <img
          aspectRatio="210/297"
          src="https://placehold.co/210x297"
          className="w-[60vw]"
        />
      </section>
      <section>
        <h3 className="text-xl mt-8 mb-4">예고편</h3>
        <img src="https://placehold.co/640x360" alt="" className="w-[60vw]" />
      </section>
      <section>
        <h3 className="text-xl mt-8 mb-4">배경화면</h3>
        <img src="https://placehold.co/640x360" alt="" className="w-[60vw]" />
      </section>
    </main>
  );
}
