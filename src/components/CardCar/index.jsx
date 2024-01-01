import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const CardCar = ({ value }) => {
    const navigate = useNavigate();

    const handleRedirect = (value) => {
        return navigate(value);
    }
  return (
         <Grid item lg={4} md={6} sm={12} >
            <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <Card sx={{ maxWidth: 345, ":hover": { boxShadow: 3 } }}>
                    <CardMedia
                        sx={{ height: 140, width: '100%', minWidth: 345  }}
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
                            IDR { new Intl.NumberFormat().format(value?.price) }
                        </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                          variant='text'
                          sx={{ width: "100%" }}
                          onClick={()=>handleRedirect(`/classdetails/${value?.id}`)}
                      >
                          Learn More
                      </Button>
                    </CardActions>
                </Card>
            </Stack>
        </Grid>
  )
}

CardCar.propTypes = {
    value : PropTypes.object.isRequired
}

export default CardCar