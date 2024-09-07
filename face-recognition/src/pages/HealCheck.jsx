import React from 'react';

function HealthCheck() {
  // Đơn giản trả về một message JSON
  return <div>{JSON.stringify({ status: 'ok' })}</div>;
}

export default HealthCheck;
