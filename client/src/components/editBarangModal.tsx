import React, { useState, useEffect } from 'react';
import { X } from 'react-feather';
import { Button } from '@/components/button';
import CustomTextBox from '@/components/customTextBox';
import { toast } from 'react-toastify';

interface EditBarangModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: EditBarangFormData) => void;
  barangId: string;
}

export interface EditBarangFormData {
  namaBarang: string;
  tempatDitemukan: string;
  waktuDitemukan: string;
  deskripsiBarang: string;
  foto: File | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const EditBarangModal: React.FC<EditBarangModalProps> = ({ isOpen, onClose, onSubmit, barangId }) => {
  const [formData, setFormData] = useState<EditBarangFormData>({
    namaBarang: '',
    tempatDitemukan: '',
    waktuDitemukan: '',
    deskripsiBarang: '',
    foto: null
  });
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (barangId) {
      // Fetch the barang data from the database
      fetch(`${API_URL}/api/barang/${barangId}`)
        .then(response => response.json())
        .then(data => {
          setFormData({
            namaBarang: data.namaBarang,
            tempatDitemukan: data.tempatDitemukan,
            waktuDitemukan: data.waktuDitemukan,
            deskripsiBarang: data.deskripsiBarang,
            foto: null
          });
          setPreviewUrl(data.foto);
        })
        .catch(error => console.error('Error fetching barang data:', error));
    }
  }, [barangId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.warn('Image size should be less than 5MB', {closeOnClick: true});
        return;
      }
      setFormData({ ...formData, foto: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (!formData.namaBarang || !formData.tempatDitemukan || !formData.waktuDitemukan) {
        throw new Error('Please fill in all required fields');
      }
  
      // Create a proper date object with today's date and the selected time 
      const today = new Date();
      const [hours, minutes] = formData.waktuDitemukan.split(':');
      const waktuDitemukan = new Date(
        today.getFullYear(),
        today.getMonth(), 
        today.getDate(),
        parseInt(hours),
        parseInt(minutes)
      );
  
      const updatedData: any = {
        namaBarang: formData.namaBarang,
        tempatDitemukan: formData.tempatDitemukan,
        waktuDitemukan: waktuDitemukan.toISOString(), // Convert to ISO string
        deskripsiBarang: formData.deskripsiBarang
      };
  
      // Only handle image upload if a new image was selected
      if (formData.foto) {
        const imageFormData = new FormData();
        imageFormData.append('file', formData.foto);
  
        const uploadResponse = await fetch(`${API_URL}/api/upload`, {
          method: 'POST', 
          body: imageFormData,
        });
  
        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image');
        }
  
        const uploadResult = await uploadResponse.json();
  
        if (!uploadResult.imageUrl) {
          throw new Error('No image URL received from server');
        }
  
        updatedData.foto = uploadResult.imageUrl;
      }
  
      const submitResponse = await fetch(`${API_URL}/api/barang/${barangId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });
  
      if (!submitResponse.ok) {
        const errorData = await submitResponse.json();
        throw new Error(errorData.message || 'Failed to update barang');
      }
  
      onSubmit(formData);
      onClose();
      toast.success('Barang updated successfully!', {closeOnClick: true});
      window.location.reload();
  
    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update barang. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-xl font-bold text-black">Edit Barang Laporan</h2>
          <button onClick={onClose} className="p-1">
            <X className="w-6 h-6 stroke-[#1457D2]" />
          </button>
        </div>
        
        <p className="text-[#667479] text-sm mb-3 pb-4 border-b border-gray-300">
          Harap isikan data sesuai dengan keadaan aslinya
        </p>
  
        <form className="space-y-2" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-4">
            <label className="text-[#667479] text-lg">Nama Barang*</label>
            <CustomTextBox
              type="text"
              value={formData.namaBarang}
              onChange={(e) => setFormData({...formData, namaBarang: e.target.value})}
              placeholder="Masukkan nama barang"
            />
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-4">
            <label className="text-[#667479] text-lg">Tempat Menemukan*</label>
            <CustomTextBox
              type="text"
              value={formData.tempatDitemukan}
              onChange={(e) => setFormData({...formData, tempatDitemukan: e.target.value})}
              placeholder="Masukkan lokasi barang ditemukan"
            />
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-4">
            <label className="text-[#667479] text-lg">Jam*</label>
            <CustomTextBox
              type="time"
              value={formData.waktuDitemukan}
              onChange={(e) => setFormData({...formData, waktuDitemukan: e.target.value})}
            />
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-start gap-4 pb-4 border-b border-gray-300">
            <label className="text-[#667479] text-lg pt-2">Deskripsi</label>
            <textarea
              value={formData.deskripsiBarang}
              onChange={(e) => setFormData({...formData, deskripsiBarang: e.target.value})}
              placeholder="Masukkan deskripsi barang"
              className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-black leading-tight border-gray-300 focus:outline-none focus:ring-2 focus:ring-lightBlue-500 min-h-[100px] resize-none"
            />
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-4 pb-4 border-b border-gray-300">
            <label className="text-[#667479] text-lg">Gambar*</label>
            <div className="flex items-start gap-6">
              <div className="h-[80px] w-[80px] rounded-full bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <img 
                    src="/EmptyImageIcon.png" 
                    alt="Empty" 
                    className="w-10 h-10"
                  />
                )}
              </div>
              <div 
                className="border-2 border-dashed rounded-xl p-4 text-center flex-grow"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add('border-darkBlue1'); 
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('border-darkBlue1');
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('border-darkBlue1');
                  const file = e.dataTransfer.files?.[0];
                  
                  if (file) {
                    // Validate file type
                    if (file.type.match(/^image\/(png|jpeg|jpg)$/)) {
                      setFormData(prev => ({ ...prev, foto: file }));
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPreviewUrl(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    } else {
                      toast.warn('Please upload a PNG, JPG or JPEG file', {closeOnClick: true});
                    }
                  }
                }}
              >
                <div className="flex flex-col items-center">
                  <label className="cursor-pointer">
                    <span className="text-darkBlue1 hover:underline">Click to upload</span>
                    <span className="text-[#667479] text-sm ml-1">or drag and drop</span>
                    <br />
                    <span className="text-[#667479] text-sm">PNG, JPG or JPEG</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-6 mt-6">
            <Button variant="outline" type="button" onClick={onClose} className="px-8 py-2 w-full md:w-auto">
              Cancel
            </Button>
            <Button variant="default" type="submit" className="px-8 py-2 w-full md:w-auto"  disabled={loading}>
              {loading ? 'Submitting...' : 'Confirm'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBarangModal;
