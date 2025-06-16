import { useState } from 'react'
import { useEffect } from 'react';

export default function ResultsTable() 
{
  const [results, setResults] = useState([]);
  useEffect(() => 
  {
    
    const storedResults = JSON.parse(localStorage.getItem('memoryGameResults')) || [];
    setResults(storedResults.sort((a, b) => b.score - a.score));
    

    // const dbgResults = 
    // [
    //   { score: 150, date: '2023-05-15 14:30:22', time: 45, clicks: 30 },
    //   { score: 200, date: '2023-05-16 10:15:33', time: 50, clicks: 40 },
    //   { score: 75, date: '2023-05-17 18:45:12', time: 30, clicks: 25 },
    //   { score: 300, date: '2023-05-18 09:20:01', time: 60, clicks: 50 },
    //   { score: 180, date: '2023-05-19 16:10:45', time: 40, clicks: 45 }
    // ];
    // localStorage.setItem('memoryGameResults', JSON.stringify(dbgResults)); 
  }, []);

  return (
    <div style={{ margin: '20px', maxWidth: '600px' }}>
      <h2>Таблица рекордов</h2>
      {results.length === 0 ? 
      (
        <p>Пока нет сохраненных результатов</p>
      ) 
      : 
      (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Место</th>
              <th style={tableHeaderStyle}>Очки</th>
              <th style={tableHeaderStyle}>Дата</th>
              <th style={tableHeaderStyle}>Время (сек)</th>
              <th style={tableHeaderStyle}>Клики</th>
            </tr>
          </thead>
          <tbody>
            {
                results.map((result, index) => 
                (
                <tr key={index} style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
                    <td style={tableCellStyle}>{index + 1}</td>
                    <td style={tableCellStyle}>{result.score}</td>
                    <td style={tableCellStyle}>{result.date}</td>
                    <td style={tableCellStyle}>{result.time}</td>
                    <td style={tableCellStyle}>{result.clicks}</td>
                </tr>
                ))
            }
          </tbody>
        </table>
      )}
    </div>
  );
}

// Стили для таблицы
const tableHeaderStyle = {
  padding: '10px',
  textAlign: 'left',
  backgroundColor: '#646cff',
  color: 'black'
};

const tableCellStyle = {
  padding: '8px',
  border: '1px solid #ddd',
  color: 'black'
};

const evenRowStyle = {
  backgroundColor: '#f9f9f9'
};

const oddRowStyle = {
  backgroundColor: 'white'
};