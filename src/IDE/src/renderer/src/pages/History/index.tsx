import React, { useState } from 'react';
import './styles.css';

interface SessionData {
    patientName: string;
    date: string;
    notes: string;
}

const History: React.FC = () => {
    const [sessionData, setSessionData] = useState<SessionData[]>([
        {
            patientName: 'Gabrio Lina',
            date: '2022-01-01',
            notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            patientName: 'Gabrio Lina',
            date: '2022-01-05',
            notes: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
    ]);

    const [filterText, setFilterText] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterText(event.target.value);
    };

    const handleSortOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(event.target.value as 'asc' | 'desc');
    };

    const filteredData = sessionData.filter((session) =>
        session.patientName.toLowerCase().includes(filterText.toLowerCase())
    );

    const sortedData = filteredData.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.date.localeCompare(b.date);
        } else {
            return b.date.localeCompare(a.date);
        }
    });
    
    return (
        <div className="history-container">
            <h1>Histórico das sessões</h1>
            <div className='filter-sort-container'>
                <div className="filter-container">
                    <label htmlFor="filterInput">Filtrar por paciente:</label>
                    <input
                        id="filterInput"
                        type="text"
                        placeholder='Maria Julia'
                        value={filterText}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="sort-container">
                    <label htmlFor="sortSelect">Ordenar por data:</label>
                    <select id="sortSelect" value={sortOrder} onChange={handleSortOrderChange}>
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                </div>
            </div>
            <table className="session-table" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th>Paciente</th>
                        <th>Data</th>
                        <th>Notas</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((session, index) => (
                        <tr key={index}>
                            <td>{session.patientName}</td>
                            <td>{session.date}</td>
                            <td>{session.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default History;
