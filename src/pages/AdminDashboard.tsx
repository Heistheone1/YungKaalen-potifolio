import React from 'react';
import { useContent } from '../context/ContentContext';
import { Navigate } from 'react-router-dom';
import SectionEditor from '../components/SectionEditor';
import * as Hero from '../components/Hero';
import * as ProfessionalStandards from '../components/ProfessionalStandards';
import * as TrustedPartners from '../components/TrustedPartners';

export default function AdminDashboard() {
  const { isAdmin } = useContent();

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white p-8">
      <h1 className="text-4xl font-display font-bold mb-8 text-gold-primary">Admin Dashboard</h1>
      
      <div className="space-y-8">
        <div className="bg-dark-card p-6 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-bold mb-4">Hero Section</h2>
          <SectionEditor 
            sectionId="hero"
            initialData={Hero.defaultData}
            fields={Hero.fields}
          />
        </div>
        
        <div className="bg-dark-card p-6 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-bold mb-4">Professional Standards Section</h2>
          <SectionEditor 
            sectionId="professionalStandards"
            initialData={ProfessionalStandards.defaultData}
            fields={ProfessionalStandards.fields}
          />
        </div>

        <div className="bg-dark-card p-6 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-bold mb-4">Trusted Partners Section</h2>
          <SectionEditor 
            sectionId="trustedPartners"
            initialData={TrustedPartners.defaultData}
            fields={TrustedPartners.fields}
          />
        </div>
      </div>
    </div>
  );
}
