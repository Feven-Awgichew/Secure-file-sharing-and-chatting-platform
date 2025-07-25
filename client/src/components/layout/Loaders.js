import { Grid, Skeleton, Stack } from "@mui/material";
import { BouncingSkeleton } from "../styles/StyledComponents";

const LayoutLoader = () => {
  return (
    <Grid container height={"calc(100vh - 4rem)"} spacing={"1rem"}>
      <Grid
        item
        sm={4}
        md={3}
        sx={{ display: { xs: "none", sm: "block" } }}
        height={"100%"}
      >
        <Skeleton variant="rectangular" height={"100vh"} />
      </Grid>
      <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
        <Stack spacing={"1rem"}>
          {Array.from({ length: 10 }, (_, idx) => (
            <Skeleton key={idx} variant="rounded" height={"10vh"} />
          ))}
        </Stack>
      </Grid>
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: { xs: "none", md: "block" },
        }}
        height={"100%"}
      >
        <Skeleton variant="rectangular" height={"100vh"} />
      </Grid>
    </Grid>
  );
};

const TypingLoader = () => {
  return (
    <Stack direction={"row"} alignItems={"center"} spacing={"0.3rem"}>
      {Array.from({ length: 4 }, (_, idx) => (
        <BouncingSkeleton
          key={idx}
          variant="circular"
          width={"0.5rem"}
          height={"0.5rem"}
          style={{
            animationDelay: `${idx * 0.2}s`,
          }}
        />
      ))}
      <Skeleton variant="text" width={"2rem"} height={"1rem"} />
    </Stack>
  );
};

export { TypingLoader, LayoutLoader };