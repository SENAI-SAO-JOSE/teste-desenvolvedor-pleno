import { Grid, Card, Button, Typography, CardContent } from "@mui/material"; 
import BlockIcon from "@mui/icons-material/Block"; 
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Card variant="outlined" sx={{ padding: "3rem 0" }}>
      <CardContent>
        <Grid container justifyContent="center" alignItems="center" spacing={5}>
          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <BlockIcon color="disabled" sx={{ fontSize: "12rem" }} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <Typography variant="h5" color="text.secondary" align="center">
                The page is not found.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <Button variant="contained" component={Link} to="/" disableElevation>
                Voltar 
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
