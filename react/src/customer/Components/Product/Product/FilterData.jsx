export const color = [
  "white",
  "Black",
  "Red",
  "marun",
  "Being",
  "Pink",
  "Green",
  "Yellow",
  "Black"
];

export const filters = [
  {
    id: "color",
    name: "Màu Sắc",
    options: [
      { value: "white", label: "White" },
      { value: "beige", label: "Beige" },
      { value: "blue", label: "Blue" },
      { value: "brown", label: "Brown" },
      { value: "green", label: "Green" },
      { value: "purple", label: "Purple" },
      {value:"yellow",label:"Yellow"},
      {value:"black",label:"Black"}
    ],
  },

  {
    id: "size",
    name: "Size",
    options: [
      { value: "S", label: "S" },
      { value: "M", label: "M" },
      { value: "L", label: "L" },
    ],
  },
  
];

export const singleFilter=[
  {
    id: "price",
    name: "Giá",
    options: [
      { value: "0-100000", label: "Dưới 100000" },
      { value: "100000-300000", label: "Từ 100000 đến 3000000" },
      { value: "300000-600000", label: "Từ 300000 đến 600000" },
      { value: "600000-1000000", label: "Từ 600000 đến 1000000" },
      { value: "1000000-10000000", label: "Trên 1000000" },
    ],
  },
  {
    id: "disccout",
    name: "Ưu Đãi",
    options: [
      {
        value: "10",label: "10% trở lên",
      },
      { value: "20", label: "20% trở lên" },
      { value: "30", label: "30% trở lên" },
      { value: "40", label: "40% trở lên" },
      { value: "50", label: "50% trở lên" },
      { value: "60", label: "60% trở lên" },
      { value: "70", label: "70% trở lên" },
      { value: "80", label: "80% trở lên" },
    ],
  },
  {
    id: "stock",
    name: "Tình trạng hàng",
    options: [
      { value: "in_stock", label: "Còn bán" },
      { value: "out_of_stock", label: "Đã bán hết" },
      
    ],
  },
]

export const sortOptions = [
  
  { name: "Giá từ thấp đến cao", query: "price_low", current: false },
  { name: "Giá từ cao đến thấp", query: "price_high", current: false },
];
