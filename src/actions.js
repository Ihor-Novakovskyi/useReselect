const changeName = (value) => {
    return { type: "CHANGE_NAME", payload: typeof value !== 'object' ? value : {...value}  }
}
const changeSecond = (value) => {
    return { type: "CHANGE_SECOND", payload: typeof value !== 'object' ? value : {...value} }
}
const changeAge = (value) => {
    return { type: "CHANGE_AGE", payload: typeof value !== 'object' ? value : {...value}  }
}

export { changeAge, changeName, changeSecond }