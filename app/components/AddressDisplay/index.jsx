import { CiLocationOn } from 'react-icons/ci';

export default function AddressDisplay({ address, openModal }) {
    return (

        <p className="flex gap-2 cursor-pointer" onClick={openModal}>
            <CiLocationOn size={22} />
            {address
                ? `${address.road}, ${address.house_number}, ${address.postcode}`
                : "Укажите адрес"}
        </p>
    )
};

