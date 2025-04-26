import React from 'react';

interface Incident {
  id: number;
  title: string;
  severity: string;
  description: string;
  reported_at: string;
}

interface IncidentListProps {
  incidents: Incident[];
  severityFilter: string;
  sortOrder: string;
  expandedIncidents: Set<number>;
  toggleDescription: (id: number) => void;
}

const IncidentList: React.FC<IncidentListProps> = ({
  incidents,
  severityFilter,
  sortOrder,
  expandedIncidents,
  toggleDescription,
}) => {
  // Filter incidents based on severity
  const filteredIncidents = severityFilter === 'All'
    ? incidents
    : incidents.filter((incident) => incident.severity === severityFilter);

  // Sort incidents based on date
  const sortedIncidents = filteredIncidents.sort((a, b) => {
    const dateA = new Date(a.reported_at);
    const dateB = new Date(b.reported_at);
    return sortOrder === 'Newest First'
      ? dateB.getTime() - dateA.getTime()
      : dateA.getTime() - dateB.getTime();
  });

  return (
    <ul>
      {sortedIncidents.map(({ id, title, severity, reported_at, description }) => (
        <li key={id}>
          <h3>{title}</h3>
          <p><strong>Severity:</strong> {severity}</p>
          <p><strong>Reported At:</strong> {new Date(reported_at).toLocaleString()}</p>

          <button onClick={() => toggleDescription(id)}>
            {expandedIncidents.has(id) ? 'Hide Details' : 'View Details'}
          </button>

          {expandedIncidents.has(id) && <p><strong>Description:</strong> {description}</p>}
        </li>
      ))}
    </ul>
  );
};

export default IncidentList;
