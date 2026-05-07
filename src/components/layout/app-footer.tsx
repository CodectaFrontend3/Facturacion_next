import Link from "next/link"

export default function AppFooter() {
    return (
        <footer className='w-full border-t border-gray-300 bg-white text-black px-5 py-2.5 text-[13px]'>
            <div className=' h-3.5 flex justify-between items-center text-[#676a6c]'>
                <div className='flex gap-2 '>
                    <span className=" font-bold">Copyright</span>
                    <Link href={'http://www.jypsac.com'} target="_blank" rel="noopener noreferrer">
                        <span className=" hover:text-[#0056b3] text-[#007bff]">JyP Periféricos</span>
                    </Link>
                    <span>© 2019 - 2026</span>
                </div>
                <div className="flex gap-2">
                    <span>Visitanos: </span>
                    <Link href={'https://www.facebook.com/JYPPERIFERICOSSAC'} target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-facebook"></i>
                    </Link>
                    <Link
                        href={'https://api.whatsapp.com/send?phone=51946201443&text=Hola!%20Necesito%20Ayuda%20con%20el%20sistema%20de%20Facturación,%20Gracias!%20'}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="bi bi-whatsapp"></i>
                    </Link>
                </div>
            </div>
        </footer>
    )
}