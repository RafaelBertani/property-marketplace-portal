const Item = (props) => {
    return (
        <div className='d-flex'>
            <div className='d-flex align-items-center'>
                <h4 className='text-center'>{props.param}</h4>
            </div>
            {/* flex-grow 1: tomar espaço remanescente */}
            <div className='flex-grow-1 ms-2 border'>
                <p className='text-center'>{props.outro}</p>
            </div>
        </div>

    )
}
export default Item;