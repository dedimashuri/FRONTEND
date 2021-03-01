import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { styles } from "./materialUi";
import { AiTwotoneEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";

class Cardcomp extends Component {
  state = {};
  render() {
    const { classes } = this.props;
    return (
      <Card style={{ backgroundColor: "dark" }} variant="outlined">
        <CardMedia
          className={classes.media}
          image={this.props.foto}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="h5" component="h2">
            {this.props.judul}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            -- 
            <br />
            {this.props.caption}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton onClick={this.props.onDelete} >
            <BiTrash />
          </IconButton>
          <IconButton onClick={this.props.onEdit}>
            <AiTwotoneEdit />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Cardcomp);
