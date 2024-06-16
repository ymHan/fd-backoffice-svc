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

export const getBeforeDay = async (beforeday: number) => {
  const today = new Date();
  const day = today.getDate();
  const calcDate = new Date(new Date().setDate(day - beforeday));
  calcDate.setUTCHours(0, 0, 0, 0);
  return calcDate;
};

export const getBeforeMonth = async (beforeMonth: number) => {
  const today = new Date();
  const month = today.getMonth();
  const calcDate = new Date(new Date().setMonth(month - beforeMonth));
  calcDate.setUTCHours(0, 0, 0, 0);
  return calcDate;
};
