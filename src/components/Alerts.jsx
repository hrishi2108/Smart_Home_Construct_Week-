import styled from 'styled-components';
import { FiAlertTriangle } from 'react-icons/fi';

const AlertContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
`;

const Alert = styled.div`
  background: #fff3cd;
  color: #856404;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

export const Alerts = ({ alerts, onDismiss }) => {
  return (
    <AlertContainer>
      {alerts.map(alert => (
        <Alert key={alert.id}>
          <FiAlertTriangle />
          <div>
            <strong>{alert.title}</strong>
            <p>{alert.message}</p>
          </div>
          <button onClick={() => onDismiss(alert.id)} style={{ marginLeft: '1rem' }}>
            ×
          </button>
        </Alert>
      ))}
    </AlertContainer>
  );
};