export default function AddressList({ savedAddresses, selectedId, isEditMode, handleSelectAddress, handleDeleteAddress, toggleEditMode }) {
    return (
        savedAddresses.length > 0 && (
            <div>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium">Сохранённые адреса:</h3>
                    <button
                        onClick={toggleEditMode}
                        className="text-blue-600 text-sm hover:underline"
                    >
                        {isEditMode ? 'Готово' : 'Редактировать'}
                    </button>
                </div>
                <ul className="space-y-2">
                    {savedAddresses.sort((a, b) => b.isCurrent - a.isCurrent).map((addr) => (
                        <li
                            key={addr.id}
                            className={`border p-3 rounded flex justify-between items-center cursor-pointer hover:bg-gray-100 ${selectedId === addr.id ? 'border-blue-600 bg-blue-50' : ''
                                }`}
                        >
                            <span onClick={() => handleSelectAddress(addr)}>
                                {addr.road}, {addr.house_number}, {addr.postcode}
                            </span>
                            {isEditMode && (
                                <button
                                    onClick={() => handleDeleteAddress(addr.id)}
                                    className="text-red-500 text-sm ml-2 hover:underline"
                                >
                                    Удалить
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        ))
};
