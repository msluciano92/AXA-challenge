import React from 'react';
import { makeStyles, Avatar } from '@material-ui/core';

const defaultAvatar = 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg'

const useStyles = makeStyles({
    avatar: {
        margin: 5, 
        width: props => props.width, 
        height: props => props.height
    },
});

const StylesAvatar = (props) =>{
    const { avatar } = useStyles(props);
    const { name, src }  = props;
    return(
        <Avatar className={`${avatar}`} alt={name} src={src || defaultAvatar} />
    )
}

export default StylesAvatar;