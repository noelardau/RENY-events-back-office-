import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { LieuInput } from './LieuInput';
import { TarifInput } from './TarifInput';
import { FileUpload } from './FileUpload';
import { Button } from '@mantine/core';

// === Convertir Base64 → Hex ===
const base64ToHex = (base64: string): string => {
  const base64Data = base64.replace(/^data:image\/[a-z]+;base64,/, '');
  const binaryString = atob(base64Data);
  let hex = '';
  for (let i = 0; i < binaryString.length; i++) {
    hex += binaryString.charCodeAt(i).toString(16).padStart(2, '0');
  }
  return hex.toUpperCase();
};

// === Convertir date YYYY-MM-DD → ISO 8601 ===
const formatDateToISO = (dateStr: string): string => {
  if (!dateStr) return '';
  return `${dateStr}T00:00:00Z`; // Minuit UTC
};

export const NewEventForm = () => {
  const [form, setForm] = useState({
    titre: '',
    description: '',
    date_debut: '',
    date_fin: '',
    type_id: '',
    lieu_nom: '',
    lieu_adresse: '',
    lieu_ville: '',
    lieu_capacite: '',
    tarifs: [],
    fichiers: [],
  });

  const navigate = useNavigate();

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // === 1. Formater les dates ===
    const date_debut = formatDateToISO(form.date_debut);
    const date_fin = formatDateToISO(form.date_fin);

    if (!date_debut || !date_fin) {
      alert('Veuillez sélectionner des dates valides');
      return;
    }

    // === 2. Convertir les fichiers en hex ===
    const fichiersAvecHex = form.fichiers.map((f: any) => ({
      ...f,
      donnees_bytea: base64ToHex(f.donnees_bytea),
    }));

    // === 3. Construire le payload ===
    const payload = {
      ...form,
      date_debut,
      date_fin,
      lieu_capacite: parseInt(form.lieu_capacite, 10) || 0,
      tarifs: form.tarifs.map((t: any) => ({
        ...t,
        prix: Number(t.prix),
        nombre_places: Number(t.nombre_places),
      })),
      fichiers: fichiersAvecHex,
    };

    console.log('Payload envoyé:', payload);

    try {
      const response = await fetch('https://backend-reny-event.onrender.com/v1/evenements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('Succès:', data);
      alert('Événement créé !');
      // navigate('/events');
    } catch (error: any) {
      console.error('Erreur:', error);
      alert('Erreur : ' + error.message);
    }
  };

  return (
    <div className="container mx-auto pt-10 bg-white min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
       

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* === Titre & Description === */}
          <div className="space-y-4">
            <div>
              <label htmlFor="titre" className="block text-sm font-medium text-gray-700">
                Titre de l'événement
              </label>
              <input
                type="text"
                id="titre"
                value={form.titre}
                onChange={handleChange('titre')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={form.description}
                onChange={handleChange('description')}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>

          {/* === Type & Dates === */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="type_id" className="block text-sm font-medium text-gray-700">
                Type d'événement
              </label>
              <select
                id="type_id"
                value={form.type_id}
                onChange={handleChange('type_id')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
                <option value="">Sélectionnez un type</option>
                <option value="b688869b-f36f-4fad-bcd9-27fe25785ecb">Conférence</option>
                <option value="autre-uuid">Concert</option>
              </select>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="date_debut" className="block text-sm font-medium text-gray-700">
                  Date de début
                </label>
                <input
                  type="date"
                  id="date_debut"
                  value={form.date_debut}
                  onChange={handleChange('date_debut')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="date_fin" className="block text-sm font-medium text-gray-700">
                  Date de fin
                </label>
                <input
                  type="date"
                  id="date_fin"
                  value={form.date_fin}
                  onChange={handleChange('date_fin')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </div>
          </div>

          {/* === Lieu === */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Lieu de l'événement</h3>
            <LieuInput
              value={{
                nom: form.lieu_nom,
                adresse: form.lieu_adresse,
                ville: form.lieu_ville,
                capacite: form.lieu_capacite,
              }}
              onChange={(lieu) =>
                setForm((prev) => ({
                  ...prev,
                  lieu_nom: lieu.nom,
                  lieu_adresse: lieu.adresse,
                  lieu_ville: lieu.ville,
                  lieu_capacite: lieu.capacite,
                }))
              }
            />
          </div>

          {/* === Tarifs === */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Tarifs</h3>
            <TarifInput
              value={form.tarifs}
              onChange={(tarifs) => setForm((prev) => ({ ...prev, tarifs }))}
            />
          </div>

          {/* === Image === */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Image de l'événement</h3>
            <FileUpload
              onFileChange={(filesArray) =>
                setForm((prev) => ({ ...prev, fichiers: filesArray || [] }))
              }
            />
          </div>

          {/* === Boutons === */}
          <div className="flex justify-end space-x-4 pt-6">
            <Link
              to="/event"
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Annuler
            </Link>
            <Button variant="outline" color="red"
              type="submit"
              // className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Créer l'événement
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};