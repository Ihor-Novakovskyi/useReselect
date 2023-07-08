import { useMemo, useState } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect, useDispatch, useStore,  } from "react-redux";
import * as Actions from './actions';
import { useSelector } from "react-redux/es/hooks/useSelector";
import useReselect from "./reselect";

const mapStateProps = (state) => {
    return {
        age: {
            age: state.age
            },
        name: state.name
        }
}

function Render(props) {
    const { age: { age }, name } = useReselect(mapStateProps);
    const dispatch = useDispatch();
    const {changeAge} = useMemo(() => bindActionCreators(Actions, dispatch));
    const [state, setState] = useState('');
    const c =(
        <>
            {/* <input type="text" defaultValue={ getState().age } /> */ }
            <input type="text" value={state} onChange={ (e) => setState(e.target.value) }/>
            <input type="text" defaultValue={ age } value={age} />
            <button className="second" onClick={() => changeAge(state)}>click</button> 
        </>
    )
    console.log(c)
    return c
}

// export default connect(mapStateProps, Actions)(Render);
export default Render;