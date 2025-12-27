'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface UploadFormProps {
  subscriptionId: string;
  adType: 'banner' | 'classified' | 'review';
}

export function UploadForm({ subscriptionId, adType }: UploadFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    url: '',
    description: '',
    review_brief: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createClient();
      let bannerImageUrl = '';

      // Upload banner image if provided
      if (file && (adType === 'banner' || adType === 'review')) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${subscriptionId}-${Date.now()}.${fileExt}`;
        const filePath = `banners/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('ads')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('ads')
          .getPublicUrl(filePath);

        bannerImageUrl = publicUrl;
      }

      // Generate slug for reviews
      let slug: string | undefined;
      if (adType === 'review' && formData.description) {
        slug = formData.description
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }

      // Create ad record
      const { data: ad, error: adError } = await supabase
        .from('ads')
        .insert({
          subscription_id: subscriptionId,
          type: adType,
          url: formData.url,
          description: formData.description || null,
          banner_image_url: bannerImageUrl || null,
          review_brief: formData.review_brief || null,
          slug: slug || null,
          approved: adType === 'review' ? false : true, // Auto-approve banner/classified
        })
        .select()
        .single();

      if (adError) throw adError;

      alert(adType === 'review' 
        ? 'Review submitted! It will be published after admin approval.'
        : 'Ad created and approved!'
      );
      
      router.refresh();
      setFormData({ url: '', description: '', review_brief: '' });
      setFile(null);
    } catch (error: any) {
      console.error('Error creating ad:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2">
          URL <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          required
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 focus:border-betting-green focus:outline-none"
          placeholder="https://example.com"
        />
      </div>

      {(adType === 'classified' || adType === 'review') && (
        <div>
          <label className="block text-sm font-semibold mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 focus:border-betting-green focus:outline-none"
            placeholder="Brief description of your site"
          />
        </div>
      )}

      {adType === 'review' && (
        <div>
          <label className="block text-sm font-semibold mb-2">
            Review Brief
          </label>
          <textarea
            value={formData.review_brief}
            onChange={(e) => setFormData({ ...formData, review_brief: e.target.value })}
            className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 focus:border-betting-green focus:outline-none"
            rows={3}
            placeholder="Short summary for directory listing"
          />
        </div>
      )}

      {(adType === 'banner' || adType === 'review') && (
        <div>
          <label className="block text-sm font-semibold mb-2">
            Banner Image {adType === 'banner' && <span className="text-red-500">*</span>}
          </label>
          <input
            type="file"
            required={adType === 'banner'}
            accept="image/*"
            onChange={handleFileChange}
            className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 focus:border-betting-green focus:outline-none"
          />
          {file && (
            <p className="mt-2 text-sm text-gray-400">Selected: {file.name}</p>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-betting-green text-betting-darker py-3 rounded font-semibold hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Ad'}
      </button>
    </form>
  );
}

