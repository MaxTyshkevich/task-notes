export const findtags = (str: string) => {
  const reg = /#\w+/gi;
  const tags = str.match(reg);

  return tags ? tags : [];
};
