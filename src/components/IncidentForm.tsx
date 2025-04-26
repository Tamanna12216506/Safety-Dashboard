import React, { useState } from 'react';

interface IncidentFormProps {
  onSubmit: (newIncident: { title: string; description: string; severity: string }) => void;
}

const IncidentForm: React.FC<IncidentFormProps> = ({ onSubmit }) => {
  const [newIncident, setNewIncident] = useState({
    title: '',
    description: '',
    severity: 'Low',
  });
  const [formError, setFormError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewIncident((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newIncident.title || !newIncident.description) {
      setFormError('Please fill in all fields.');
      return;
    }

    onSubmit(newIncident);
    setNewIncident({ title: '', description: '', severity: 'Low' });
    setFormError('');
  };

  return (
    <div>
      <h3>Report New Incident</h3>
      {formError && <p style={{ color: 'orange' }}>{formError}</p>}
      <form onSubmit={handleFormSubmit}>
        {['title', 'description'].map((field) => (
          <div key={field}>
            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}: </label>
            {field === 'description' ? (
              <textarea
                id={field}
                name={field}
                value={newIncident[field as keyof typeof newIncident]}
                onChange={handleInputChange}
              />
            ) : (
              <input
                type={field === 'title' ? 'text' : 'text'}
                id={field}
                name={field}
                value={newIncident[field as keyof typeof newIncident]}
                onChange={handleInputChange}
              />
            )}
          </div>
        ))}
        <div>
          <label htmlFor="severity">Severity: </label>
          <select
            id="severity"
            name="severity"
            value={newIncident.severity}
            onChange={handleInputChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button type="submit">Submit Incident</button>
      </form>
    </div>
  );
};

export default IncidentForm;
