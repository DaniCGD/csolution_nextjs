import React from 'react';
import styles from '../../styles/modal.module.css'
import { AiOutlineEye } from 'react-icons/ai';


 const Modal = (setStateModal,stateModal) => {
    return(
        <div className={styles.ContenedorBotones}>
            <button 
                className={styles.Boton}
                onClick={ () => setStateModal(!stateModal)}
            > 
                <AiOutlineEye 
                    size={"30px"}
                />
            </button>
        </div>
    )
}

export default Modal