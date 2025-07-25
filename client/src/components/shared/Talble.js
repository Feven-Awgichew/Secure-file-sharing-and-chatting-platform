import { Container, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
  return (
    <Container
      sx={{
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "1rem 2rem",
          height: "100%",
          borderRadius: "1rem",
          margin: "auto",
          width: "100%",
          overflow: "hidden",
          boxShadow: "none",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            margin: "2rem",
            textTransform: "uppercase",
          }}
        >
          {heading}
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowHeight={rowHeight}
          style={{ height: "80%" }}
          sx={{
            border: "none",
            "& .table-header": {
              bgcolor: "black",
              color: "white",
            },
          }}
        />
      </Paper>
    </Container>
  );
};
export default Table;