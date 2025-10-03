import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export const EventCard = () => {
  return (
    <div>
      <Card sx={{ width: 345 }}>
        <CardMedia
          sx={{ height: 345 }}
          image="https://images.pexels.com/photos/20003236/pexels-photo-20003236.jpeg"
        />
        <CardContent>
          <Typography variant="h5">Sri Renuga Hotel</Typography>
          <Typography variant="body2">50% off on your first order</Typography>
          <div className="py-2 space-y-2">
            <p>{"Manapparai"}</p>
            <p className="text-sm text-blue-500">September 10,2025 8:00 AM</p>
            <p className="text-sm text-red-500">September 10,2025 8:00 PM</p>
          </div>
        </CardContent>

        {false && (
          <CardActions>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>
    </div>
  );
};
