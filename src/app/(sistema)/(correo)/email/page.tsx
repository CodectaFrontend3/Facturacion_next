"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ComposeEmailModal from "./components/ComposeEmailModal"; 

interface EmailData {
  id: number;
  email: string;
  cc?: string; // Se añade el campo CC
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
  
  // Bandejas
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [drafts, setDrafts] = useState<EmailData[]>([]);
  const [trashCount, setTrashCount] = useState(0);
  
  // Control de interfaz
  const [currentFolder, setCurrentFolder] = useState<"enviados" | "borradores">("enviados");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDraft, setEditingDraft] = useState<EmailData | null>(null); // Borrador actual en edición

  // Cargar datos al iniciar
  useEffect(() => {
    const loadData = async () => {
      await Promise.resolve(); 
      const storedInbox = localStorage.getItem("inboxEmails");
      const storedDrafts = localStorage.getItem("draftEmails");
      const storedTrash = localStorage.getItem("trashEmails");
      
      if (!storedInbox && !storedTrash && !storedDrafts) {
        localStorage.setItem("inboxEmails", JSON.stringify(initialEmails));
        localStorage.setItem("trashEmails", JSON.stringify([]));
        localStorage.setItem("draftEmails", JSON.stringify([]));
        setEmails(initialEmails);
        setTrashCount(0);
        setDrafts([]);
      } else {
        setEmails(storedInbox ? JSON.parse(storedInbox) : []);
        setDrafts(storedDrafts ? JSON.parse(storedDrafts) : []);
        setTrashCount(storedTrash ? JSON.parse(storedTrash).length : 0);
      }
    };
    loadData();
  }, []);

  // Al cambiar de carpeta, limpiamos selecciones
  useEffect(() => {
    setSelectedIds([]);
    setSelectedEmail(null);
  }, [currentFolder]);

  // Obtenemos la lista activa actual según la carpeta seleccionada
  const currentList = currentFolder === "enviados" ? emails : drafts;
  const folderTitle = currentFolder === "enviados" ? "Enviados" : "Borradores";

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(emailId => emailId !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === currentList.length) setSelectedIds([]);
    else setSelectedIds(currentList.map(e => e.id));
  };

  // Función para Eliminar (aplica para Enviados y Borradores)
  const handleDelete = () => {
    if (selectedIds.length === 0) return;

    const isDrafts = currentFolder === "borradores";
    const targetList = isDrafts ? drafts : emails;
    
    const remaining = targetList.filter(e => !selectedIds.includes(e.id));
    const movingToTrash = targetList.filter(e => selectedIds.includes(e.id));

    const storedTrash = localStorage.getItem("trashEmails");
    const currentTrash = storedTrash ? JSON.parse(storedTrash) : [];
    const newTrash = [...currentTrash, ...movingToTrash];
    
    if (isDrafts) {
      setDrafts(remaining);
      localStorage.setItem("draftEmails", JSON.stringify(remaining));
    } else {
      setEmails(remaining);
      localStorage.setItem("inboxEmails", JSON.stringify(remaining));
    }
    
    localStorage.setItem("trashEmails", JSON.stringify(newTrash));
    setTrashCount(newTrash.length);
    setSelectedIds([]);
  };

  // Función para "Enviar" un correo
  const handleEnviarNuevoCorreo = (formData: { para: string, cc: string, asunto: string, cuerpo: string }) => {
    const now = new Date();
    const fechaCorta = now.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: '2-digit' });
    const fechaLarga = now.toISOString().replace('T', ' ').substring(0, 19);

    const nuevoCorreo: EmailData = {
      id: Date.now(),
      email: formData.para,
      cc: formData.cc,
      subject: formData.asunto,
      hasAttachment: false,
      date: fechaCorta,
      fullDate: fechaLarga,
      from: "danielroman@codecta.pe",
      body: formData.cuerpo,
      attachmentName: ""
    };

    const nuevosCorreos = [nuevoCorreo, ...emails];
    setEmails(nuevosCorreos);
    localStorage.setItem("inboxEmails", JSON.stringify(nuevosCorreos));

    // Si enviamos un correo que era un borrador, lo eliminamos de borradores
    if (editingDraft) {
      const updatedDrafts = drafts.filter(d => d.id !== editingDraft.id);
      setDrafts(updatedDrafts);
      localStorage.setItem("draftEmails", JSON.stringify(updatedDrafts));
    }

    setIsModalOpen(false);
    setEditingDraft(null);
  };

  // Función para guardar en "Borradores"
  const handleGuardarBorrador = (formData: { para: string, cc: string, asunto: string, cuerpo: string }) => {
    const now = new Date();
    const fechaCorta = now.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: '2-digit' });
    const fechaLarga = now.toISOString().replace('T', ' ').substring(0, 19);

    let updatedDrafts;

    if (editingDraft) {
      // Estamos actualizando un borrador que ya existía
      updatedDrafts = drafts.map(d => d.id === editingDraft.id ? {
        ...d,
        email: formData.para,
        cc: formData.cc,
        subject: formData.asunto,
        body: formData.cuerpo,
        date: fechaCorta,
        fullDate: fechaLarga
      } : d);
    } else {
      // Es un borrador completamente nuevo
      const nuevoBorrador: EmailData = {
        id: Date.now(),
        email: formData.para,
        cc: formData.cc,
        subject: formData.asunto || "(Sin Asunto)",
        hasAttachment: false,
        date: fechaCorta,
        fullDate: fechaLarga,
        from: "danielroman@codecta.pe",
        body: formData.cuerpo,
        attachmentName: ""
      };
      updatedDrafts = [nuevoBorrador, ...drafts];
    }

    setDrafts(updatedDrafts);
    localStorage.setItem("draftEmails", JSON.stringify(updatedDrafts));
    setIsModalOpen(false);
    setEditingDraft(null);
  };

  const handleOpenNuevo = () => {
    setEditingDraft(null);
    setIsModalOpen(true);
  };

  const handleClickRow = (email: EmailData) => {
    if (currentFolder === "borradores") {
      setEditingDraft(email);
      setIsModalOpen(true); // Al tocar un borrador, reanudamos el modal
    } else {
      setSelectedEmail(email); // Al tocar un enviado, abrimos la vista de lectura
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full font-sans items-start">
      
      {/* BARRA LATERAL IZQUIERDA */}
      <div className="w-full md:w-[260px] shrink-0 bg-white border border-gray-200 shadow-sm p-4">
        <Button 
          onClick={handleOpenNuevo}
          className="w-full bg-[#1a5eb3] hover:bg-blue-800 text-white font-semibold mb-6 h-9 rounded-sm cursor-pointer transition-colors"
        >
          Redactar
        </Button>

        <h3 className="text-xs font-bold text-gray-500 mb-2 px-1">FOLDERS</h3>

        <ul className="space-y-0.5">
          <li>
            <button 
              onClick={() => setCurrentFolder("enviados")} 
              className={`w-full flex items-center justify-between px-2 py-2 text-[13px] text-gray-800 font-bold border-l-2 cursor-pointer transition-colors ${currentFolder === "enviados" ? "bg-gray-50 border-[#1a5eb3]" : "hover:bg-gray-50 border-transparent"}`}
            >
              <div className="flex items-center gap-2.5">
                <i className="bi bi-inbox-fill text-gray-500 text-base"></i>
                Enviados
              </div>
              <span className="bg-[#1AB394] text-white text-[10px] font-bold px-1.5 py-[1px] rounded-sm">{emails.length}</span>
            </button>
          </li>
          
          <li>
            <button 
              onClick={() => setCurrentFolder("borradores")} 
              className={`w-full flex items-center justify-between px-2 py-2 text-[13px] text-gray-800 font-bold border-l-2 cursor-pointer transition-colors mt-1 ${currentFolder === "borradores" ? "bg-gray-50 border-[#1a5eb3]" : "hover:bg-gray-50 border-transparent"}`}
            >
              <div className="flex items-center gap-2.5">
                <i className="bi bi-envelope text-gray-500 text-base"></i>
                Borradores
              </div>
              <span className="bg-[#f8ac59] text-white text-[10px] font-bold px-1.5 py-[1px] rounded-sm">{drafts.length}</span>
            </button>
          </li>

          <li className="border-b border-gray-100 pb-1 mb-1 mt-1">
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
            <h2 className="text-2xl font-light text-gray-400 mb-6">{folderTitle} ({currentList.length})</h2>

            <div className="flex items-center justify-between border border-gray-200 p-2.5 bg-white mb-2">
              <div className="ml-2 flex items-center">
                <Checkbox 
                  className="border-gray-400 rounded-sm cursor-pointer" 
                  checked={currentList.length > 0 && selectedIds.length === currentList.length}
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
              {currentList.map((email) => (
                <div 
                  key={email.id} 
                  onClick={() => handleClickRow(email)} 
                  className={`flex items-center border-b border-gray-200 p-3 hover:bg-gray-50 transition-colors cursor-pointer ${selectedIds.includes(email.id) ? 'bg-gray-50' : ''}`}
                >
                  <div onClick={(e) => e.stopPropagation()}>
                    <Checkbox 
                      className="ml-2 mr-6 border-gray-400 rounded-sm cursor-pointer" 
                      checked={selectedIds.includes(email.id)}
                      onCheckedChange={() => toggleSelect(email.id)}
                    />
                  </div>
                  <div className="w-[200px] shrink-0 text-[13px] text-gray-600 truncate pr-4">
                    {email.email || "(Sin Destinatario)"}
                  </div>
                  <div className="flex-1 text-[13px] text-gray-600 truncate pr-4">
                    <span className={!email.subject ? "italic text-gray-400" : ""}>
                      {email.subject || "(Sin Asunto)"}
                    </span>
                    {currentFolder === "borradores" && <span className="text-orange-400 font-medium ml-2">- Borrador</span>}
                  </div>
                  <div className="w-10 flex justify-center text-gray-400">
                    {email.hasAttachment && <i className="bi bi-paperclip text-[15px] transform rotate-45"></i>}
                  </div>
                  <div className="w-20 text-right text-[12px] text-gray-600 pr-2">{email.date}</div>
                </div>
              ))}
              {currentList.length === 0 && (
                <div className="p-6 text-center text-[13px] text-gray-400">Bandeja vacía.</div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-[26px] font-light text-gray-400">Ver Correo</h2>
              <div className="flex gap-1.5">
                <Button onClick={() => setSelectedEmail(null)} className="bg-gray-500 hover:bg-gray-600 text-white h-8 px-4 rounded-sm text-[13px] font-medium flex items-center gap-1.5 cursor-pointer">
                  <i className="bi bi-arrow-left text-base"></i> Volver
                </Button>
              </div>
            </div>
            <div className="p-5 flex flex-col gap-3">
              <div className="text-[15px] text-gray-600">Asunto: <span className="font-bold text-gray-800">{selectedEmail.subject}</span></div>
              <div className="flex justify-between items-start">
                <div className="text-[13px] text-gray-600 leading-snug">
                  <div>De: <span className="font-bold text-gray-800">{selectedEmail.from}</span></div>
                  <div>Para: <span className="font-bold text-gray-800">{selectedEmail.email}</span></div>
                  {selectedEmail.cc && <div>CC: <span className="font-bold text-gray-800">{selectedEmail.cc}</span></div>}
                </div>
                <div className="text-[13px] text-gray-500">{selectedEmail.fullDate}</div>
              </div>
            </div>
            {/* Visualizamos el cuerpo como HTML ya que viene del editor Quill */}
            <div 
              className="p-5 py-8 border-y border-gray-100 text-[13px] text-gray-600 min-h-[120px]"
              dangerouslySetInnerHTML={{ __html: selectedEmail.body }}
            />
          </div>
        )}
      </div>

      <ComposeEmailModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingDraft(null); // Al cerrar manualmente, perdemos referencia al borrador en edición
        }} 
        onSend={handleEnviarNuevoCorreo}
        onSaveDraft={handleGuardarBorrador}
        initialData={editingDraft ? {
          para: editingDraft.email,
          cc: editingDraft.cc || "",
          asunto: editingDraft.subject,
          cuerpo: editingDraft.body
        } : null}
      />
    </div>
  );
}