import AdminPannel from "../../../Styles/AdminPannelWrapper";
import { useState } from "react";
import { Typography } from "@mui/material";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { Fragment } from "react";
// import "./CreateProductForm.css";
import { useDispatch, useSelector } from "react-redux";
import {
  findProductById,
  updateProduct,
} from "../../../Redux/Customers/Product/Action";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const initialSizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
];

const UpdateProductForm = () => {
  const [productData, setProductData] = useState({
    id: "",
    imageUrl: "",
    brand: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    discountPersent: "",
    size: initialSizes,
    quantity: "",
    topLavelCategory: "",
    secondLavelCategory: "",
    thirdLavelCategory: "",
    description: "",
  });
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { productId } = useParams();
  const { customersProduct } = useSelector((store) => store);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

  };

  const calculateDiscountedPrice = () => {
    const originalPrice = parseFloat(productData.price);
    const discountPercent = parseFloat(productData.discountPersent);

    if (!isNaN(originalPrice) && !isNaN(discountPercent)) {
      const discountAmount = (originalPrice * discountPercent) / 100;
      const discountedPrice = originalPrice - discountAmount;
      const roundedDiscountedPrice = Math.round(discountedPrice / 1000) * 1000; // Làm tròn đến hàng nghìn
      productData.discountedPrice = roundedDiscountedPrice;
      return roundedDiscountedPrice; // Định dạng số tiền theo đơn vị tiền Việt Nam
    }

    return ""; // Trả về chuỗi rỗng nếu không thể tính được
  };

  const handleSizeChange = (e, index) => {
    let { name, value } = e.target;
    name === "size_quantity" ? name = "quantity" : name = e.target.name;

    const sizes = [...productData.size];
    sizes[index][name] = value;
    setProductData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  };

  const handleSubmit = (e) => {
    dispatch(updateProduct(productData));
    console.log(productData);

  };

  useEffect(() => {
    dispatch(findProductById({ productId }));
  }, [productId]);

  useEffect(() => {
    if (customersProduct.product) {
      console.log("in ra" ,customersProduct)
      for (let key in productData) {
        setProductData((prev) => ({ ...prev, [key]: customersProduct.product[key] }))
        console.log(customersProduct.product[key], "--------", key)
      }
    }

  }, [customersProduct.product])

  return (
    <Fragment className="createProductContainer ">
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className="py-10 text-center "
      >
        Cập Nhật Sản Phẩm
      </Typography>
      <div className="createProductContainer min-h-screen">
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Link ảnh sản phẩm"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Thương hiệu"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Tiêu đề"
              name="title"
              value={productData.title}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Màu sắc"
              name="color"
              value={productData.color}
              onChange={handleChange}
            // required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Số lượng"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
              type="number"
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Giá gốc"
              name="price"
              value={productData.price}
              onChange={handleChange}
              type="number"
              required
            />
          </Grid>


          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="% Ưu Đãi"
              name="discountPersent"
              value={productData.discountPersent}
              onChange={handleChange}
              type="number"
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Giá sau ưu đãi"
              name="discountedPrice"
              type="number"

              value={calculateDiscountedPrice()}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Giới Tính</InputLabel>
              <Select
                name="topLavelCategory"
                value={productData.topLavelCategory}
                onChange={handleChange}
                label="Top Level Category"
              >
                <MenuItem value="Men">Nam</MenuItem>
                <MenuItem value="Women">Nữ</MenuItem>

              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Quần Áo/Phụ Kiện</InputLabel>
              <Select
                name="secondLavelCategory"
                value={productData.secondLavelCategory}
                onChange={handleChange}
                label="Second Level Category"
              >
                <MenuItem value="clothing">Quần Áo</MenuItem>
                <MenuItem value="Accessories">Phụ Kiện</MenuItem>

              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Loại sản phẩm</InputLabel>
              <Select
                name="thirdLavelCategory"
                value={productData.thirdLavelCategory}
                onChange={handleChange}
                label="Third Level Category"
                disabled={!productData.secondLavelCategory} // Disable if Quần áo/Phụ kiện is not selected
              >
                {productData.secondLavelCategory === "clothing" ? (
                  [
                    <MenuItem key="aothun" value="aothun">Áo thun</MenuItem>,
                    <MenuItem key="aosomi" value="aosomi">Áo sơ mi</MenuItem>,
                    <MenuItem key="aopolo" value="aopolo">Áo Polo</MenuItem>,
                    <MenuItem key="quanjeans" value="quanjeans">Quần Jeans</MenuItem>,
                    <MenuItem key="quankaki" value="quankaki">Quần Kaki</MenuItem>,
                    <MenuItem key="quanshort" value="quanshort">Quần Short</MenuItem>,
                  ]
                ) : (
                  [
                    <MenuItem key="dongho" value="dongho">Đồng hồ</MenuItem>,
                    <MenuItem key="vi_tuixach" value="vi_tuixac">Ví/Túi xách</MenuItem>,
                    <MenuItem key="mu" value="mu">Mũ</MenuItem>,
                    <MenuItem key="kinhram" value="kinhram">Kính râm</MenuItem>,
                    <MenuItem key="thatlung" value="thatlung">Thắt lưng</MenuItem>,
                  ]
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Mô tả"
              multiline
              name="description"
              rows={3}
              onChange={handleChange}
              value={productData.description}
            />
          </Grid>
          {/* {productData.size.map((size, index) => (
            <Grid container item spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Size Name"
                  name="name"
                  value={size.name}
                  onChange={(event) => handleSizeChange(event, index)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Quantity"
                  name="size_quantity"
                  type="number"
                  onChange={(event) => handleSizeChange(event, index)}
                  required
                  fullWidth
                />
              </Grid>{" "}
            </Grid>
          ))} */}
          {/* {productData.size.map((size, index) => (
            <Grid container item spacing={3} >
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Kích cỡ"
                  name="name"
                  value={size.name}
                  onChange={(event) => handleSizeChange(event, index)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Số lượng"
                  name="size_quantity"
                  type="number"
                  onChange={(event) => handleSizeChange(event, index)}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>

          ))} */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ p: 1.8 }}
              className="py-20"
              size="large"
              onClick={() => handleSubmit()}
            >
              Cập Nhật Sản Phẩm
            </Button>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

export default UpdateProductForm;
