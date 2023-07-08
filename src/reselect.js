import { useState, useMemo } from "react";
import { useStore } from "react-redux";
export default function useReselect(mapStateProps) { 
    const { getState, subscribe } = useStore();
    const memoizedState = useMemo(() => mapStateProps(getState()),[]);
    const [state, setState] = useState(memoizedState);
    useMemo(() => { 
        subscribe(() => { 
            setState((state) => { 
                const currentState = mapStateProps(getState())
                if (JSON.stringify(currentState) === JSON.stringify(state)) { 
                    return state;
                }
                return currentState;
            })
        })
    },[])
    return state;
}
// Это моя реализация Хука по типу useReselect который проводит глубокое сравнение предыдущего значения mapStateProps c текущим значением
// Обработчик запускается каждый раз,подписавшись на объект store с глобальным состоянием -после изменения объекта state из из объектаstore
//Внутри этого обработчика запускается асинхроный setState который в свою очередь запускает обработчик передавя внутренний state
//реакт компонента. После чего мы запускаем mapStateProps передвая текущее состояние getState(). После чего происходит глубокое сравнение
//этих объектов.Если они будут отличаться то поменяется состояние компонента,что приведет к перерендеру.Если будут равны то вернется старое
// состояние и никакоо перерендера не произойдет
//Что же касается dispatch он кадый раз запускает подписчики при изменении состояния, а подписичики добавленные спомощью connect
// или хуком useSelector, подписанные с помощью subscribe, запустившись запускают переданный mapStateProps и полученный результат
// сравнивают с предыдущим резултатом mapStateProps. И уже от того как они проведут это сравнение,они либо поменяют состояние компонента
//так как они используются внутри аинхронного setState , либо вернут предыдущее сосотояние которое эквивалентно результату mapStateProps
//useSeletor содержит условие которое строго сравниваю возращаемые результаты mapStateProps,если был передан только mapStateProps
//connect проводит поверхностное сравнение объекта,поэтому если просто вернуть новый объект с теми же полями в которых будут примитивыб
//