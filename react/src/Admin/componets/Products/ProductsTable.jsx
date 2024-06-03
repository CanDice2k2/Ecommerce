import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  findProducts,
} from "../../../Redux/Customers/Product/Action";

const ProductsTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customersProduct } = useSelector((store) => store);
  const [filterValue, setFilterValue] = useState({
    availability: "",
    category: "",
    sort: "",
  });

  // query
  const searchParams = new URLSearchParams(location.search);
  const availability = searchParams.get("availability");
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const page = searchParams.get("page");

  const handlePaginationChange = (event, value) => {
    searchParams.set("page", value - 1);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  useEffect(() => {
    // setFilterValue({ availability, category, sort });
    const data = {
      category: category || "",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 10000000,
      minDiscount: 0,
      sort: sort || "price_low",
      pageNumber: page || 0,
      pageSize: 10,
      stock: availability,
    };
    dispatch(findProducts(data));
  }, [availability, category, sort, page, customersProduct.deleteProduct]);

  const handleFilterChange = (e, sectionId) => {
    console.log(e.target.value, sectionId);
    setFilterValue((values) => ({ ...values, [sectionId]: e.target.value }));
    searchParams.set(sectionId, e.target.value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleDeleteProduct = (productId) => {
    console.log("delete product ", productId);
    dispatch(deleteProduct(productId));
  };
  const handleUpdateProduct = (productId) => {
    console.log("update product ", productId);
    navigate(`/admin/product/update/${productId}`);
  };

  return (
    <Box width={"100%"}>
      <Card className="p-3">
        <CardHeader
          title="Lọc"
          sx={{
            pt: 0,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Loại sản phẩm</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.category}
                label="Category"
                onChange={(e) => handleFilterChange(e, "category")}
              >
                <MenuItem  value="aothun">Áo thun</MenuItem>,
                <MenuItem  value="aosomi">Áo sơ mi</MenuItem>,
                <MenuItem  value="aopolo">Áo Polo</MenuItem>,
                <MenuItem  value="quanjeans">Quần Jeans</MenuItem>,
                <MenuItem  value="quankaki">Quần Kaki</MenuItem>,
                <MenuItem  value="quanshort">Quần Short</MenuItem>,
                <MenuItem  value="dongho">Đồng hồ</MenuItem>,
                <MenuItem  value="vi_tuixach">Ví/Túi xách</MenuItem>,
                <MenuItem  value="mu">Mũ</MenuItem>,
                <MenuItem  value="kinhram">Kính râm</MenuItem>,
                <MenuItem  value="thatlung">Thắt lưng</MenuItem>,
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Trạng thái sản phẩm
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.availability}
                label="Availability"
                onChange={(e) => handleFilterChange(e, "availability")}
              >
                <MenuItem value={"All"}>Tất cả</MenuItem>
                <MenuItem value={"in_stock"}>Còn bán</MenuItem>
                <MenuItem value={"out_of_stock"}>Đã bán hết</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Sắp xếp theo giá
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.sort}
                label="Sort By Price"
                onChange={(e) => handleFilterChange(e, "sort")}
              >
                <MenuItem value={"price_high"}>Cao đến Thấp</MenuItem>
                <MenuItem value={"price_low"}>Thấp đến Cao</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>

      <Card className="mt-2">
        <CardHeader
          title="Tất cả sản phẩm"
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Hình ảnh</TableCell>
                <TableCell>Tiêu đề</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Loại sản phẩm</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Giá</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Số lượng</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Cập nhật</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Xoá</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customersProduct?.products?.content?.map((item) => (
                <TableRow
                  hover
                  key={item.name}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                >
                  <TableCell>
                    {" "}
                    <Avatar alt={item.title} src={item.imageUrl} />{" "}
                  </TableCell>

                  <TableCell
                    sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.875rem !important",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="caption">{item.brand}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.category.name === "aothun" ? "Áo thun" : item.category.name}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.discountedPrice}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.quantity}
                  </TableCell>

                  <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      variant="text"
                      onClick={() => handleUpdateProduct(item.id)}
                    >
                      Cập nhật
                    </Button>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      variant="text"
                      onClick={() => handleDeleteProduct(item.id)}
                    >
                      Xoá
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card className="mt-2 border">
        <div className="mx-auto px-4 py-5 flex justify-center shadow-lg rounded-md">
          <Pagination
            count={customersProduct.products?.totalPages}
            color="primary"
            className=""
            onChange={handlePaginationChange}
            // value={page}
          />
        </div>
      </Card>
    </Box>
  );
};

export default ProductsTable;
