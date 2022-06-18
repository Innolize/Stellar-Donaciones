import { Box, Card, CardActionArea, CardMedia, CardContent, Typography, Divider } from '@mui/material';
import LinearProgressBar from './LinearProgressBar';

const ProjectCard = ({ project, variant, actionArea }) => {
  // You need to pass the actionArea(Boolean) prop to get click effects
  const CardArea = actionArea ? CardActionArea : Box;

  return (
    <Card elevation={5} sx={{ marginX: 'auto', marginY: 2 }}>
      <CardArea>
        <CardMedia component="img" height="140" image={project.image} />
        <CardContent>
          <Typography
            sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
            align="center"
            gutterBottom
            variant="h5"
            component="div"
          >
            {project.name}
          </Typography>
          <Divider />
          <Box>
            <Typography align="center" mt={4} variant="h6">
              Project goal: {project.goal} XML
            </Typography>
          </Box>

          <Box>
            <Box sx={{ width: '100%' }}>
              <LinearProgressBar value={project.progress} />
            </Box>
            <Box>
              <Typography>{Math.round(project.raised)} XML raised.</Typography>
            </Box>
          </Box>
        </CardContent>
      </CardArea>
    </Card>
  );
};

export default ProjectCard;
