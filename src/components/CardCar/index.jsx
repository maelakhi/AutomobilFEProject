import { Card, CardActions, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material'

const CardCar = (props) => {
    const { value } = props;
  return (
        <Grid item lg={4} md={6} sm={12}>
            <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 140, width: '100%' }}
                        image={value.image}
                        title={value.typeCar}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="caption" component="p" color="gray">
                            {value.typeCar}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="p" noWrap={true}>
                            {value.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                        <Typography
                            variant="h6"
                            color="text.secondary"
                            sx={{ mt: '8%', color: 'black' }}
                        >
                            IDR { value.price }
                        </Typography>
                    </CardContent>
                    <CardActions></CardActions>
                </Card>
            </Stack>
        </Grid>
  )
}

export default CardCar