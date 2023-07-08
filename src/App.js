import { useContext, useState } from "react";
import * as Actions from './actions';
import { connect } from 'react-redux';


function App({ changeName, changeAge, changeSecond, name, secondName, age, ...propz }) {
    const [enteringData, setEnteringData] = useState('');
  console.log('renderAPp')
    function change(e) {
        switch (e.target.className) {
            case 'change-name':
                changeName(enteringData);
                return;
            case 'change-secondName':
                changeSecond(enteringData);
                return;
            case 'change-age':
                changeAge(enteringData);
                return;

        }
    }
    
    const c =  (
        <>
            <input className='inputReact' type="text" onChange={ (e) => setEnteringData(e.target.value) } value={ enteringData } />
            <input type="text" defaultValue={ name } />
            <button className='change-name' onClick={ change }>name change</button>
            <input type="text" defaultValue={ secondName } />
            <button className='change-secondName' onClick={ change }>second name Change</button>
            <input type="text" defaultValue={ age } />
            <button className='change-age' onClick={ change }>age change</button>
            <button onClick={ () => console.log({name, secondName, age}) }>show redux object State</button>

        </>
    )
    // console.log(c)
    return c;
}
function mapStateProps(state) {
 
    return {
     ...state,
        
    }
}
export default connect(mapStateProps, Actions)(App);


console.log()