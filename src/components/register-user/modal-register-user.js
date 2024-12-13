import React from 'react';
import { Modal, Button, Form, Schema, Text } from 'rsuite';
import TextField from '../custom-form/text-field';
import AdminIcon from '@rsuite/icons/Admin';

function ModalRegisterUser(props) {
  const { open, handleClose, handleSubmit, form, setForm, formRef } = props;
  const { StringType, NumberType } = Schema.Types;
  const model = Schema.Model({
    first_name: StringType().isRequired('กรุณาระบุชื่อ'),
    last_name: StringType().isRequired('กรุณาระบุนามสกุล'),
    phone: NumberType()?.isRequired('กรุณาระบุเบอร์โทร'),
  });
  return (
    <Modal open={open} onClose={handleClose} size="xs">
      <Modal.Header>
        <Modal.Title>
          <div className="flex items-center">
            <AdminIcon color="#000" className="mr-1 !text-2xl" />
            <Text size="md" weight="bold" className="!font-Prompt !mt-1">
              ลงทะเบียนเข้างาน
            </Text>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="!min-h-[270px]">
        <Form ref={formRef} formValue={form} onChange={(e) => setForm(e)} model={model}>
          <TextField name="first_name" label="ชื่อ" placeholder="ระบุชื่อ" isRequired />
          <TextField name="last_name" label="นามสกุล" placeholder="ระบุนามสกุล" isRequired />
          <TextField name="phone" label="เบอร์โทรศัพท์" placeholder="ระบุเบอร์โทรศัพท์" isRequired />
        </Form>
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
}

export default ModalRegisterUser;
