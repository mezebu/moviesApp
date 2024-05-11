import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface CircularProgressWithLabelProps extends CircularProgressProps {
  value: number;
}

const CircularProgressWithLabel: React.FC<CircularProgressWithLabelProps> = (
  props
) => {
  let color:
    | "error"
    | "inherit"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning" = "error";
  if (props.value >= 70) {
    color = "success";
  } else if (props.value >= 40) {
    color = "warning";
  }

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress color={color} variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          fontWeight="bold"
          component="div"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabel;
