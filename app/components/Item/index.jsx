// Это главный компонент для отображения карточки товара. учти что данный компонент отображает товар как на странице так и в модалке intercepted route
// то есть нужно обращать внимание на дизайн в обоих вариантах
// он экспортируется в (pages)/items/[id] и в (pages)/(.)items/[id]
export default function Item({ item }) {
    return (
        <div className="p-4 border rounded">
            <h2 className="text-lg font-bold">{item.title}</h2>
            <p>{item.description}</p>
        </div>
    );
}