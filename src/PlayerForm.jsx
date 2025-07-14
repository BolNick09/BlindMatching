import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { savePlayerName } from './slice';
import { Link } from 'react-router-dom';

export default function PlayerForm() 
{
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePlayerName(name));
  };

  return (
    <div style={{ margin: '20px', maxWidth: '400px' }}>
      <h2>Введите ваше имя</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ваше имя"
          required
          style={{
            padding: '10px',
            fontSize: '1rem',
            width: '100%',
            marginBottom: '10px'
          }}
        />
        <div>
          <button 
            type="submit"
            style={{ 
              padding: '10px 20px', 
              fontSize: '1rem',
              marginRight: '10px'
            }}
          >
            Сохранить
          </button>
          <Link to="/game">
            <button 
              style={{ 
                padding: '10px 20px', 
                fontSize: '1rem'
              }}
            >
              Играть
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}