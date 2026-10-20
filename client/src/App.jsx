import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: '', course: '', semester: '' });

  // 1. Fetch data from Express API when the app loads
  useEffect(() => {
    fetch('http://localhost:5000/api/students')
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  // 2. Handle sending new data to Express
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (res.ok) {
      const newStudent = await res.json();
      setStudents([...students, newStudent]); // Update UI instantly
      setFormData({ name: '', course: '', semester: '' }); // Clear form
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui', maxWidth: '600px', margin: '0 auto' }}>
      <h2>SchemaSync Database</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input 
          type="text" placeholder="Name" required
          value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
        />
        <input 
          type="text" placeholder="Course" required
          value={formData.course} onChange={e => setFormData({...formData, course: e.target.value})} 
        />
        <input 
          type="number" placeholder="Sem" required style={{ width: '60px' }}
          value={formData.semester} onChange={e => setFormData({...formData, semester: e.target.value})} 
        />
        <button type="submit">Add Student</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {students.map(s => (
          <li key={s._id} style={{ background: '#f4f4f5', margin: '10px 0', padding: '15px', borderRadius: '8px' }}>
            <strong>{s.name}</strong> - {s.course} (Sem {s.semester}) <br/>
            <small style={{ color: '#666' }}>Email: {s.email || 'N/A'}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;