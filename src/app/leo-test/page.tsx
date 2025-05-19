'use client';

import { useState } from 'react';

export default function LeoTestPage() {
  const [form, setForm] = useState({
    rating_id: '',
    project_id: '',
    user: '',
    value: '',
    timestamp: ''
  });
  const [result, setResult] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddRating = () => {
    // Here you would call the Leo add_rating function
    setResult(`add_rating called with: ${JSON.stringify(form)}`);
  };

  const handleGetRating = () => {
    // Here you would call the Leo get_rating function
    setResult(`get_rating called with rating_id: ${form.rating_id}`);
  };

  return (
    <div className="max-w-xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Test Leo Ratings Program</h1>
      <div className="space-y-4">
        <input name="rating_id" placeholder="Rating ID (field)" className="input w-full" value={form.rating_id} onChange={handleChange} />
        <input name="project_id" placeholder="Project ID (field)" className="input w-full" value={form.project_id} onChange={handleChange} />
        <input name="user" placeholder="User (address)" className="input w-full" value={form.user} onChange={handleChange} />
        <input name="value" placeholder="Value (u8)" className="input w-full" value={form.value} onChange={handleChange} />
        <input name="timestamp" placeholder="Timestamp (u64)" className="input w-full" value={form.timestamp} onChange={handleChange} />
        <div className="flex gap-4">
          <button className="btn btn-primary" onClick={handleAddRating}>Add Rating</button>
          <button className="btn btn-secondary" onClick={handleGetRating}>Get Rating</button>
        </div>
        {result && <div className="mt-4 p-4 bg-gray-100 rounded">{result}</div>}
      </div>
    </div>
  );
} 