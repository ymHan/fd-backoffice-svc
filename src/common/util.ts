export const transDateToObject = async (userData: any) => {
  const createdAt = userData?.createdAt ? userData.createdAt.toISOString() : '';
  const updatedAt = userData?.updatedAt ? userData.updatedAt.toISOString() : '';
  const deletedAt = userData?.deletedAt ? userData.deletedAt.toISOString() : '';
  userData.date = {
    createdAt,
    updatedAt,
    deletedAt,
  };

  return userData;
};

export function getEnumKeyByEnumValue<T extends { [index: string]: string }>(myEnum: T, enumValue: string): keyof T | null {
  let keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue);
  return keys.length > 0 ? keys[0] : null;
}
