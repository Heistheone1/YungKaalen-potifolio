import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { Edit2, X, Upload, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface SectionEditorProps {
  sectionId: string;
  initialData: any;
  fields: { key: string; label: string; type: 'text' | 'textarea' | 'image' | 'audio' }[];
}

export default function SectionEditor({ sectionId, initialData, fields }: SectionEditorProps) {
  const { isAdmin, content, updateSection } = useContent();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [uploading, setUploading] = useState(false);

  // Update form data when content changes from DB
  useEffect(() => {
    if (content[sectionId]) {
      setFormData({ ...initialData, ...content[sectionId] });
    } else {
      setFormData(initialData);
    }
  }, [content, sectionId, initialData]);

  const handleSave = async () => {
    await updateSection(sectionId, formData);
    setIsOpen(false);
  };

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const storageRef = ref(storage, `audio/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setFormData((prev: any) => ({ ...prev, [key]: downloadURL }));
    } catch (error) {
      console.error("Error uploading audio:", error);
      alert("Failed to upload audio.");
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7); // Compress to 70% quality
        setFormData((prev: any) => ({ ...prev, [key]: dataUrl }));
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  if (!isAdmin) return null;

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        className="absolute top-4 right-4 z-50 p-2 bg-gold-primary text-black rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        <Edit2 size={16} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-card border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gold-primary">Edit {sectionId}</h3>
                <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                {fields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm text-white/60 mb-1">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={formData[field.key] || ''}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-primary outline-none min-h-[100px]"
                      />
                    ) : field.type === 'image' ? (
                      <div className="space-y-3">
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={formData[field.key] || ''}
                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                            placeholder="Enter image URL..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-primary outline-none text-sm"
                          />
                          <label className="cursor-pointer bg-white/10 hover:bg-gold-primary hover:text-black text-white border border-white/10 hover:border-gold-primary rounded-lg px-4 py-2 flex items-center gap-2 transition-all duration-300 group">
                            <Upload size={18} className="group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-bold">Upload</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => handleImageUpload(e, field.key)}
                            />
                          </label>
                        </div>
                        {formData[field.key] && (
                          <div className="relative w-full h-48 bg-black/40 rounded-xl overflow-hidden border border-white/10 group">
                            <img 
                              src={formData[field.key]} 
                              alt="Preview" 
                              className="w-full h-full object-contain" 
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <p className="text-white text-xs font-mono">Current Image</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : field.type === 'audio' ? (
                      <div className="space-y-3">
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={formData[field.key] || ''}
                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                            placeholder="Enter audio URL..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-primary outline-none text-sm"
                          />
                          <label className="cursor-pointer bg-white/10 hover:bg-gold-primary hover:text-black text-white border border-white/10 hover:border-gold-primary rounded-lg px-4 py-2 flex items-center gap-2 transition-all duration-300 group">
                            <Music size={18} className="group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-bold">{uploading ? 'Uploading...' : 'Upload'}</span>
                            <input 
                              type="file" 
                              accept="audio/*" 
                              className="hidden" 
                              onChange={(e) => handleAudioUpload(e, field.key)}
                              disabled={uploading}
                            />
                          </label>
                        </div>
                        {formData[field.key] && (
                          <audio src={formData[field.key]} controls className="w-full" />
                        )}
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={formData[field.key] || ''}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-primary outline-none"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-end gap-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 rounded-lg bg-gold-primary text-black font-bold hover:bg-gold-light"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
