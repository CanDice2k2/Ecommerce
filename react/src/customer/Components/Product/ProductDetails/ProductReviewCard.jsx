import React from "react";
import { Avatar } from "@mui/material";
import { Rating, Box, Typography, Grid } from "@mui/material";

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day < 10 ? '0' + day : day;
  const formattedMonth = month < 10 ? '0' + month : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
}

const ProductReviewCard = ({item}) => {
  console.log(item);
  const [value, setValue] = React.useState(4.5);
  return (
    <div className="">
      <Grid container spacing={2} gap={3}>
        <Grid item xs={1}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgcolor: "#9155FD" }}
              alt={item.user.firstName}
              src=""
            >
              {item.user.firstName[0].toUpperCase()}
            </Avatar>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <div className="space-y-2">
            <div className="">
              <p className="font-semibold text-lg">{item.user.firstName}</p>
              <p className="opacity-70">Đã đánh giá vào {formatDate(item.createdAt)}</p>
            </div>
            <div>
            

              {/* <Rating
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                name="half-rating"
                defaultValue={2.5}
                precision={0.5}
              /> */}
             
            </div>
            <p>
              {item.review}
            </p>
          </div>
        </Grid>
      </Grid>
      <div className="col-span-1 flex"></div>
    </div>
  );
};

export default ProductReviewCard;
