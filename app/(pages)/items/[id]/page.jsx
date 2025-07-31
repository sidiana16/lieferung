// app/items/[id]/page.jsx
import Item from '@/app/components/Item';
import { notFound } from 'next/navigation';

const mockItems = {
    '1': { id: '1', title: 'Товар 1', description: 'Описание товара 1' },
    '2': { id: '2', title: 'Товар 2', description: 'Описание товара 2' },
};

export default async function ItemPage({ params }) {
    const paramId = (await params).id
    const item = mockItems[paramId];
    if (!item) return notFound();
// console.log(params.id);

    return (
        <div className="p-4">
            not intercepted
            <Item item={item} />
        </div>
    );
}