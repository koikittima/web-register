export function mockUsers(length = 20) {
  const createRowData = (rowIndex) => {
    const firstNames = [
      'สมชาย',
      'สมหญิง',
      'ชญานิษฐ์',
      'ปกรณ์',
      'พิมพ์',
      'อัครพล',
      'กานต์',
      'ธนพล',
      'กุลสตรี',
      'พชร',
      'วิชัย',
      'บุญรัตน์',
      'กาญจนา',
      'มณี',
      'ปวีณา',
      'ธนภัทร',
      'อรพรรณ',
      'เอกชัย',
      'จินตนา',
      'นราธิป',
    ];
    const lastNames = [
      'ทองสุข',
      'มั่นคง',
      'วงศ์เจริญ',
      'ศรีสมบัติ',
      'เพชรแท้',
      'ปิ่นมณี',
      'วงศ์วาน',
      'อินทรสุข',
      'สกุลไทย',
      'บุญสม',
      'สุขุม',
      'พูนสุข',
      'ทรงพล',
      'นิ่มนวล',
      'เพชรไทย',
      'นพเก้า',
      'มงคลชัย',
      'โชติกุล',
      'สิริวัฒน์',
      'วรรณดี',
    ];

    const first_name = firstNames[rowIndex];
    const last_name = lastNames[rowIndex];
    const full_name = `${first_name} ${last_name}`;
    const phone = `0814${123456 + rowIndex}`;
    const user_id = `user${rowIndex}`;

    return {
      id: rowIndex + 1,
      full_name,
      first_name,
      last_name,
      phone,
      user_id,
    };
  };

  return Array.from({ length: Math.min(length, 20) }).map((_, index) => {
    return createRowData(index);
  });
}
