type Props = {
    personal: any
}

export default function ProfileHeader({ personal }: Props) {
    return (
        <div
            className="relative overflow-hidden rounded-md h-[170px] flex items-center justify-center"
            style={{
                background:
                    "linear-gradient(135deg, #0f172a 0%, #1e3a8a 45%, #312e81 100%)",
            }}
        >
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute left-14 top-1/2 -translate-y-1/2 z-10">
                <div className="w-32 h-32 rounded-full border-4 border-white bg-transparent" /> {/** Para poner foto de perfil u_u */}
            </div>
            <div className="relative z-10 flex flex-col items-center gap-3 w-full px-20">
                <div className="flex gap-6 w-full justify-center">
                    <div className="bg-white/30 backdrop-blur-sm rounded-md px-10 py-3 text-white text-2xl font-semibold min-w-[390px] text-center">
                        {personal.apellido}
                    </div>

                    <div className="bg-white/30 backdrop-blur-sm rounded-md px-10 py-3 text-white text-2xl font-semibold min-w-[390px] text-center">
                        {personal.nombre}
                    </div>
                </div>
                <div className="bg-white/30 backdrop-blur-sm rounded-md px-10 py-3 text-white text-2xl font-semibold min-w-[390px] text-center">
                    {personal.pais}
                </div>
            </div>
        </div>
    );
}