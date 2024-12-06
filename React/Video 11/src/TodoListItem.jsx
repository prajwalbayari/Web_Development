export function TodoListItem({children,isComplete}){
    return(
        <label>
            <input type="checkbox" checked={isComplete}/>
            {children}
        </label>
    )
}