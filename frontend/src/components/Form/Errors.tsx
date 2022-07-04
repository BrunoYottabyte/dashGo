interface ErrorsProps{
    text: string;
}

export function Errors({text}: ErrorsProps){
    return(
        <p style={{fontSize: 'var(--small)', color: 'red', margin: '-10px 5px'}}>{text}</p>
    )
}