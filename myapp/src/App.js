
import './App.css';
import { useState, useEffect } from 'react';
import pic from './pictures/icon_plus_white.svg';

export const App = (props) => {

  const [text, setText] = useState('');
  const [color, setColor] = useState(props.defaultColor);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const savedLists = localStorage.getItem('favoriteColors');
    if (savedLists) {
      setLists(JSON.parse(savedLists));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteColors', JSON.stringify(lists));
  }, [lists]);

  const handleChange = (event) => {
    setColor(event.target.value);
  };

  const handleSubmit = () => {
    const id = Date.now();
    const data = { id, text, color };
    if (text && color) {
      setLists((prevList) => [...prevList, data]);
      setText('');
      setColor('');
    }
  };

  const deleteElement = (id) => {
    setLists([...lists.filter(list => list.id !== id)]);
  }

  return (
    <div className="main_container">
      <div className='container'>
        <h1 className='my_favourite_colors'>My Favourite Colors</h1>
        <div className="input_container">
          <div className='input_div'>
            <input text='text' placeholder='&#9825; Color name' className='input' value={text} onChange={(e) => setText(e.target.value)} />
            <input type="color" className='input_color' value={color} onChange={handleChange} />
          </div>
          <span className='img_square' onClick={handleSubmit}><img src={pic} alt="pic" className='plus_button' /></span>
        </div>
        <h3>Color collection</h3>
        <div className="color_container">
          {lists.map((list, index) => (
            <div key={index} className='name_color_removeColor'>
              <div className="name_color">
                <div className='color_square'
                  style={{
                    backgroundColor: list.color,
                  }}
                ></div>
                <h4 className='input_text'>{list.text}</h4>
              </div>
              <button className="remove_color" onClick={() => { deleteElement(list.id) }}>Remove color</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}







