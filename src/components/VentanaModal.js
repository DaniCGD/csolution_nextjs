import React from 'react'
import styles from '../../styles/modal.module.css'

const VentanaModal= ({ children, state, changeState }) =>{

    return (
        <>
            { state  &&
            <div id="Ventana" className={styles.Overlay}>
                <div className={styles.ContenedorModal}>
                    <div className={styles.HeadModal}>
                        <h3>Datos del Contrato</h3>
                    </div>
                    <button 
                        className={styles.ButtonClose}
                        onClick={ () => changeState(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                    <div className={styles.Contenido}>
                        {children}
                        
                    </div>
                </div>
            </div>
}
        </>
    )
}

export  default VentanaModal;