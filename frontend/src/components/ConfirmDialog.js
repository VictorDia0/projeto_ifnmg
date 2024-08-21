import React, { useState } from 'react';

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <p>{message}</p>
        <div style={styles.buttons}>
          <button onClick={onConfirm} style={styles.confirmButton}>OK</button>
          <button onClick={onCancel} style={styles.cancelButton}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

const CustomConfirmDialog = ({ message }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const showDialog = () => {
    return new Promise((resolve) => {
      const handleConfirm = () => {
        setShowConfirm(false);
        resolve(true);
      };

      const handleCancel = () => {
        setShowConfirm(false);
        resolve(false);
      };

      setShowConfirm(true);
      return { handleConfirm, handleCancel };
    });
  };

  const [handlers, setHandlers] = useState({});

  if (!showConfirm && handlers.handleConfirm === undefined) {
    setHandlers(showDialog());
  }

  return (
    <>
      {showConfirm && (
        <ConfirmDialog
          message={message}
          onConfirm={handlers.handleConfirm}
          onCancel={handlers.handleCancel}
        />
      )}
    </>
  );
};

const ParentComponent = () => {
  const handleDelete = async () => {
    const userConfirmed = await showConfirmDialog("Tem certeza que deseja deletar?");
    if (userConfirmed) {
      console.log('Confirmed!');
      // Coloque aqui o código para deletar
    } else {
      console.log('Cancelled!');
    }
  };

  const showConfirmDialog = (message) => {
    return new Promise((resolve) => {
      const onConfirm = () => resolve(true);
      const onCancel = () => resolve(false);

      const handlers = { handleConfirm: onConfirm, handleCancel: onCancel };

      // Renderizar o diálogo com as funções de confirmação/cancelamento
      renderDialog(message, handlers);
    });
  };

  const renderDialog = (message, handlers) => {
    const [dialog, setDialog] = useState(null);

    React.useEffect(() => {
      setDialog(
        <CustomConfirmDialog message={message} />
      );
    }, []);

    return dialog;
  };

  return (
    <div>
      <button onClick={handleDelete}>Deletar</button>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    width: '300px',
  },
  buttons: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-around',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ParentComponent;
