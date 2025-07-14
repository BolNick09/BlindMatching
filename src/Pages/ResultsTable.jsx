import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function ResultsTable() 
{
  const [results, setResults] = useState([]);
  const playerName = useSelector(state => state.reduceSaver.playerName);

  useEffect(() => 
  {
    const storedResults = JSON.parse(localStorage.getItem('memoryGameResults')) || [];
    setResults(storedResults.sort((a, b) => b.score - a.score));
  }, []);

  return (
    <div style={{ margin: '20px', maxWidth: '600px' }}>
      <h2>Таблица рекордов</h2>
      {playerName && <p>Текущий игрок: {playerName}</p>}
      {results.length === 0 ? (
        <p>Пока нет сохраненных результатов</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Место</th>
              <th style={tableHeaderStyle}>Игрок</th>
              <th style={tableHeaderStyle}>Очки</th>
              <th style={tableHeaderStyle}>Дата</th>
              <th style={tableHeaderStyle}>Время (сек)</th>
              <th style={tableHeaderStyle}>Клики</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index} style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
                <td style={tableCellStyle}>{index + 1}</td>
                <td style={tableCellStyle}>{result.playerName || 'Аноним'}</td>
                <td style={tableCellStyle}>{result.score}</td>
                <td style={tableCellStyle}>{result.date}</td>
                <td style={tableCellStyle}>{result.time}</td>
                <td style={tableCellStyle}>{result.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Стили для таблицы
const tableHeaderStyle = 
{
  padding: '10px',
  textAlign: 'left',
  backgroundColor: '#646cff',
  color: 'black'
};

const tableCellStyle = 
{
  padding: '8px',
  border: '1px solid #ddd',
  color: 'black'
};

const evenRowStyle = 
{
  backgroundColor: '#f9f9f9'
};

const oddRowStyle = 
{
  backgroundColor: 'white'
};