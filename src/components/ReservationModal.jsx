import React, { useState } from 'react'
import Button from './Button'
import { services } from '../data'

const ReservationModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('Manicure')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [note, setNote] = useState('')

  if (!isOpen) return null

  const sendWhatsApp = () => {
    const msg = `Hola, quiero agendar una cita.%0A%0ANombre: ${encodeURIComponent(name)}%0ATeléfono: ${encodeURIComponent(phone)}%0AServicio: ${encodeURIComponent(service)}%0AFecha: ${encodeURIComponent(date)}%0AHora: ${encodeURIComponent(time)}%0ANota: ${encodeURIComponent(note)}`
    const url = `https://wa.me/573174925427?text=${msg}`
    window.open(url, '_blank')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-xl w-11/12 max-w-xl p-6">
        <h3 className="text-xl font-bold mb-4">Reservar una cita</h3>

        <div className="grid grid-cols-1 gap-3">
          <label className="text-sm">Nombre</label>
          <input className="p-2 border rounded-md" value={name} onChange={e => setName(e.target.value)} />

          <label className="text-sm">Teléfono</label>
          <input className="p-2 border rounded-md" value={phone} onChange={e => setPhone(e.target.value)} />

          <label className="text-sm">Servicio</label>
          <select className="p-2 border rounded-md" value={service} onChange={e => setService(e.target.value)}>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-sm">Fecha</label>
              <input type="date" className="p-2 border rounded-md w-full" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div>
              <label className="text-sm">Hora</label>
              <input type="time" className="p-2 border rounded-md w-full" value={time} onChange={e => setTime(e.target.value)} />
            </div>
          </div>

          <label className="text-sm">Nota (opcional)</label>
          <textarea className="p-2 border rounded-md" rows={3} value={note} onChange={e => setNote(e.target.value)} />
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button className="px-4 py-2 rounded-full border" onClick={onClose}>Cancelar</button>
          <Button primary onClick={sendWhatsApp}>Enviar por WhatsApp</Button>
        </div>
      </div>
    </div>
  )
}

export default ReservationModal
