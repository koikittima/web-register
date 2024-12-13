import React from 'react';
import { Table } from 'rsuite';

const RegisterUserTable = (props) => {
  const { filteredData, loading, sortType, sortColumn, onSortColumn } = props;
  const { Column, HeaderCell, Cell } = Table;

  return (
    <Table
      height={400}
      data={filteredData()}
      bordered={true}
      cellBordered={true}
      loading={loading}
      className="m-5 overflow-y-auto"
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={onSortColumn}
    >
      <Column minWidth={150} align="center" sortable>
        <HeaderCell>ลําดับ</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column flexGrow={1} minWidth={200} sortable>
        <HeaderCell>ชื่อผู้ลงทะเบียน</HeaderCell>
        <Cell dataKey="full_name" />
      </Column>
    </Table>
  );
};

export default RegisterUserTable;
