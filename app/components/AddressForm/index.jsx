export default function AddressForm({ formData, handleChange, handleSave, closeModal }) {
    return (

        <div>

            <p className="text-xl mb-4 font-semibold">Редактировать адрес</p>

            <div className="mb-3">
                <label className="block mb-1 text-sm">Индекс</label>
                <input
                    type="text"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-3">
                <label className="block mb-1 text-sm">Улица</label>
                <input
                    type="text"
                    name="road"
                    value={formData.road}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 text-sm">Номер дома!</label>
                <input
                    type="text"
                    name="house_number"
                    value={formData.house_number}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="flex justify-end gap-2 mb-4">
                <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                    Отмена
                </button>
                <button
                    onClick={handleSave}
                    disabled={!formData.postcode || !formData.road || !formData.house_number}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                    Сохранить
                </button>
            </div>
        </div>
    )
};