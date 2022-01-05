import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';

export interface AlertProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose?: () => void;
}

export default function Alert({ isOpen, title, message, onClose }: AlertProps) {
  return (
    <AwesomeAlert
      show={isOpen}
      showProgress={false}
      title={title}
      message={message}
      closeOnTouchOutside={false}
      closeOnHardwareBackPress={false}
      showCancelButton={false}
      showConfirmButton={true}
      // cancelText="Cancel"
      confirmText="OK"
      confirmButtonColor="rgb(33, 150, 243)"
      // onCancelPressed={onCancelPressed}
      onConfirmPressed={onClose}
    />
  );
}
