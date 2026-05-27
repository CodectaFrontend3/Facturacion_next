<<<<<<< HEAD
export default function Page() {
  return (
    <main className="min-h-screen bg-white p-6">
      <h2 className="text-xl font-semibold text-black">Papelera</h2>
    </main>
=======
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

export default function TrashPage() {
  const [selectedEmail, setSelectedEmail] = useState<EmailData | null>(null);
  
  const [trashEmails, setTrashEmails] = useState<EmailData[]>([]);
  const [inboxCount, setInboxCount] = useState(0);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Cargar datos de localStorage
  useEffect(() => {
    const loadData = async () => {
      await Promise.resolve(); // Forzamos asincronía

      const storedTrash = localStorage.getItem("trashEmails");
      const storedInbox = localStorage.getItem("inboxEmails");
      
      setTrashEmails(storedTrash ? JSON.parse(storedTrash) : []);
      setInboxCount(storedInbox ? JSON.parse(storedInbox).length : 0);
    };

    loadData();
  }, []);

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(emailId => emailId !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === trashEmails.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(trashEmails.map(e => e.id));
    }
  };

  // Restaurar correos seleccionados (mover a Enviados)
  const handleRestore = () => {
    if (selectedIds.length === 0) return;

    const remainingTrash = trashEmails.filter(e => !selectedIds.includes(e.id));
    const movingToInbox = trashEmails.filter(e => selectedIds.includes(e.id));

    const storedInbox = localStorage.getItem("inboxEmails");
    const currentInbox = storedInbox ? JSON.parse(storedInbox) : [];
    
    const newInbox = [...currentInbox, ...movingToInbox];
    localStorage.setItem("trashEmails", JSON.stringify(remainingTrash));
    localStorage.setItem("inboxEmails", JSON.stringify(newInbox));

    setTrashEmails(remainingTrash);
    setInboxCount(newInbox.length);
    setSelectedIds([]);
  };

  // Eliminar definitivamente
  const handleEmpty = () => {
    if (selectedIds.length === 0) return;
    const remainingTrash = trashEmails.filter(e => !selectedIds.includes(e.id));
    localStorage.setItem("trashEmails", JSON.stringify(remainingTrash));
    setTrashEmails(remainingTrash);
    setSelectedIds([]);
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
            <Link href="/email" className="flex items-center justify-between px-2 py-2 hover:bg-gray-50 text-[13px] text-gray-600 border-l-2 border-transparent transition-colors">
              <div className="flex items-center gap-2.5">
                <i className="bi bi-inbox text-gray-500 text-base"></i>
                Enviados
              </div>
              <span className="bg-[#1AB394] text-white text-[10px] font-bold px-1.5 py-[1px] rounded-sm">{inboxCount}</span>
            </Link>
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

          <li className="mt-1">
            <button onClick={() => setSelectedEmail(null)} className="w-full flex items-center justify-between px-2 py-2 bg-gray-50 text-[13px] text-gray-800 font-bold border-l-2 border-[#1a5eb3] cursor-pointer transition-colors">
              <div className="flex items-center gap-2.5">
                <i className="bi bi-trash-fill text-gray-500 text-base"></i>
                Papelera
              </div>
              <span className="bg-[#ed5565] text-white text-[10px] font-bold px-1.5 py-[1px] rounded-sm">{trashEmails.length}</span>
            </button>
          </li>
        </ul>
      </div>

      {/* PANEL PRINCIPAL DERECHO */}
      <div className="flex-1 bg-white border border-gray-200 shadow-sm w-full flex flex-col">
        
        {!selectedEmail ? (
          <div className="p-6">
            <h2 className="text-2xl font-light text-gray-400 mb-6">Papelera ({trashEmails.length})</h2>

            <div className="flex items-center justify-between border border-gray-200 p-2.5 bg-white mb-2">
              <div className="ml-2 flex items-center">
                <Checkbox 
                  className="border-gray-400 rounded-sm cursor-pointer" 
                  checked={trashEmails.length > 0 && selectedIds.length === trashEmails.length}
                  onCheckedChange={toggleSelectAll}
                />
              </div>
              <div className="flex gap-1.5">
                <Button 
                  onClick={handleRestore}
                  disabled={selectedIds.length === 0}
                  className="bg-[#1AB394] hover:bg-[#159a7f] disabled:opacity-50 text-white h-8 px-4 rounded-sm text-[13px] font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <i className="bi bi-arrow-counterclockwise"></i> Restaurar
                </Button>
                <Button 
                  onClick={handleEmpty}
                  disabled={selectedIds.length === 0}
                  className="bg-[#ed5565] hover:bg-red-600 disabled:opacity-50 text-white h-8 px-4 rounded-sm text-[13px] font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <i className="bi bi-trash"></i> Eliminar
                </Button>
              </div>
            </div>

            <div className="border border-gray-200 border-b-0">
              {trashEmails.length > 0 ? (
                trashEmails.map((email) => (
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
                ))
              ) : (
                <div className="p-6 text-center text-[13px] text-gray-400 border-b border-gray-200">
                  La papelera está vacía.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full">
            {/* ... (Mantén tu código actual de visualización del correo aquí) ... */}
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <h2 className="text-[26px] font-light text-gray-400">Ver Correo</h2>
              </div>
              <div className="flex gap-1.5">
                <Button onClick={() => setSelectedEmail(null)} className="bg-gray-500 hover:bg-gray-600 text-white h-8 px-4 rounded-sm text-[13px] font-medium flex items-center gap-1.5 cursor-pointer">
                  <i className="bi bi-arrow-left text-base"></i> Volver
                </Button>
              </div>
            </div>
             <div className="p-5 py-8 border-y border-gray-100 text-[13px] text-gray-600 min-h-[120px]">{selectedEmail.body}</div>
          </div>
        )}
      </div>
    </div>
>>>>>>> origin/rodrigo
  );
}
