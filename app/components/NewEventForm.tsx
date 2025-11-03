
import React, { useState } from 'react';
import { Form, Link, useNavigate } from 'react-router';
import { LieuInput } from './LieuInput';
import { TarifInput } from './TarifInput';
import { FileUpload } from './FileUpload';

export const NewEventForm = () => {
  const [form, setForm] = useState({
    titre: '',
    description: '',
    date_debut: '',
    date_fin: '',  
    type_evenement: '',
    lieu: {
      nom: '',
      adresse: '',
      ville: '',
      capacite: ''
     
    },
    tarifs: [],
    fichiers: [],
  });

  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form:', form);
    
    try {
      const response = await fetch('https://2527cf11056ca5ab863191300ee420ab.serveo.net/v1/evenements', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response:', data);
      navigate('/events');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container mx-auto  pt-20 bg-white min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Nouvel événement</h2>
        <p className="text-gray-500 mb-6">Créez un nouvel événement à venir</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations de base */}
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

          {/* Type et dates */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="type_evenement" className="block text-sm font-medium text-gray-700">
                Type d'événement
              </label>
              <select
                id="type_evenement"
                value={form.type_evenement}
                onChange={handleChange('type_evenement')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
                <option value="">Sélectionnez un type</option>
                <option value="1">Conférence</option>
                <option value="2">Concert</option>
                <option value="3">Concert</option>
                <option value="4">Spectacle</option>
                <option value="5">Exposition</option>
                <option value="6">Autre</option>
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
                  id="date_debut"
                  value={form.date_fin}
                  onChange={handleChange('date_fin')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              
            </div>

      
          </div>

          {/* Lieu */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Lieu de l'événement</h3>
            <LieuInput 
              value={form.lieu} 
              onChange={(lieu) => setForm(prev => ({ ...prev, lieu }))}
            />
          </div>

          {/* Tarifs */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Tarifs</h3>
            <TarifInput
              value={form.tarifs}
              onChange={(tarifs) => setForm(prev => ({ ...prev, tarifs }))}
            />
          </div>

          {/* Image */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Image de l'événement</h3>
            <FileUpload
              onFileChange={(filesArray) => setForm(prev => ({ ...prev, fichiers: filesArray || [] }))}
            />
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end space-x-4 pt-6">
            <Link
              to="/admin"
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Annuler
            </Link>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Créer l'événement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};