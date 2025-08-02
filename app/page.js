import Link from "next/link";

export default function Home() {
  return (
    <div className="flex gap-4">
      <Link href={'/items'}>items</Link>

    
    </div>
  );
}


