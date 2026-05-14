"use client";
import { useState } from "react";
import { ReactNode } from "react";

export default function Modal({ onClose }: { onClose: () => void }) {
    const [closing, setClosing] = useState(false);

    const [options, setOptions] = useState([
        { option: "LENOVO" },
        { option: "SAMSUNG" },
    ]);

    const handleClose = () => {
        setClosing(true);

        setTimeout(() => {
            onClose();
        }, 300);
    }

    return (
        <div className="modal-content fixed inset-0 bg-black-40 z-20" onClick={handleClose}>
            <div className={`bg-white p-3 rounded shadow w-120 modal-box ${closing ? "closing" : ""}`} onClick={(e) => e.stopPropagation()}>
                <div className="p-4 border border-gray-300 space-y-3">
                    <div className="flex justify-between items-center">
                        <h3 className="modal-title">Agregar</h3>
                        <button onClick={handleClose} className="cursor-pointer modal-close-btn text-gray-400 hover:text-gray-600 text-xl">✕</button>
                    </div>
                    <div className="flex gap-20">
                        <p>Selecciona marca a agregar</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="w-20">Marca:</label>
                        <select className="flex-1 border border-gray-300 p-2 rounded">
                            {options.map((option, index) => (
                                <option key={index}>{option.option}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button className="modal-add-btn bg-[#1a5eb3] hover:bg-[#1a3bb3]! px-4 py-2 text-white rounded cursor-pointer">Grabar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}