import "../Styles/QueryComponent.css";
import {useState} from 'react';
import { PieChart, Pie,  ResponsiveContainer } from 'recharts';

export default function QueryComponent() {
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    const handleChange = (e) => {
        if(e.target.id === 'subject'){
            setSubject(e.target.value)
        }else{
            setDescription(e.target.value)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(subject, description)
    }

    const data01 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
      ];
      const data02 = [
        { name: 'A1', value: 100 },
        { name: 'A2', value: 300 },
        { name: 'B1', value: 100 },
        { name: 'B2', value: 80 },
        { name: 'B3', value: 40 },
        { name: 'B4', value: 30 },
        { name: 'B5', value: 50 },
        { name: 'C1', value: 100 },
        { name: 'C2', value: 200 },
        { name: 'D1', value: 150 },
        { name: 'D2', value: 50 },
      ];
      

  return (
    <div className="query_component">
       <form onSubmit={handleSubmit} className="query_comp_form">
        <label>
          Subject: </label>
          <input type="text" id="subject" value={subject} onChange={handleChange} />
       
        <label>
          Description: </label>
          <textarea type="text" id="description" value={description} onChange={handleChange} />
       
        <input className="signin_button" type="submit" value="Submit" />
      </form>
      <ResponsiveContainer width={500} height={300}>
        <PieChart width={400} height={400}>
          <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
          <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
