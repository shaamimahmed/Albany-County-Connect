
import React, { useState, useRef } from 'react';
import { Ticket, TicketStatus } from '../types';
import { analyzeIssueImage } from '../services/geminiService';
import TicketCard from './TicketCard';
import { UploadIcon, SparklesIcon, XCircleIcon } from './icons/MiscIcons';

interface TicketSystemProps {
  tickets: Ticket[];
  addTicket: (ticket: Ticket) => void;
}

const TicketSystem: React.FC<TicketSystemProps> = ({ tickets, addTicket }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string>('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setImageBase64(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeClick = async () => {
    if (!imageBase64 || !imageFile) {
      setError('Please select an image first.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeIssueImage(imageBase64, imageFile.type);
      setDescription(result.description);
      setDepartment(result.department);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!description || !department || !imageBase64) {
      setError('Please analyze an image to generate a description and department before submitting.');
      return;
    }
    const newTicket: Ticket = {
      id: `TICKET-${Date.now()}`,
      description,
      department,
      status: TicketStatus.Open,
      timestamp: new Date().toLocaleString(),
      image: imageBase64,
    };
    addTicket(newTicket);
    resetForm();
  };

  const resetForm = () => {
    setImageFile(null);
    setImageBase64('');
    setDescription('');
    setDepartment('');
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Report an Issue</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload or Capture Image of Issue
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {imageBase64 ? (
                <div className="relative group">
                    <img src={`data:image/jpeg;base64,${imageBase64}`} alt="Issue preview" className="mx-auto h-48 w-auto rounded-md object-contain" />
                    <button type="button" onClick={resetForm} className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity">
                        <XCircleIcon className="w-6 h-6" />
                    </button>
                </div>
              ) : (
                <>
                  <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-county-blue-600 hover:text-county-blue-500 focus-within:outline-none">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} ref={fileInputRef} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </>
              )}
            </div>
          </div>
        </div>

        {imageFile && (
          <button
            type="button"
            onClick={handleAnalyzeClick}
            disabled={isLoading}
            className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-county-blue-600 hover:bg-county-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-county-blue-500 disabled:bg-gray-400"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                <SparklesIcon className="-ml-1 mr-2 h-5 w-5" />
                Analyze with AI
              </>
            )}
          </button>
        )}
        
        {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">AI-Generated Description</label>
          <textarea id="description" rows={3} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50" value={description} readOnly placeholder="AI analysis will appear here..."></textarea>
        </div>
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">Suggested Department</label>
          <input type="text" id="department" className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50" value={department} readOnly placeholder="AI suggestion will appear here..."/>
        </div>
        <button
          type="submit"
          disabled={!description || !department}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
        >
          Submit Ticket
        </button>
      </form>

      {tickets.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Submitted Tickets</h4>
          <div className="space-y-4">
            {tickets.map(ticket => <TicketCard key={ticket.id} ticket={ticket} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketSystem;
