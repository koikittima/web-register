import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/auth/auth-context';
import { useMessage } from '../../components/widget/message';
import { useData } from '../../components/data-mock/data-context';
import { Container, Text, Stat, StatGroup, Progress, Form, Button } from 'rsuite';
import TextField from '../../components/custom-form/text-field';
import PeoplesTestIcon from '@rsuite/icons/PeoplesTest';
import RegisterUserTable from '../../components/register-user/register-user-table';
import RegisterAdminTable from '../../components/register-admin/register-admin-table';
import ModalRegisterUser from '../../components/register-user/modal-register-user';
import ModalRegisterAdmin from '../../components/register-admin/modal-register-admin';
import ListIcon from '@rsuite/icons/List';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import _ from 'lodash';

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const { dataSource, addData, updateData } = useData();
  const { showMessage } = useMessage();
  const formRef = useRef();
  const formRefModalUser = useRef();
  const formRefModalAdmin = useRef();
  const [formSearch, setFormSearch] = useState({
    search: '',
  });
  const [formModalUser, setFormModalUser] = useState({
    first_name: '',
    last_name: '',
    phone: '',
  });
  const [formModalAdmin, setFormModalAdmin] = useState();
  const [openModalAdmin, setOpenModalAdmin] = useState(false);
  const [openModalUser, setOpenModalUser] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [sortTypeTable, setSortTypeTable] = useState();
  const [sortColumnTable, setSortColumnTable] = useState();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const filteredDataUsers = () => {
    const _filteredData = formSearch?.search
      ? dataSource?.filter((item) => item?.full_name?.includes(formSearch?.search))
      : dataSource;
    if (sortTypeTable && sortColumnTable) {
      return _.orderBy(_filteredData, sortColumnTable, sortTypeTable);
    }
    return _filteredData;
  };
  const handleSortColumn = (sortColumn, sortType) => {
    setLoadingTable(true);
    setTimeout(() => {
      setLoadingTable(false);
      setSortColumnTable(sortColumn);
      setSortTypeTable(sortType);
    }, 500);
  };

  const handleOpenModalUser = () => {
    setOpenModalUser(true);
    setFormModalUser({
      first_name: '',
      last_name: '',
      phone: '',
    });
  };

  const handleCloseModalUser = () => {
    setOpenModalUser(false);
    setFormModalUser({
      first_name: '',
      last_name: '',
      phone: '',
    });
  };

  const handleSubmitModalUser = () => {
    if (!formRefModalUser.current.check()) {
      showMessage('error', 'กรุณากรอกข้อมูลให้ครบ');
      return;
    } else {
      const newData = {
        ...formModalUser,
        id: dataSource?.length + 1,
        full_name: formModalUser?.first_name + ' ' + formModalUser?.last_name,
        user_id: user?.user_name,
      };
      setLoadingTable(true);
      setOpenModalUser(false);
      showMessage('success', 'ลงทะเบียนเข้างานสําเร็จ');
      setTimeout(() => {
        setLoadingTable(false);
        addData(newData);
      }, 500);
    }
  };

  const handleOpenModalAdmin = (rowData) => {
    setOpenModalAdmin(true);
    setFormModalAdmin(rowData);
  };

  const handleCloseModalAdmin = () => {
    setOpenModalAdmin(false);
    setFormModalAdmin({
      first_name: '',
      last_name: '',
      phone: '',
    });
  };

  const handleSubmitModalAdmin = () => {
    const checkSeat = dataSource
      ?.map((item) => item?.id !== formModalAdmin?.id && item?.seat_number)
      ?.includes(formModalAdmin?.seat_number);
    if (!formModalAdmin?.seat_number) {
      showMessage('error', 'กรุณาเลือกที่นั่ง');
    } else {
      if (checkSeat) {
        showMessage('error', 'ที่นั่งนี้ถูกเลือกแล้ว กรุณาเลือกที่นั่งใหม่');
      } else {
        const newData = dataSource?.map((item) => {
          if (item?.id === formModalAdmin?.id) {
            return {
              ...item,
              seat_number: formModalAdmin?.seat_number,
            };
          }
          return item;
        });
        setLoadingTable(true);
        setOpenModalAdmin(false);
        showMessage('success', 'จัดการที่นั่งสําเร็จ');
        setTimeout(() => {
          setLoadingTable(false);
          updateData(newData);
        }, 500);
      }
    }
  };

  return (
    <Container className="xs:px-10 md:px-20 mt-10 mb-10">
      <div className="h-[50px] w-full bg-blue-950 flex items-center ">
        <PeoplesTestIcon color="#fff" className="text-2xl ml-4" />
        <Text size="lg" className="!font-Prompt !text-white !ml-2">
          ข้อมูลผู้ลงทะเบียน
        </Text>
      </div>
      <StatGroup spacing={20} columns={2} className="mt-5 grid grid-cols-2">
        <Stat bordered className="shadow-md !border-blue-950 xs:col-span-2 md:col-span-1">
          <Stat.Label>จำนวนที่นั่งคงเหลือ</Stat.Label>
          <Stat.Value>
            {dataSource?.length < 100 ? `${100 - dataSource?.length} ที่นั่ง` : 'ไม่มีที่นั่งว่าง'}
          </Stat.Value>
          <Progress.Line
            percent={dataSource?.length < 100 ? (1 - dataSource?.length / 100) * 100 : 100}
            showInfo={false}
            strokeColor={dataSource?.length < 100 ? '#3498ff' : '#dc3545'}
          />
        </Stat>

        <Stat bordered className="shadow-md !border-blue-950 xs:col-span-2 md:col-span-1">
          <Stat.Label>จำนวนผู้ลงทะเบียนทั้งหมด</Stat.Label>
          <Stat.Value>{dataSource?.length} คน</Stat.Value>
          <Progress.Line percent={(dataSource?.length / 100) * 100} showInfo={false} strokeColor="#87d068" />
        </Stat>
      </StatGroup>

      <div className="border-solid border-1 border-blue-950 shadow-md mt-10 w-full">
        <div className="h-[50px] bg-blue-950 flex items-center w-full">
          <ListIcon color="#fff" className="text-2xl ml-5" />
          <Text size="lg" className="!font-Prompt !text-white !ml-2">
            รายการผู้ลงทะเบียนเข้างาน
          </Text>
        </div>
        <div className="xs:ml-2 md:ml-5 mt-5">
          <Form ref={formRef} formValue={formSearch} onChange={(e) => setFormSearch(e)}>
            <TextField
              name="search"
              label="ค้นหาชื่อผู้ลงทะเบียน"
              placeholder="ระบุชื่อผู้ลงทะเบียน"
              className="!xs:w-[200px]"
            />
          </Form>
        </div>

        {user?.user_name === 'admin' ? (
          <RegisterAdminTable
            filteredData={filteredDataUsers}
            loading={loadingTable}
            sortType={sortTypeTable}
            sortColumn={sortColumnTable}
            onSortColumn={handleSortColumn}
            handleOpenModal={handleOpenModalAdmin}
          />
        ) : (
          <div className="mt-5">
            <div className="text-end">
              <Button
                className="!bg-blue-950 !text-white !mr-5 w-[150px] flex justify-center items-center"
                disabled={dataSource?.length === 100}
                onClick={() => handleOpenModalUser()}
              >
                <AddOutlineIcon className="mr-2" />
                ลงทะเบียน
              </Button>
            </div>
            <RegisterUserTable
              filteredData={filteredDataUsers}
              loading={loadingTable}
              sortType={sortTypeTable}
              sortColumn={sortColumnTable}
              onSortColumn={handleSortColumn}
            />
          </div>
        )}
      </div>
      {openModalUser && (
        <ModalRegisterUser
          open={openModalUser}
          handleClose={handleCloseModalUser}
          handleSubmit={handleSubmitModalUser}
          form={formModalUser}
          setForm={setFormModalUser}
          formRef={formRefModalUser}
        />
      )}

      {openModalAdmin && (
        <ModalRegisterAdmin
          open={openModalAdmin}
          handleClose={handleCloseModalAdmin}
          handleSubmit={handleSubmitModalAdmin}
          form={formModalAdmin}
          setForm={setFormModalAdmin}
          formRef={formRefModalAdmin}
          dataSource={dataSource}
        />
      )}
    </Container>
  );
};

export default Home;
