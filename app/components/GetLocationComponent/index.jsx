'use client';

import { useEffect, useState } from 'react';
import { getLocation } from '@/app/helpers';
import AddressDisplay from '../AddressDisplay';
import AddressList from '../AddressList';
import AddressForm from '../AddressForm';


export default function GetLocationComponent() {
    const [address, setAddress] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        postcode: '',
        road: '',
        house_number: '',
    });
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("addresses");
        if (stored && stored.length > 0) {
            const parsed = JSON.parse(stored);
            setSavedAddresses(parsed);

            const current = parsed.find((addr) => addr.isCurrent);
            if (current) {
                setAddress(current);
                setFormData({
                    postcode: current.postcode,
                    road: current.road,
                    house_number: current.house_number,
                });
                setSelectedId(current.id);
                return;
            }
        }

        // Получаем адрес по геолокации
        getLocation((data) => {
            console.log('data: ', data);
            
            // Проверяем, получены ли данные и не пустые ли они
            if (data?.address?.postcode && data?.address?.road && data?.address?.house_number) {
                const newAddress = {
                    // nominatimData: {...data},
                    id: crypto.randomUUID(),
                    postcode: data.address.postcode,
                    road: data.address.road,
                    house_number: data.address.house_number,
                    isCurrent: true,
                };

                if (!isDuplicateAddress(newAddress)) {
                    setAddress(newAddress);
                    setFormData(newAddress);
                    setSavedAddresses((prev) => {
                        const updated = prev.map((addr) => ({ ...addr, isCurrent: false }));
                        if (updated.length >= 5) {
                            updated.shift(); // Удаляем самый старый адрес, если достигнут лимит
                        }
                        updated.push(newAddress);
                        localStorage.setItem("addresses", JSON.stringify(updated));
                        return updated;
                    });
                }
            }
            // Если данные пустые или геолокация отклонена, ничего не сохраняем
        }, (error) => {
            // Обработка ошибки геолокации (например, отказ пользователя)
            console.error("Геолокация отклонена:", error);
        });
    }, []);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const isDuplicateAddress = (newAddress) =>
        savedAddresses.some(
            (addr) =>
                addr.postcode === newAddress.postcode &&
                addr.road === newAddress.road &&
                addr.house_number === newAddress.house_number
        );

    const handleSave = () => {
        // Проверка на пустые поля
        if (!formData.postcode || !formData.road || !formData.house_number) {
            return;
        }

        // Проверяем, были ли изменения в форме по сравнению с выбранным адресом
        const selectedAddress = selectedId ? savedAddresses.find((addr) => addr.id === selectedId) : null;
        const isFormChanged = selectedAddress
            ? formData.postcode !== selectedAddress.postcode ||
            formData.road !== selectedAddress.road ||
            formData.house_number !== selectedAddress.house_number
            : true;

        // Если адрес не изменен и выбран из списка, устанавливаем его как основной
        if (selectedId && !isFormChanged) {
            const updatedList = savedAddresses.map((addr) => ({
                ...addr,
                isCurrent: addr.id === selectedId,
            }));

            localStorage.setItem("addresses", JSON.stringify(updatedList));
            setSavedAddresses(updatedList);
            setAddress(selectedAddress);
            setIsModalOpen(false);
            setIsEditMode(false);
            return;
        }


        // Создаем новый адрес, если форма изменена или не выбран существующий адрес
        const newAddress = {
            ...formData,
            id: crypto.randomUUID(), // Используем уникальный UUID
            isCurrent: true,
        };

        // Проверка на дубликат
        if (isDuplicateAddress(newAddress)) {
            return;
        }

        const updatedList = savedAddresses.map((addr) => ({ ...addr, isCurrent: false }));
        // Проверка на лимит адресов
        if (updatedList.length >= 5) {
            updatedList.pop();
            updatedList.push(newAddress);
        } else {
            updatedList.push(newAddress);

        }




        localStorage.setItem("addresses", JSON.stringify(updatedList));
        setSavedAddresses(updatedList);
        setAddress(newAddress);
        setIsModalOpen(false);
        setSelectedId(newAddress.id);
        setIsEditMode(false);
    };

    console.log(savedAddresses);
    const handleSelectAddress = (addr) => {
        setFormData({
            postcode: addr.postcode,
            road: addr.road,
            house_number: addr.house_number,
        });
        setSelectedId(addr.id); // Восстанавливаем установку selectedId для отслеживания выбранного адреса
    };

    const handleDeleteAddress = (id) => {
        const updated = savedAddresses.filter((addr) => addr.id !== id);
        setSavedAddresses(updated);
        localStorage.setItem('addresses', JSON.stringify(updated));

        if (selectedId === id) {
            setSelectedId(null);
            setFormData({
                postcode: '',
                road: '',
                house_number: '',
            });
            setAddress(null);
        }
    };

    return (
        <div>
            <AddressDisplay address={address} openModal={() => setIsModalOpen(true)} />
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xs">
                    <div className="bg-white p-6 rounded-xl shadow-md w-[90%] max-w-md relative max-h-[90vh] overflow-y-auto">
                        <AddressForm
                            formData={formData}
                            handleChange={handleChange}
                            handleSave={handleSave}
                            closeModal={() => {
                                setIsModalOpen(false);
                                setSelectedId(null);
                                setIsEditMode(false);
                            }}
                        />
                        <AddressList
                            savedAddresses={savedAddresses}
                            selectedId={selectedId}
                            isEditMode={isEditMode}
                            handleSelectAddress={handleSelectAddress}
                            handleDeleteAddress={handleDeleteAddress}
                            toggleEditMode={setIsEditMode}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}