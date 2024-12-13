import React from 'react';
import { Modal, Button, Form, Text } from 'rsuite';
import Select from '../custom-form/select-custom';
import TextField from '../custom-form/text-field';
import AppSelectIcon from '@rsuite/icons/AppSelect';
import AdminIcon from '@rsuite/icons/Admin';

const ModalRegisterAdmin = (props) => {
  const { open, handleClose, handleSubmit, form, setForm, formRef, dataSource } = props;
  const generateSeatData = (totalSeats = 100) => {
    const seats = [];
    const seatsPerRow = 10;
    const rowsCount = totalSeats / seatsPerRow;
    for (let i = 1; i <= rowsCount; i++) {
      for (let j = 1; j <= seatsPerRow; j++) {
        if ((i - 1) * seatsPerRow + j <= totalSeats) {
          const seatNumber = `${String.fromCharCode(64 + i)}${j}`;
          const row = `${String.fromCharCode(64 + i)}`;
          const seat = `${j}`;
          const dataSourceSet = dataSource?.map((item) => item?.seat_number);
          const status = dataSourceSet?.includes(seatNumber) ? 'ถูกจอง' : 'ว่าง';
          seats.push({ seat_number: seatNumber, status: status, row: row, seat: seat });
        }
      }
    }
    return seats;
  };
  const seatNumberData = generateSeatData();

  return (
    <Modal open={open} onClose={handleClose} size="md">
      <Modal.Header>
        <Modal.Title>
          <div className="flex items-center">
            <AppSelectIcon color="#000" className="mr-2 !text-2xl" />
            <Text size="md" weight="bold" className="!font-Prompt">
              จัดการที่นั่ง
            </Text>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="!min-h-[270px] grid grid-cols-2 gap-4">
        <Form ref={formRef} formValue={form} className="xs:col-span-2 md:col-span-1">
          <TextField name="first_name" label="ชื่อ" disabled />
          <TextField name="last_name" label="นามสกุล" disabled />
          <TextField name="phone" label="เบอร์โทร" disabled />
          <Select
            name="seat_number"
            placeholder="กรุณาเลือกที่นั่ง"
            label="ที่นั่ง"
            selectLabel="ที่นั่ง"
            labelKey="seat_number"
            valueKey="seat_number"
            className="!w-[300px]"
            value={form?.seat_number}
            data={seatNumberData}
            isRequired
            onChange={(value) => {
              setForm({ ...form, seat_number: value });
            }}
          />
        </Form>
        <div className="xs:col-span-2 md:col-span-1 ">
          <Text size="md" weight="bold" align="center" className="!font-Prompt !mt-2">
            แผนที่นั่ง
          </Text>
          <div className="mt-5 flex">
            <div className="flex items-center">
              <div className="flex items-center justify-center  border-solid border-1 border-[#FF0000]">
                <Text weight="bold" align="center" className="!font-Prompt !text-[10px] !text-[#FF0000]">
                  xx
                </Text>
                <AdminIcon color="#FF0000" className="!text-[10px]" />
              </div>
              <Text size="sm" weight="bold" className="!font-Prompt !ml-2">
                สีแดง ถูกเลือกแล้ว
              </Text>
            </div>

            <div className="flex items-center ml-4">
              <div className="flex items-center justify-center  border-solid border-1 border-black">
                <Text weight="bold" align="center" className="!font-Prompt !text-[10px]">
                  xx
                </Text>
                <AdminIcon color="#000" className="!text-[10px]" />
              </div>
              <Text size="sm" weight="bold" className="!font-Prompt !ml-2">
                สีดำ ยังไม่ได้เลือก
              </Text>
            </div>
          </div>
          <div className="mt-3 min-h-[250px]">
            <div className="grid grid-cols-10 gap-1">
              {seatNumberData?.map((item, index) => (
                <div key={index} className="xs:col-span-1 md:col-span-1 ">
                  <div
                    className={`flex items-center justify-center  border-solid border-1 ${item?.status === 'ถูกจอง' ? 'border-[#FF0000]' : 'border-blue-950'}`}
                  >
                    <Text
                      weight="bold"
                      align="center"
                      className={`!font-Prompt !text-[10px] ${item?.status === 'ถูกจอง' ? '!text-[#FF0000]' : '!text-[#000]'}`}
                    >
                      {item?.seat_number}
                    </Text>
                    <AdminIcon color={item?.status === 'ถูกจอง' ? '#FF0000' : '#000'} className="!text-[10px]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="!bg-blue-950 !text-white  w-[100px]" onClick={handleSubmit}>
          ตกลง
        </Button>
        <Button className="!bg-red-500 !text-white !mr-5 w-[100px]" onClick={handleClose}>
          ยกเลิก
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegisterAdmin;
