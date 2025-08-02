import Link from "next/link";
import GetLocationComponent from "../GetLocationComponent";


export default function Header() {

    return (
        <div className='p-2 w-full z-10 border border-b border-gray-300'>
            <div className='grid grid-cols-3 gap-3 items-center p-1 max-w-[1280px] m-auto relative max-md:grid-cols-2'>
                <div className='justify-self-start max-md:hidden bg-main-red-color'>
                    <div className='flex items-center gap-2'>
                        left
                    </div>
                </div>
                <Link href='/' className='m-auto cursor-pointer'>
                    center
                </Link>
                <div className='flex justify-end items-center gap-6 max-md:pr-2 '>
                    <GetLocationComponent />

                </div>
            </div>
        </div>
    )
}
