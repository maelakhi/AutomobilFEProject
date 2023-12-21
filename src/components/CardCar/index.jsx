import { Card, CardActions, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material'

const CardCar = (props) => {
    const { value } = props;
    console.log(value.imagePath)
  return (
         <Grid item lg={4} md={6} sm={12} >
            <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <Card sx={{ maxWidth: 345, ":hover": { boxShadow: 3 } }}>
                    <CardMedia
                        sx={{ height: 140, width: '100%'  }}
                        // image={`data:image/jpeg;base64, ${value.image}`}
                        image={value?.imagePath}
                        title={value?.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="caption" component="p" color="gray">
                            {value?.categoryName}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="p"
                          sx={{
                            wordBreak: "break-word",
                            textAlign: 'justify',
                            height: '100%'
                            }}
                          noWrap={true}
                        >
                            {value?.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            paragraph={true}
                            sx={{
                                wordBreak: "break-word",
                                textAlign: 'justify',
                                height: '100%'
                            }}
                            noWrap={true}
                        >
                            {value?.description}
                        </Typography>
                        <Typography
                            variant="h6"
                            color="text.secondary"
                            sx={{ mt: '8%', color: 'black' }}
                        >
                            IDR { value?.price }
                        </Typography>
                    </CardContent>
                    <CardActions></CardActions>
                </Card>
            </Stack>
        </Grid>
  )
}

export default CardCar