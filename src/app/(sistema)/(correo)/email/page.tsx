"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface EmailData {
  id: number;
  email: string;
  subject: string;
  hasAttachment: boolean;
  date: string;
  fullDate: string;
  from: string;
  body: string;
  attachmentName: string;
}

const initialEmails: EmailData[] = [
  { id: 1, email: "sincorreo@gmail.com", subject: "Cotización - COTF 001-00000014", hasAttachment: true, date: "10/05/26", fullDate: "2026-05-10 12:04:23", from: "danielroman@codecta.pe", body: "Estimado cliente, adjuntamos la cotización COTF 001-00000014", attachmentName: "PDF-DOC-COTF001-00000014-20522045773.pdf" },
  { id: 2, email: "sincorreo@gmail.com", subject: "Cotización - COTF 001-00000013", hasAttachment: true, date: "21/01/26", fullDate: "2026-01-21 12:04:23", from: "danielroman@codecta.pe", body: "Estimado cliente, adjuntamos la cotización COTF 001-00000013", attachmentName: "PDF-DOC-COTF001-00000013-20522045773.pdf" },
  { id: 3, email: "sincorreo@gmail.com", subject: "Boleta Manual - BA00-00000006", hasAttachment: true, date: "21/01/26", fullDate: "2026-01-21 15:30:00", from: "danielroman@codecta.pe", body: "Estimado cliente, adjuntamos la boleta BA00-00000006", attachmentName: "PDF-DOC-BA00-00000006-20522045773.pdf" },
];

