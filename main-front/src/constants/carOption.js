export const CAR_COUNTRY = {
  Korea: ["Hyundai", "Kia"],
  USA: ["Ford", "Tesla"],
  Japan: ["Toyota", "Honda"],
};

export const CAR_MANUFACTURERE = {
  Hyundai: ["Elantra", "Sonata"],
  Kia: ["Sorento", "Sportage"],
  Ford: ["Mustang", "F-150"],
  Tesla: ["Model S", "Model 3"],
  Toyota: ["Corolla", "Camry"],
  Honda: ["Civic", "Accord"],
};

// 키 값 찾기
export function findCountryByCar(car) {
  return Object.entries(CAR_COUNTRY).find(([key, values]) => values.includes(car))?.[0]; // 키 반환 (값이 없으면 undefined)
}

// 연료 종류
export const CAR_OPTION_FUELTYPE = [
  { label: "가솔린", value: "GASOLINE" },
  { label: "디젤", value: "DIESEL" },
  { label: "전기", value: "ELECTRIC" },
  { label: "하이브리드", value: "HYBRID" },
];

// 변속기 종류
export const CAR_OPTION_TRANSMISSION = [
  { label: "자동", value: "AUTOMATIC" },
  { label: "수동", value: "MANUAL" },
];

// 판매 상태
export const CAR_OPTION_STATUS = [
  { label: "판매중", value: "AVAILABLE" },
  { label: "판매완료", value: "SOLD" },
];

// 제조 연도
export const YEARS = [
  { label: "2025 년", value: "2025" },
  { label: "2024 년", value: "2024" },
  { label: "2023 년", value: "2023" },
  { label: "2022 년", value: "2022" },
  { label: "2021 년", value: "2021" },
  { label: "2020 년", value: "2020" },
  { label: "2019 년", value: "2019" },
  { label: "2018 년", value: "2018" },
  { label: "2017 년", value: "2017" },
  { label: "2016 년", value: "2016" },
  { label: "2015 년", value: "2015" },
  { label: "2014 년", value: "2014" },
  { label: "2013 년", value: "2013" },
  { label: "2012 년", value: "2012" },
  { label: "2011 년", value: "2011" },
  { label: "2010 년", value: "2010" },
  { label: "그 외", value: "old" },
];

export const CAR_COLOR = [
  { id: 1, name: "Red", hex: "#DC143C" },
  { id: 2, name: "Blue", hex: "#191970" },
  { id: 3, name: "Green", hex: "#50C878" },
  { id: 4, name: "Black", hex: "#343434" },
  { id: 5, name: "White", hex: "#FFFFFF" },
  { id: 6, name: "Silver", hex: "#C0C0C0" },
  { id: 7, name: "Gold", hex: "#F7E7CE" },
  { id: 8, name: "LightBlue", hex: "#0077BE" },
  { id: 9, name: "Orange", hex: "#ff8355" },
  { id: 10, name: "Gray", hex: "#5d5d5d" },
];

// 필터 조회시 사용
export const CAR_F_PRICE = [
  { label: "전체", value: "" },
  { label: "1,000만원 미만", value: "0-1000" },
  { label: "1,000-3,000 미만", value: "1000-3000" },
  { label: "3,000-5,000 미만", value: "3000-5000" },
];

export const CAR_F_MILEAGE = [
  { value: "전체", label: "" },
  { value: "0-5000", label: "0-5000" },
  { value: "5000-10000", label: "5000-10000" },
  { value: "10000-20000", label: "10000-20000" },
  { value: "20000-30000", label: "20000-30000" },
  { value: "30000-40000", label: "30000-40000" },
  { value: "40000-50000", label: "40000-50000" },
];

// 연료 종류
export const CAR_F_FUELTYPE = [
  { label: "전체", value: "" },
  { label: "가솔린", value: "GASOLINE" },
  { label: "디젤", value: "DIESEL" },
  { label: "전기", value: "ELECTRIC" },
  { label: "하이브리드", value: "HYBRID" },
];

// 변속기 종류
export const CAR_F_TRANSMISSION = [
  { label: "전체", value: "" },
  { label: "자동", value: "AUTOMATIC" },
  { label: "수동", value: "MANUAL" },
];

// 판매 상태
export const CAR_F_STATUS = [
  { label: "전체", value: "" },
  { label: "판매중", value: "AVAILABLE" },
  { label: "판매완료", value: "SOLD" },
];

// 제조 연도
export const CAR_F_YEARS = [
  { label: "전체", value: "" },
  { label: "2025 년", value: "2025" },
  { label: "2024 년", value: "2024" },
  { label: "2023 년", value: "2023" },
  { label: "2022 년", value: "2022" },
  { label: "2021 년", value: "2021" },
  { label: "2020 년", value: "2020" },
  { label: "2019 년", value: "2019" },
  { label: "2018 년", value: "2018" },
  { label: "2017 년", value: "2017" },
  { label: "2016 년", value: "2016" },
  { label: "2015 년", value: "2015" },
  { label: "2014 년", value: "2014" },
  { label: "2013 년", value: "2013" },
  { label: "2012 년", value: "2012" },
  { label: "2011 년", value: "2011" },
  { label: "2010 년", value: "2010" },
];
