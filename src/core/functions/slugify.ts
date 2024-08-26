export const slugify = (value: string) => {
  if (!value) return '';
  const slug = `${value}`
    .toLowerCase()
    .replace(/[&/\\#”“’;,+()$~%.'":*?<>{}@!^`=\][_]/g, '')
    .replace(/ /g, '-')
    .replace(/---/g, '-')
    .replace(/--/g, '-')
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
    .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i')
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u')
    .replace(/[ỳýỵỷỹ]/g, 'y')
    .replace(/đ/g, 'd');
  return slug;
};