export default function EmailPage() {
  const [selectedEmail, setSelectedEmail] = useState<EmailData | null>(null);
  
  // Estado global simulado
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [trashCount, setTrashCount] = useState(0);
  
  // Estado para la selección de checkboxes
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Cargar datos de localStorage al montar el componente
  useEffect(() => {
    const loadData = async () => {
      // Forzamos a que la ejecución sea asíncrona para que el React Compiler no lance advertencias
      await Promise.resolve(); 

      const storedInbox = localStorage.getItem("inboxEmails");
      const storedTrash = localStorage.getItem("trashEmails");
      
      if (!storedInbox && !storedTrash) {
        localStorage.setItem("inboxEmails", JSON.stringify(initialEmails));
        localStorage.setItem("trashEmails", JSON.stringify([]));
        setEmails(initialEmails);
        setTrashCount(0);
      } else {
        setEmails(storedInbox ? JSON.parse(storedInbox) : []);
        setTrashCount(storedTrash ? JSON.parse(storedTrash).length : 0);
      }
    };

    loadData();
  }, []);

  // Función para seleccionar/deseleccionar un solo correo
  const toggleSelect = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(emailId => emailId !== id) : [...prev, id]
    );
  };

  // Función para seleccionar/deseleccionar todos
  const toggleSelectAll = () => {
    if (selectedIds.length === emails.length) {
      setSelectedIds([]); // Deseleccionar todos
    } else {
      setSelectedIds(emails.map(e => e.id)); // Seleccionar todos
    }
  };

  // Función para enviar a la papelera
  const handleDelete = () => {
    if (selectedIds.length === 0) return;

    // Separamos los que se quedan y los que se van
    const remainingEmails = emails.filter(e => !selectedIds.includes(e.id));
    const movingToTrash = emails.filter(e => selectedIds.includes(e.id));

    // Obtenemos la papelera actual
    const storedTrash = localStorage.getItem("trashEmails");
    const currentTrash = storedTrash ? JSON.parse(storedTrash) : [];
    
    // Actualizamos localStorage
    const newTrash = [...currentTrash, ...movingToTrash];
    localStorage.setItem("inboxEmails", JSON.stringify(remainingEmails));
    localStorage.setItem("trashEmails", JSON.stringify(newTrash));

    // Actualizamos estado visual
    setEmails(remainingEmails);
    setTrashCount(newTrash.length);
    setSelectedIds([]); // Limpiamos selección
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full font-sans items-start">
      
      {/* BARRA LATERAL IZQUIERDA */}
      <div className="w-full md:w-[260px] shrink-0 bg-white border border-gray-200 shadow-sm p-4">
        <Button className="w-full bg-[#1a5eb3] hover:bg-blue-800 text-white font-semibold mb-6 h-9 rounded-sm cursor-pointer transition-colors">
          Redactar
        </Button>

        <h3 className="text-xs font-bold text-gray-500 mb-2 px-1">FOLDERS</h3>

        <ul className="space-y-0.5">
          <li>
            <button onClick={() => setSelectedEmail(null)} className="w-full flex items-center justify-between px-2 py-2 bg-gray-50 text-[13px] text-gray-800 font-bold border-l-2 border-[#1a5eb3] cursor-pointer transition-colors">
              <div className="flex items-center gap-2.5">
                <i className="bi bi-inbox-fill text-gray-500 text-base"></i>
                Enviados
              </div>
              <span className="bg-[#1AB394] text-white text-[10px] font-bold px-1.5 py-[1px] rounded-sm">{emails.length}</span>
            </button>
          </li>
          
          <li>
            <Link href="#" className="flex items-center justify-between px-2 py-2 hover:bg-gray-50 text-[13px] text-gray-600 border-l-2 border-transparent transition-colors">
              <div className="flex items-center gap-2.5">
                <i className="bi bi-envelope text-gray-500 text-base"></i>
                Borradores
              </div>
              <span className="bg-[#f8ac59] text-white text-[10px] font-bold px-1.5 py-[1px] rounded-sm">0</span>
            </Link>
          </li>

          <li className="border-b border-gray-100 pb-1 mb-1">
            <Link href="/configuracion_email" className="flex items-center justify-between px-2 py-2 hover:bg-gray-50 text-[13px] text-gray-600 border-l-2 border-transparent transition-colors">
              <div className="flex items-center gap-2.5">
                <i className="bi bi-gear text-gray-500 text-base"></i>
                Configuracion
              </div>
            </Link>
          </li>

          <li>
            <Link href="/trash" className="flex items-center justify-between px-2 py-2 hover:bg-gray-50 text-[13px] text-gray-600 border-l-2 border-transparent mt-1 transition-colors">
              <div className="flex items-center gap-2.5">
                <i className="bi bi-trash text-gray-500 text-base"></i>
                Papelera
              </div>
              <span className="bg-[#ed5565] text-white text-[10px] font-bold px-1.5 py-[1px] rounded-sm">{trashCount}</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* PANEL PRINCIPAL DERECHO */}
      <div className="flex-1 bg-white border border-gray-200 shadow-sm w-full flex flex-col">
        
        {!selectedEmail ? (
          <div className="p-6">
            <h2 className="text-2xl font-light text-gray-400 mb-6">Enviados ({emails.length})</h2>

            <div className="flex items-center justify-between border border-gray-200 p-2.5 bg-white mb-2">
              <div className="ml-2 flex items-center">
                <Checkbox 
                  className="border-gray-400 rounded-sm cursor-pointer" 
                  checked={emails.length > 0 && selectedIds.length === emails.length}
                  onCheckedChange={toggleSelectAll}
                />
              </div>
              <div className="flex gap-1.5">
                <Button className="bg-[#1a5eb3] hover:bg-blue-800 text-white h-8 px-4 rounded-sm text-[13px] font-medium flex items-center gap-1.5 cursor-pointer">
                  <i className="bi bi-arrow-clockwise"></i> Recargar
                </Button>
                <Button 
                  onClick={handleDelete} 
                  disabled={selectedIds.length === 0}
                  className="bg-[#ed5565] hover:bg-red-600 disabled:opacity-50 text-white h-8 w-10 px-0 rounded-sm flex items-center justify-center cursor-pointer"
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </div>
            </div>

            <div className="border border-gray-200 border-b-0">
              {emails.map((email) => (
                <div 
                  key={email.id} 
                  onClick={() => setSelectedEmail(email)} 
                  className={`flex items-center border-b border-gray-200 p-3 hover:bg-gray-50 transition-colors cursor-pointer ${selectedIds.includes(email.id) ? 'bg-gray-50' : ''}`}
                >
                  <div onClick={(e) => e.stopPropagation()}>
                    <Checkbox 
                      className="ml-2 mr-6 border-gray-400 rounded-sm cursor-pointer" 
                      checked={selectedIds.includes(email.id)}
                      onCheckedChange={() => toggleSelect(email.id)}
                    />
                  </div>
                  <div className="w-[200px] shrink-0 text-[13px] text-gray-600 truncate pr-4">{email.email}</div>
                  <div className="flex-1 text-[13px] text-gray-600 truncate pr-4">{email.subject}</div>
                  <div className="w-10 flex justify-center text-gray-400">
                    {email.hasAttachment && <i className="bi bi-paperclip text-[15px] transform rotate-45"></i>}
                  </div>
                  <div className="w-20 text-right text-[12px] text-gray-600 pr-2">{email.date}</div>
                </div>
              ))}
              {emails.length === 0 && (
                <div className="p-6 text-center text-[13px] text-gray-400">Bandeja vacía.</div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full">
             {/* ... (Todo tu bloque de VISTA 2: DETALLE DEL CORREO que ya tenías) ... */}
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-[26px] font-light text-gray-400">Ver Correo</h2>
              <div className="flex gap-1.5">
                <Button onClick={() => setSelectedEmail(null)} className="bg-gray-500 hover:bg-gray-600 text-white h-8 px-4 rounded-sm text-[13px] font-medium flex items-center gap-1.5 cursor-pointer">
                  <i className="bi bi-arrow-left text-base"></i> Volver
                </Button>
              </div>
            </div>
            {/* Contenido del correo omitido por brevedad, manten tu código actual aquí */}
            <div className="p-5 flex flex-col gap-3">
              <div className="text-[15px] text-gray-600">Asunto: <span className="font-bold text-gray-800">{selectedEmail.subject}</span></div>
              <div className="flex justify-between items-start">
                <div className="text-[13px] text-gray-600 leading-snug">
                  <div>De: <span className="font-bold text-gray-800">{selectedEmail.from}</span></div>
                  <div>Para: <span className="font-bold text-gray-800">{selectedEmail.email}</span></div>
                </div>
                <div className="text-[13px] text-gray-500">{selectedEmail.fullDate}</div>
              </div>
            </div>
            <div className="p-5 py-8 border-y border-gray-100 text-[13px] text-gray-600 min-h-[120px]">{selectedEmail.body}</div>
          </div>
        )}
      </div>
    </div>
  );
}
