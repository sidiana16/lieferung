// app/items/page.jsx
import Link from 'next/link';

const items = [
  { id: '1', title: 'Товар 1', description: 'Описание товара 1' },
  { id: '2', title: 'Товар 2', description: 'Описание товара 2' },
];

export default function ItemsPage() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Список товаров</h1>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`/items/${item.id}`} scroll={false}>
              <div className="cursor-pointer hover:underline">{item.title}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}