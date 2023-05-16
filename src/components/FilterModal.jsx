import './Modal.scss';

export const FilterModal = ({activeModal, setActive, children}) => {
    return (
        <div className={activeModal ? 'modal active' : 'modal'} onClick={() => setActive(false)}
             onTouchMove={(e) => e.preventDefault()}>
            <div className="modal-dialog">
                <div className={activeModal ? 'modal-content active' : 'modal-content'}
                     onClick={(e) => e.stopPropagation()}>
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};
