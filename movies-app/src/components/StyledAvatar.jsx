import React from 'react';
import { makeStyles, Avatar } from '@material-ui/core';

const defaultAvatar = 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg'

const useStyles = makeStyles(theme => ({
    avatar: {
        margin: 5, 
        [theme.breakpoints.down('sm')]: {
            width: 60,
            height: 60,
        },
        [theme.breakpoints.up('sm')]: {
            width: 280,
            height: 280,
        },
    },
}));

const StylesAvatar = (props) =>{
    const { avatar } = useStyles(props);
    const { name, src }  = props;

    return(
        <Avatar className={`${avatar}`} alt={name} src={src || defaultAvatar} />
    )
}

export default StylesAvatar;