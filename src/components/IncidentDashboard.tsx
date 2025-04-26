import React, { useState } from 'react';
import { mockData } from './MockData';
import IncidentList from './IncidentList';
import IncidentForm from './IncidentForm';

const IncidentDashboard: React.FC = () => {
  const [severityFilter, setSeverityFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest First');
  const [expandedIncidents, setExpandedIncidents] = useState<Set<number>>(new Set());
  const [incidents, setIncidents] = useState(mockData);

  const toggleDescription = (id: number) => {
    setExpandedIncidents((prev) => {
      const newExpanded = new Set(prev);
      newExpanded.has(id) ? newExpanded.delete(id) : newExpanded.add(id);
      return newExpanded;
    });
  };

  const handleNewIncidentSubmit = ({ title, description, severity }: { title: string; description: string; severity: string }) => {
    const newIncidentData = {
      id: incidents.length + 1,
      title,
      severity,
      description,
      reported_at: new Date().toISOString(),
    };
    setIncidents((prev) => [...prev, newIncidentData]);
  };

  return (
    <div>
      <h2>AI Safety Incident Dashboard</h2>

      <div className="filters-container">
        <div className="filter">
          <label htmlFor="severity">Filter by Severity:</label>
          <select
            id="severity"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="filter">
          <label htmlFor="sortOrder">Reported Date:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="Newest First">Newest First</option>
            <option value="Oldest First">Oldest First</option>
          </select>
        </div>
      </div>

      <IncidentList
        incidents={incidents}
        severityFilter={severityFilter}
        sortOrder={sortOrder}
        expandedIncidents={expandedIncidents}
        toggleDescription={toggleDescription}
      />

      <IncidentForm onSubmit={handleNewIncidentSubmit} />
    </div>
  );
};

export default IncidentDashboard;
