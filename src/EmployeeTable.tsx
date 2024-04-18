import React, { FC } from 'react';
import { Table, Button } from 'antd';
import { Employee } from './types';

interface Props {
  data: Employee[];
  columns: any[];
  showModal: () => void;
  handleLogout: () => void;
}

const EmployeeTable: FC<Props> = ({ data, columns, showModal, handleLogout }) => {
  return (
    <div className="Table-container">
      <h2>Employee Management</h2>
      <div className="add-button-container">
        <Button type="primary" onClick={showModal}>Add</Button>
        <Button type="primary" onClick={handleLogout}>Logout</Button>
      </div>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default EmployeeTable;
