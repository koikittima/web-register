import React from 'react';
import { Table, Button } from 'rsuite';
import EditIcon from '@rsuite/icons/Edit';

const RegisterAdminTable = (props) => {
  const { filteredData, loading, sortType, sortColumn, onSortColumn, handleOpenModal } = props;
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

      <Column minWidth={200} flexGrow={1} sortable>
        <HeaderCell>ชื่อผู้ลงทะเบียน</HeaderCell>
        <Cell dataKey="full_name" />
      </Column>

      <Column minWidth={150} flexGrow={1} sortable>
        <HeaderCell>เบอร์โทร</HeaderCell>
        <Cell dataKey="phone" />
      </Column>

      <Column minWidth={150} sortable>
        <HeaderCell>ที่นั่ง</HeaderCell>
        <Cell dataKey="seat_number" />
      </Column>

      <Column minWidth={50} fixed="right" align="center">
        <HeaderCell>จัดการที่นั่ง</HeaderCell>
        <Cell className="text-center !mb-2">
          {(rowData) => (
            <Button className="!bg-transparent " onClick={() => handleOpenModal(rowData)}>
              <EditIcon color="#172554" />
            </Button>
          )}
        </Cell>
      </Column>
    </Table>
  );
};

export default RegisterAdminTable;
