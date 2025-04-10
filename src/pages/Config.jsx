import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

export const ConfigPage = () => {
  const { token, logout } = useAuth();
  const [formData, setFormData] = useState({
    backendPort: '',
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get('/api/config', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFormData({
          backendPort: response.data.backend_port || ''
        });
      } catch (error) {
        console.error('Error fetching config: ', error);
        if (error.response && error.response.status === 401) {
          // Handle unauthorized access
          console.error('Unauthorized access. Please log in again.');
          logout();
        }
      }
    };

    fetchConfig();
  }, [token, logout]);

  const onSaveClick = async (e) => {
    e.preventDefault();
    const { backendPort } = formData;
    try {
      let response = await axios.post('/api/config', {
        backend_port: backendPort,
      },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (e) => {
    const {name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSaveClick(e);
    }
  }

  return (
    <div className="ConfigContainer" onKeyDown={handleKeyDown}>
      <div className="Config" onKeyDown={handleKeyDown}>
        <h1>Config</h1>
        <table>
          <tbody>
            <tr>
              <td>
                Backend Port
              </td>
              <td>
                <input
                  type="text"
                  name="backendPort"
                  placeholder="Backend Port"
                  value={formData.backendPort}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={async (e) => {
            await onSaveClick(e);
          }
        }>
          Save
        </button>
      </div>
    </div>
  );
}
