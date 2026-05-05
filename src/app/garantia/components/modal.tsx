"use client";
import { useState } from "react";

export default function Modal({ onClose }: { onClose: () => void }) {
    const [closing, setClosing] = useState(false);

    const handleClose = () => {
        setClosing(true);

        setTimeout(() => {
            onClose();
        }, 300);
    }

    return (
        <div className="modal-content fixed inset-0 bg-black/40 z-20" onClick={handleClose}>
            <div className={`bg-white p-3 rounded shadow w-120 modal-box ${closing ? "closing" : ""}`} onClick={(e) => e.stopPropagation()}>
                <div className="p-4 border border-gray-300 space-y-3">
                    <div className="flex justify-between items-center">
                        <h3 className="modal-title">Agregar</h3>
                        <button onClick={handleClose} className="modal-close-btn text-gray-400 hover:text-gray-600 text-xl">✕</button>
                    </div>
                    <div className="flex gap-20">
                        <p>Selecciona marca a agregar</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="w-20">Marca:</label>
                        <select className="flex-1 border border-gray-300 p-2 rounded">
                            <option>LENOVO</option>
                            <option>SAMSUNG</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button className="modal-add-btn px-4 py-2 bg-blue-700 text-white rounded">Grabar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}